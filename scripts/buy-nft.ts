import { ethers } from 'ethers'
import CommuniftyNFT from '../artifacts/contracts/CommuniftyNFT.sol/CommuniftyNFT.json'

const sleep = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'http://localhost:8545'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  console.log('Wallet:', wallet.address)
  const gas = process.env.GAS || '50'
  console.log('Gas:', gas)
  const pair = new ethers.Contract(
    process.env.PAIR || '0x72df4356B7723C45959dbE4A30B401d8Eb2997d2',
    CommuniftyNFT.abi,
    wallet
  )
  console.log('Pair:', pair.address)

  const buyPrice = await pair.buyPrice()
  console.log('Buy price:', buyPrice.toString())

  const buyTx = await pair.buy(wallet.address, {
    gasLimit: 8000000,
    gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
    value: buyPrice,
  })

  const buyResult = await buyTx.wait()

  console.log('Buy tx:', buyTx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
