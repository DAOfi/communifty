import { ethers } from 'ethers'
import CommuniftyNFT from '../artifacts/contracts/CommuniftyNFT.sol/CommuniftyNFT.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'http://localhost:8545'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  console.log('Wallet:', wallet.address)

  const recipient = process.env.RECIPIENT || wallet.address
  const gas = process.env.GAS || '50'

  const nonce = await wallet.getTransactionCount()

  console.log('Recipient:', recipient)
  console.log('Gas:', gas)
  console.log('Nonce:', nonce)

  const pair = new ethers.Contract(
    process.env.PAIR || '0x875b0b43e85aE790c0AEB0e3FBe7B28810da3248',
    CommuniftyNFT.abi,
    wallet
  )

  console.log('Pair:', pair.address)

  let tx = await pair.preMint(31, recipient, {
    gasLimit: 10e6,
    gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
    nonce,
  })

  await tx.wait()

  console.log('Pre-minted:', (await pair.balanceOf(recipient)).toNumber())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
