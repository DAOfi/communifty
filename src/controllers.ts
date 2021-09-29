import axios from 'axios'
import { ethers } from 'ethers'
import FormData from 'form-data'
import fs from 'fs'
import { Db, ObjectId } from 'mongodb'
import { ProjectModel, TokenModel } from './models'
import * as Views from './views'

const p5 = require('node-p5')

export type ControllerFunc = (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => (event: any) => void

async function getGasPrice() {
  return (
    await axios.get(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`
    )
  ).data.result.FastGasPrice // ProposeGasPrice
}

export const nodeP5Controller: ControllerFunc = (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => {
  console.log('Creating testController')
  return async (event: any) => {
    const doc = (await db
      .collection('projects')
      .findOne({ _id: id })) as ProjectModel
    console.log('event', event.address, event.transactionHash)
    if (doc && Views.hasOwnProperty(doc.view)) {
      const tokenId = event.args['tokenId_'].toNumber()
      const projectTokenId = event.args['projectTokenId_'].toNumber()
      if (!doc.tokens || !doc.tokens.hasOwnProperty(tokenId)) {
        console.log(
          'generating',
          doc.view,
          doc.projectId,
          projectTokenId,
          tokenId
        )
        try {
          // Do the generative thing
          const viewFunc: Views.ViewFunc = (Views as any)[doc.view]
          const viewObj: Views.ViewObject = viewFunc(
            doc.projectId,
            projectTokenId,
            tokenId
          )
          const instance = p5.createSketch(viewObj.sketch)
          // Save frames
          await instance.saveFrames(
            viewObj.data.canvas,
            `${tokenId}`, // always save gif
            { repeat: viewObj.data.repeat, quality: viewObj.data.quality },
            viewObj.data.duration,
            viewObj.data.frameRate
          )

          let ipfsGif
          let ipfsPng

          if (viewObj.data.appendGif || !viewObj.data.isPng) {
            // Upload gif to IPFS
            const file = fs.createReadStream(`${tokenId}/${tokenId}.gif`)
            const imgData = new FormData()
            imgData.append(
              'file',
              file,
              `${doc.projectId}_${projectTokenId}_${tokenId}.gif`
            )
            ipfsGif = await axios.post(
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
          }

          if (viewObj.data.isPng) {
            // Upload png to IPFS
            const file = fs.createReadStream(`${tokenId}/frame-${(viewObj.data.frameRate * viewObj.data.duration) - 1}.png`)
            const imgData = new FormData()
            imgData.append(
              'file',
              file,
              `${doc.projectId}_${projectTokenId}_${tokenId}.png`
            )
            ipfsPng = await axios.post(
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
          }
          // Set image URIs
          if (viewObj.data.isPng) {
            viewObj.data.meta.image = `ipfs://${ipfsPng?.data.IpfsHash}`
            viewObj.data.meta.external_url = `https://communifty.mypinata.cloud/ipfs/${ipfsPng?.data.IpfsHash}`
          } else {
            viewObj.data.meta.image = `ipfs://${ipfsGif?.data.IpfsHash}`
            viewObj.data.meta.external_url = `https://communifty.mypinata.cloud/ipfs/${ipfsGif?.data.IpfsHash}`
          }

          if (viewObj.data.appendGif) {
            viewObj.data.meta.gif_url = `https://communifty.mypinata.cloud/ipfs/${ipfsGif?.data.IpfsHash}`
          }

          // Upload json to IPFS
          const jsonBody = {
            pinataMetadata: {
              name: `${doc.projectId}_${projectTokenId}_${tokenId}.json`,
            },
            pinataContent: viewObj.data.meta,
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
          // console.log('ipfs json result:', ipfsJSON.data)
          if (!viewObj.data.test) {
            // Set the token URI
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
            console.log(`setTokenURI ${tokenId} ipfs://${ipfsJSON.data.IpfsHash}`, tx.hash)
            // Update the DB
            let token: TokenModel = {
              tokenId,
              projectTokenId,
              tokenURI: `ipfs://${ipfsJSON.data.IpfsHash}`,
              transactionHash: event.transactionHash,
              meta: viewObj.data.meta,
            }
            await db.collection('projects').updateOne(
              { _id: id },
              {
                $set: {
                  lastBlock: event.blockNumber + 1,
                  [`tokens.${tokenId}`]: token,
                },
              }
            )
          }
          fs.rmdirSync(`${tokenId}`, { recursive: true })
          console.log(
            'complete',
            doc.view,
            doc.projectId,
            projectTokenId,
            tokenId
          )
        } catch (e: any) {
          console.error(
            'nodeP5Controller error',
            typeof e.toJSON === 'function' ? e.toJSON() : e
          )
        }
      }
    }
  }
}
