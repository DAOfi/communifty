import axios from 'axios'

export async function getGasPrice() {
  return (
    await axios.get(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`
    )
  ).data.result.FastGasPrice // ProposeGasPrice
}
