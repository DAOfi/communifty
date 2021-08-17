import { ethers } from 'ethers'
import { Db, ObjectId } from 'mongodb'

export type ControllerFunc = (wallet: ethers.Wallet, db: Db, id: ObjectId) => (event: any) => void

export function testController(wallet: ethers.Wallet, db: Db, id: ObjectId) {
  console.log('Creating testController')
  return async (event: any) => {
    console.log('found event:', await wallet.provider.getNetwork(), event)
  }
}
