import { ethers } from 'ethers'
import CommuniftyNFT from '../artifacts/contracts/CommuniftyNFT.sol/CommuniftyNFT.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'http://localhost:8545'
  )

  const pair = new ethers.Contract(
    process.env.PAIR || '',
    CommuniftyNFT.abi,
    provider
  )

  console.log('Pair:', pair.address)
  console.log('Function:', process.env.FUNCTION)

  let result = await pair[process.env.FUNCTION || '']()

  console.log('Result:', result)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
