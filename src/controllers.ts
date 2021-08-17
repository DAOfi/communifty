import { ethers } from 'ethers'

export function testController(wallet: ethers.Wallet) {
  console.log('Creating testController')
  return (event: any) => {
    console.log('found event:', event)
  }
}
