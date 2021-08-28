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
    process.env.CONTRACT || '0x5a2BE6CF65A2F019183058Cb8eBe828834F40dE6',
    ScorpioNFT.abi,
    wallet
  )
  console.log('Scorpio contract:', token.address)

  const setupTx = await token.setupProject(
    parseInt(process.env.PROJECT_ID || '0'),
    parseInt(process.env.MAX_TOKEN_ID || '0'),
    ethers.utils.parseEther(process.env.PRICE || '0'),
    parseInt(process.env.FEE || '0'),
    process.env.RECIPIENT || wallet.address,
    process.env.BASE_URI || '',
    {
      gasLimit: 10e6,
      gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
    }
  )
  console.log('Setup project:', process.env.PROJECT_ID)

  await setupTx.wait()
  console.log('Setup tx:', setupTx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
