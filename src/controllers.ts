import axios from 'axios'
import { ethers } from 'ethers'
import FormData from 'form-data'
import fs from 'fs'
import { Db, ObjectId } from 'mongodb'
import { ProjectModel, TokenModel } from './models'

export type ControllerFunc = (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => (event: any) => void

const p5 = require('node-p5')
let canvas: any
let meta: any = {}

async function getGasPrice() {
  return (
    await axios.get(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`
    )
  ).data.result.FastGasPrice // ProposeGasPrice
}

function sketch(p: any) {
  // TODO, pull these from db or something?
  meta.name = 'Generative Test 1'
  meta.description = 'Super Awesome'
  meta.attributes = []
  meta.attributes.push({
    trait_type: 'Test Generative',
    value: 'All Test',
  })

  p.setup = () => {
    canvas = p.createCanvas(200, 200)
  }
  p.draw = () => {
    p.background(50)
    p.text('hello world!', 50, 100)
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
    console.log('got event:', event.address, event.transactionHash)
    if (doc) {
      const tokenId = event.args['tokenId_'].toNumber()
      if (!doc.tokens || !doc.tokens.hasOwnProperty(tokenId)) {
        console.log('populating tokenId:', event.address, tokenId)
        try {
          // Do the generative thing
          const instance = p5.createSketch(sketch)
          await instance.saveFrames(
            canvas,
            `${tokenId}`,
            { repeat: 1, quality: 10 },
            1,
            1
          )
          const file = fs.createReadStream(`${tokenId}/${tokenId}.gif`)
          // Upload image to IPFS
          const imgData = new FormData()
          imgData.append('file', file)
          const ipfsImage = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            imgData,
            {
              maxBodyLength: Infinity,
              headers: {
                Authorization: `Bearer ${process.env.JWT}`,
                'Content-Type': `multipart/form-data; boundary=${imgData.getBoundary()}`,
              },
            }
          )
          // Set image URI
          console.log('ipfs image result:', ipfsImage.data)
          meta.image = `ipfs://${ipfsImage.data.IpfsHash}`
          // Upload json to IPFS
          const jsonBody = {
            /* The "pinataMetadata" object will not be part of your content added to IPFS */
            /* Pinata simply stores the metadata provided to help you easily query your JSON object pins */
            // pinataOptions: {
            //   cidVersion: (the integer for your desired CID version),
            //   customPinPolicy: (custom pin policy for this json)
            // },
            pinataMetadata: {
              name: `${tokenId}.json`
              // keyvalues: {
              //     customKey: customValue,
              //     customKey2: customValue2
              // }
            },
            /* The contents of the "pinataContent" object will be added to IPFS */
            /* The hash provided back will only represent the JSON contained in this object */
            /* The JSON the returned hash links to will NOT contain the "pinataMetadata" object above */
            pinataContent: meta
          }
          const ipfsJSON = await axios.post(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            jsonBody,
            {
              headers: {
                Authorization: `Bearer ${process.env.JWT}`,
              },
            }
          )
          console.log('ipfs json result:', ipfsJSON.data)
          const gasPrice = await getGasPrice()
          const tx = await contract.setTokenURI(
            tokenId,
            `ipfs://${ipfsJSON.data.IpfsHash}`,
            {
              gasLimit: 150000,
              gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei'),
            }
          )
          await tx.wait()
          console.log('tokenURI set', tx.hash)
          let token: TokenModel = {
            tokenId,
            projectTokenId: event.args['projectTokenId_'].toNumber(),
            tokenURI: `ipfs://${ipfsJSON.data.IpfsHash}`,
            transactionHash: event.transactionHash,
            meta,
          }
          await db.collection('projects').updateOne(
            { _id: id },
            {
              $set: {
                lastBlock: event.blockNumber,
                [`tokens.${tokenId}`]: token,
              },
            }
          )
          console.log('done! project, token', doc.projectId, tokenId)
        } catch (e: any) {
          console.error(
            'testController error',
            typeof e.toJSON === 'function' ? e.toJSON() : e
          )
        }
      }
    }
  }
}
