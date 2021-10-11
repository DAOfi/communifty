import { ethers } from 'ethers'
import express, { Request } from 'express'
import { Db, MongoClient } from 'mongodb'
import zmq from 'zeromq'
import ScorpioNFT from '../artifacts/contracts/ScorpioNFT.sol/ScorpioNFT.json'
import { ProjectModel } from './models'

const app = express()
const requiredEnv = ['MONGO_PWD', 'INFURA_KEY', 'CONTRACT', 'NETWORK', 'JWT']
let db: Db

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.error('Missing env', env)
    process.exit(1)
  }
})

const port = process.env.PORT || 3030
const sock = zmq.socket('pub')
sock.bindSync(`tcp://*:${port}`)
console.log('zmq publishing on port', port)

const client = new MongoClient(
  `mongodb+srv://daofi:${process.env.MONGO_PWD}@cluster0.qjd1i.mongodb.net/daofi?retryWrites=true&w=majority`
)
const provider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(
    `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`
  )
const contract: ethers.Contract = new ethers.Contract(
  process.env.CONTRACT || '',
  ScorpioNFT.abi,
  provider
)
console.log('Connected contract', process.env.NETWORK, contract.address)

async function parseEvent(event: ethers.Event) {
  const ret: any = {
    address: event.address,
    blockHash: event.blockHash,
    blockNumber: event.blockNumber,
    blockTimestamp: (await event.getBlock()).timestamp,
    transactionHash: event.transactionHash,
    args: {},
  }
  for (let key in event.args) {
    ret.args[key] = event.args[key].toString()
  }
  return JSON.stringify(ret)
}

async function backfill(overrideBlock?: number) {
  // Get list of projects and iterate
  const projects = db.collection('projects')
  projects.find({}).toArray(async (err, items) => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else if (items) {
      for (const entry of items) {
        const project = entry as ProjectModel
        if (project.network === process.env.NETWORK) {
          // Back-fill events up to latest block
          const blockNumber = await provider.getBlockNumber()
          const logs =
            (await contract.queryFilter(
              contract.filters.Mint(),
              overrideBlock || project.lastBlock,
              blockNumber
            )) || []
          for (const event of logs) {
            let projectId = event.args?.projectId_.toNumber().toString()
            if (parseInt(projectId) === project.projectId) {
              sock.send([projectId, await parseEvent(event)])
              console.log('event', projectId, event.transactionHash)
            }
          }
        } else {
          console.warn('Invalid network:', project.projectId, project.network)
        }
      }
    }
  })
}

async function main() {
  db = (await client.connect()).db('scorpio')
  console.log('Connected to scorpio db')
  await backfill()
  // Listen for mint events and route to project controller
  contract.on(
    'Mint',
    async (projectId, tokenId, projectTokenId, price, to, event) => {
      const pId = projectId.toNumber().toString()
      sock.send([pId, parseEvent(event)])
      console.log('event', pId, event.transactionHash)
    }
  )
  console.log('Listening for Mint events from', process.env.NETWORK)
}

// Backfill, setup listeners then launch server
main()
  .then(() => {
    app.post(
      '/backfill',
      async (req: Request, res: express.Response): Promise<void> => {
        const token = req.headers.authorization?.split(' ')[1]
        if (token && token === process.env.JWT) {
          let { blockNumber } = req.query
          await backfill(blockNumber ? parseInt(blockNumber.toString()) : 1)
          res.send({ success: true })
        } else {
          res.sendStatus(403)
        }
      }
    )
    app.listen(8080, () => console.info('Publisher API listening on port 8080'))
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
