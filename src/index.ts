import { ethers } from 'ethers'
import express from 'express'
import { Db, MongoClient } from 'mongodb'
import CommuniftyNFT from '../artifacts/contracts/CommuniftyNFT.sol/CommuniftyNFT.json'
import * as Controllers from './controllers'
import { ContractModel, NetworkModel, TokenModel } from './models'

const app = express()
const requiredEnv = ['MONGO_PWD', 'INFURA_KEY', 'PRIVATE_KEY', 'ETHERSCAN_KEY']

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.error('Missing env', env)
    process.exit(1)
  }
})

const client = new MongoClient(
  `mongodb+srv://daofi:${process.env.MONGO_PWD}@cluster0.qjd1i.mongodb.net/daofi?retryWrites=true&w=majority`
)
const providers: { [key: string]: ethers.providers.JsonRpcProvider } = {
  mainnet: new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
  ),
  rinkeby: new ethers.providers.JsonRpcProvider(
    `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
  ),
}
const wallets: { [key: string]: ethers.Wallet } = {}

for (const network in providers) {
  wallets[network] = new ethers.Wallet(
    process.env.PRIVATE_KEY || '',
    providers[network]
  )
  console.info('Connected wallet for', network)
}

async function main() {
  const db: Db = (await client.connect()).db('communifty')
  console.info('Conntected to Db')
  // Get list of contracts and iterate
  const contracts = db.collection('contracts')
  contracts.find({}).toArray(async (err, items) => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else if (items) {
      for (const entry of items) {
        const contract = entry as ContractModel
        if (Controllers.hasOwnProperty(contract.controller)) {
          // Iterate networks, setup listeners
          for (const networkString in contract.networks) {
            if (providers.hasOwnProperty(networkString)) {
              const network: NetworkModel = contract.networks[networkString]
              const instance = new ethers.Contract(
                network.address,
                CommuniftyNFT.abi,
                providers[networkString]
              )
              console.log('Created contract:', instance.address)
              // Listen for new events
              const controller = (Controllers as any)[contract.controller](
                wallets[networkString]
              )
              instance.on('Buy', (sender, price, id, to, event) => {
                controller(event)
              })
              // Back-fill events up to latest block
              const blockNumber = await providers[
                networkString
              ].getBlockNumber()
              const logs =
                (await instance.queryFilter(
                  instance.filters.Buy(),
                  network.lastBlock,
                  blockNumber
                )) || []
              for (const event of logs) {
                controller(event)
              }
            } else {
              console.error('Invalid netork:', networkString)
            }
          }
        } else {
          console.error('Invalid controller:', contract.controller)
        }
      }
    }
  })
}

// Setup listeners then launch server
main()
  .then(() => {
    app.listen(8080, () => console.info('App listening on port 8080'))
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
