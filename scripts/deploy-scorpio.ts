import { ethers } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import ScorpioNFT from '../artifacts/contracts/ScorpioNFT.sol/ScorpioNFT.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'http://localhost:8545'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  console.log('Wallet:', wallet.address)

  const gas = process.env.GAS || '50'
  const proxy =
    process.env.PROXY || '0xf57b2c51ded3a29e6891aba85459d600256cf317' // Default Rinkeby // Mainnet 0xa5409ec958c83c3f309868babaca7c86dcb077c1
  const nonce = await wallet.getTransactionCount()

  console.log('Proxy:', proxy)
  console.log('Gas:', gas)
  console.log('Nonce:', nonce)

  const token = await deployContract(
    wallet as any,
    ScorpioNFT,
    [
      'scorpio.world',
      'SCORPIO',
      process.env.OWNER || '0x8b2448c75945E6531E2906B76fa3B06670e19229',
      proxy,
    ],
    {
      gasLimit: 3e6,
      gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
      nonce,
    }
  )

  console.log('Scorpio contract:', token.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
