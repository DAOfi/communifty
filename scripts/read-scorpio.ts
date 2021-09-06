import { ethers } from 'ethers'
import ScorpioNFT from '../artifacts/contracts/ScorpioNFT.sol/ScorpioNFT.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'http://localhost:8545'
  )

  const token = new ethers.Contract(
    process.env.CONTRACT || '0x5a2BE6CF65A2F019183058Cb8eBe828834F40dE6',
    ScorpioNFT.abi,
    provider
  )

  console.log('Read from Scorpio contract:', token.address)
  console.log('Function:', process.env.FUNCTION)
  console.log('Args:', process.env.ARGS)

  const result = await token[process.env.FUNCTION || ''](...JSON.parse(process.env.ARGS || '[]'))

  console.log('Result:', result)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })