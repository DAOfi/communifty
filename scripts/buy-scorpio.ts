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
  console.log('Scorpio contract:', token.address)
  console.log('Buy project:', process.env.PROJECT_ID)
  console.log('Buy recipient:', process.env.TO || wallet.address)

  const mintPrice = await token.projectToMintPrice(
    parseInt(process.env.PROJECT_ID || '0')
  )
  console.log('Buy price:', mintPrice.toString())

  const buyTx = await token.mint(
    parseInt(process.env.PROJECT_ID || '0'),
    process.env.TO || wallet.address,
    {
      value: mintPrice,
      gasLimit: 2e6,
      gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
      nonce,
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
