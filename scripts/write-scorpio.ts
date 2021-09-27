import { ethers } from 'ethers'
import ScorpioNFT from '../artifacts/contracts/ScorpioNFT.sol/ScorpioNFT.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'http://localhost:8545'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  console.log('Wallet:', wallet.address)

  const gas = process.env.GAS || '50'
  const nonce = await wallet.getTransactionCount()
  console.log('Gas:', gas)
  console.log('Nonce:', nonce)

  const token = new ethers.Contract(
    process.env.CONTRACT || '0x4b349A4DA4A9D9a508c3BA45D4195ba0B8a42275',
    ScorpioNFT.abi,
    wallet
  )

  console.log('Write to Scorpio contract:', token.address)
  console.log('Function:', process.env.FUNCTION)
  console.log('Args:', process.env.ARGS)

  const result = await token[process.env.FUNCTION || ''](
    ...JSON.parse(process.env.ARGS || '[]'),
    {
      gasLimit: 10e6,
      gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
      nonce,
    }
  )

  await result.wait()
  console.log('Write tx:', result.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
