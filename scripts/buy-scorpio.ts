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
  console.log('Buy project:', process.env.PROJECT_ID)
  console.log('Buy recipient:', process.env.TO || wallet.address)

  const mintPrice = await token.projectToMintPrice(parseInt(process.env.PROJECT_ID || '0'))
  console.log('Buy price:', mintPrice.toString())

  const buyTx = await token.mint(
    parseInt(process.env.PROJECT_ID || '0'),
    process.env.TO || wallet.address,
    {
      value: mintPrice,
      gasLimit: 10e6,
      gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
    }
  )

  await buyTx.wait()
  console.log('Buy tx:', buyTx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
