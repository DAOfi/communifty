import { ethers } from 'ethers'
import { Db, ObjectId } from 'mongodb'
import { ContractModel, NetworkModel } from './models'

export type ControllerFunc = (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => (event: any) => void

export const testController: ControllerFunc = (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => {
  console.log('Creating testController')
  return async (event: any) => {
    const network = await contract.provider.getNetwork()
    const doc = (await db
      .collection('contracts')
      .findOne({ _id: id })) as ContractModel
    console.log(
      'got event:',
      network.name,
      event.address,
      event.transactionHash
    )
    if (doc) {
      if (doc.networks.hasOwnProperty(network.name)) {
        const model: NetworkModel = doc.networks[network.name]
        const tokenId = event.args['tokenId'].toString()
        if (!model.tokens || !model.tokens.hasOwnProperty(tokenId)) {
          console.log(
            'populating tokenId:',
            network.name,
            event.address,
            tokenId
          )
          // Do the generative thing
          // await contract.setTokenURI(parseInt(tokenId), '')
          await db.collection('contracts').updateOne(
            { _id: id },
            {
              $set: {
                [`networks.${network.name}.lastBlock`]: event.blockNumber,
                [`networks.${network.name}.tokens.${tokenId}`]: {
                  id: tokenId,
                  transactionHash: event.transactionHash,
                  metaURL: 'ipfs://',
                  assetURL: 'ipfs://',
                  generativeMeta: {
                    testData: 'test',
                  },
                },
              },
            }
          )
        }
      }
    }
  }
}
