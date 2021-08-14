import { ethers } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import CommuniftyNFT from '../artifacts/contracts/CommuniftyNFT.sol/CommuniftyNFT.json'

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

  const pair = await deployContract(
    wallet as any,
    CommuniftyNFT,
    [
      'Karma DAO',
      'KARMA',
      'ipfs://QmRRkBgZh3H52BLfYh2ebG7ufERRw2dqidTJUkP6VtxYcs/karma_metadata/',
      proxy,
      wallet.address,
      503, // tokens
      50, // start x
      100, // m
      2, // n
      50, // fee
    ],
    {
      gasLimit: 10000000,
      gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
      nonce,
    }
  )

  console.log('Pair:', pair.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
