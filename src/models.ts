import { ObjectId } from 'mongodb'

export interface TokenModel {
  id: number
  metaURL: string
  assetURL: string
  createdAtBlock: number
  generativeMeta: any
}

export interface NetworkModel {
  address: string
  lastBlock: number
  tokens: { [key: string]: TokenModel }
}

export interface ContractModel {
  _id: ObjectId
  controller: string
  networks: { [key: string]: NetworkModel }
}
