import { ethers } from 'ethers'
import CommuniftyNFT from '../artifacts/contracts/CommuniftyNFT.sol/CommuniftyNFT.json'

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

  const pair = new ethers.Contract(
    process.env.PAIR || '',
    CommuniftyNFT.abi,
    wallet
  )

  console.log('Pair:', pair.address)

  let tx = await pair.signalClose({
    gasLimit: 10000000,
    gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
    nonce,
  })

  await tx.wait()

  console.log('Close signaled...')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
