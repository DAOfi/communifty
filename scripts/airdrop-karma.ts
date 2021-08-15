import axios from 'axios'
import { Contract, ethers } from 'ethers'
import CommuniftyNFT from '../artifacts/contracts/CommuniftyNFT.sol/CommuniftyNFT.json'

const sleep = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

async function getGasPrice() {
  return (
    await axios.get(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`
    )
  ).data.result.FastGasPrice // ProposeGasPrice
}

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'http://localhost:8545'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  const walletAddress = ethers.utils.getAddress(wallet.address)
  console.log('Wallet:', walletAddress)
  // Old token
  const oldToken = new Contract(
    '0x32093ef03141eac8bfad7119fc37ad9985efe763',
    CommuniftyNFT.abi,
    wallet
  )
  console.log('Old Karma token:', oldToken.address)
  const newToken = new Contract(
    '0xf7E1FEEf85B9c2337A087439AbF364b9DD21a562',
    CommuniftyNFT.abi,
    wallet
  )
  console.log('New Karma token:', newToken.address)

  for (let i = 1; i < 504; ++i) {
    const oldOwner = await oldToken.ownerOf(i)
    const newOwner = await newToken.ownerOf(i)

    if (oldOwner !== newOwner && newOwner === wallet.address) {
      if (process.env.LIVE_RUN === 'true') {
        try {
          // transfer holder balance
          const gasPrice = await getGasPrice()
          console.log('Current gas price:', gasPrice)
          const tx = await newToken.transferFrom(newOwner, oldOwner, i, {
            gasLimit: 2e5,
            gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei')
          })

          await tx.wait()
          console.log(tx.hash, oldOwner, i)
        } catch (e) {
          console.log('ERROR', oldOwner, i, e)
        }
      } else {
        // simulate tx
        await sleep(2000)
        console.log('0x0', oldOwner, i)
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
