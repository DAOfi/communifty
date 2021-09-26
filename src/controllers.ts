import { ethers } from 'ethers'
import { Db, ObjectId } from 'mongodb'
import { ProjectModel, TokenModel } from './models'

const p5 = require('node-p5')

export type ControllerFunc = (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => (event: any) => void

let canvas: any
let generativeMeta = { testMeta: 'something' }

function sketch(p: any) {
  p.setup = () => {
    canvas = p.createCanvas(200, 200);
  }
  p.draw = () => {
    p.background(50);
    p.text('hello world!', 50, 100);
  }
}

export const testController: ControllerFunc = (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => {
  console.log('Creating testController')
  return async (event: any) => {
    const doc = (await db
      .collection('projects')
      .findOne({ _id: id })) as ProjectModel
    console.log(
      'got event:',
      event.address,
      event.transactionHash
    )
    if (doc) {
      const tokenId = event.args['tokenId_'].toNumber()
      if (!doc.tokens || !doc.tokens.hasOwnProperty(tokenId)) {
        console.log(
          'populating tokenId:',
          event.address,
          tokenId
        )
        // Do the generative thing
        const instance = p5.createSketch(sketch)
        await instance.saveFrames(canvas, `${tokenId}`, { repeat: 1, quality: 10 }, 1, 1)
        // Upload to IPFS
        // TODO
        // await contract.setTokenURI(parseInt(tokenId), '')
        let token: TokenModel = {
          tokenId,
          projectTokenId: event.args['projectTokenId_'].toNumber(),
          tokenURI: 'ipfs://',
          image: 'ipfs://',
          transactionHash: event.transactionHash,
          generativeMeta
        }
        await db.collection('projects').updateOne(
          { _id: id },
          {
            $set: {
              lastBlock: event.blockNumber,
              [`tokens.${tokenId}`]: token
            },
          }
        )
      }
    }
  }
}
