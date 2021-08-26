import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import { expect } from 'chai'
import { Contract, ContractFactory } from 'ethers'
import { ethers } from 'hardhat'
import {
  expandToDecimals,
  expandTo18Decimals,
} from './shared/utilities'

const zero = ethers.BigNumber.from(0)
const proxy = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
const name = 'Scorpio'
const symbol = 'SCRP'
const baseURI = 'https:/test.server/'

let NFT: ContractFactory
let token: Contract
let wallet: SignerWithAddress

describe('ScorpioNFT test all success and revert cases', () => {
  beforeEach(async () => {
    NFT = await ethers.getContractFactory('ScorpioNFT')
    wallet = (await ethers.getSigners())[0]
  })

  it('reverts for any bad parameter given to constructor', async () => {
    await expect(
      NFT.deploy(
        name,
        symbol,
        ethers.constants.AddressZero
      )
    ).to.be.revertedWith('ZERO_OWNER')
  })

  it('will allow setupProject and revert setupProject in all conditions', async () => {
    const wallet2 = (await ethers.getSigners())[1]
    // create normal token
    token = await NFT.deploy(
      name,
      symbol,
      wallet.address,
    )
    // attempt to setupProject from wallet 2
    token = await token.connect(wallet2)
    await expect(token.setupProject(
      1, 10000, expandToDecimals(69, 15), 50, wallet.address, baseURI
    )).to.be.revertedWith(
      'ONLY_OWNER'
    )
    // switch back to wallet1
    token = await token.connect(wallet)
    // all fail cases
    await expect(token.setupProject(
      1, 0, expandToDecimals(69, 15), 50, wallet.address, baseURI
    )).to.be.revertedWith(
      'ZERO_MAX_TOKEN_ID'
    )
    await expect(token.setupProject(
      1, 10000, expandToDecimals(69, 15), 1001, wallet.address, baseURI
    )).to.be.revertedWith(
      'MAX_ROYALTY_EXCEEDED'
    )
    await expect(token.setupProject(
      1, 10000, expandToDecimals(69, 15), 50, ethers.constants.AddressZero, baseURI
    )).to.be.revertedWith(
      'ZERO_ROYALTY_ADDRESS'
    )
    await expect(token.setupProject(
      1, 10000, expandToDecimals(69, 15), 50, wallet.address, ''
    )).to.be.revertedWith(
      'EMPTY_BASE_URI'
    )
    // successful call
    await expect(token.setupProject(
      1, 10000, expandToDecimals(69, 15), 50, wallet.address, baseURI
    )).to.not.be.reverted
    await expect(token.setupProject(
      1, 10000, expandToDecimals(69, 15), 50, wallet.address, baseURI
    )).to.be.revertedWith(
      'PROJECT_ALREADY_SETUP'
    )
  })

  it('will allow preMint and revert preMint in all conditions', async () => {
    const wallet2 = (await ethers.getSigners())[1]
    // create normal token
    token = await NFT.deploy(
      name,
      symbol,
      wallet.address,
    )
    // successful setupProject call
    await expect(token.setupProject(
      1, 10000, expandToDecimals(69, 15), 50, wallet.address, baseURI
    )).to.not.be.reverted
    // attempt to preMint from wallet 2
    token = await token.connect(wallet2)
    await expect(token.preMint(1, 5, wallet2.address)).to.be.revertedWith(
      'ONLY_OWNER'
    )
    await expect(token.disablePreMint(1)).to.be.revertedWith(
      'ONLY_OWNER'
    )
    // switch back to wallet1
    token = await token.connect(wallet)
    // fail cases
    await expect(token.preMint(2, 11, wallet2.address)).to.be.revertedWith(
      'INVALID_PROJECT'
    )
    await expect(token.preMint(1, 10001, wallet2.address)).to.be.revertedWith(
      'MAX_SUPPLY'
    )
    // successfully preMint
    await expect(token.preMint(1, 5, wallet2.address))
      .to.emit(token, 'PreMint')
      .withArgs(1, wallet2.address, 5)
    // successfully preMint again
    await expect(token.preMint(1, 5, wallet2.address))
      .to.emit(token, 'PreMint')
      .withArgs(1, wallet2.address, 5)
    // disable premint
    await expect(token.disablePreMint(1)).to.not.be.reverted
    // Fail with premint disabled
    await expect(token.preMint(1, 5, wallet2.address)).to.be.revertedWith(
      'PREMINT_DISABLED'
    )
  })

//   it('will quantify upper limit preMint', async () => {
//     // create normal token
//     const params = [...defaults]
//     params[0] = 503
//     token = await NFT.deploy(
//       name,
//       symbol,
//       baseURI,
//       proxy,
//       wallet.address,
//       ...params
//     )
//     // successfully preMint up to gas limit
//     let tx = await token.preMint(503, wallet.address, { gasLimit: 15e6 })
//     let receipt = await tx.wait()
//     expect(receipt.gasUsed).to.eq(12897862)
//   })

//   it('will properly allow for switching token owner and revert for bad params', async () => {
//     const wallet2 = (await ethers.getSigners())[1]
//     const wallet3 = (await ethers.getSigners())[2]
//     token = await NFT.deploy(
//       name,
//       symbol,
//       baseURI,
//       proxy,
//       wallet.address,
//       ...defaults
//     )
//     // owner is the initial wallet in this case, switch wallet to test restriction
//     token = await token.connect(wallet2)
//     await expect(token.setPairOwner(wallet3.address)).to.be.revertedWith(
//       'FORBIDDEN_PAIR_OWNER'
//     )
//     // switch back to wallet1
//     token = await token.connect(wallet)
//     // invalid owner
//     await expect(
//       token.setPairOwner(ethers.constants.AddressZero)
//     ).to.be.revertedWith('INVALID_PAIR_OWNER')
//     // valid switch
//     await expect(token.setPairOwner(wallet2.address))
//       .to.emit(token, 'SetPairOwner')
//       .withArgs(wallet.address, wallet2.address)
//   })

//   it('will allow for token owner to signal close and revert for invalid attempts', async () => {
//     const wallet2 = (await ethers.getSigners())[1]
//     token = await NFT.deploy(
//       name,
//       symbol,
//       baseURI,
//       proxy,
//       wallet.address,
//       ...defaults
//     )
//     // owner is the initial wallet in this case, switch wallet to test restriction
//     token = await token.connect(wallet2)
//     await expect(token.signalClose()).to.be.revertedWith(
//       'FORBIDDEN_SIGNAL_CLOSE'
//     )
//     // switch back to wallet1
//     token = await token.connect(wallet)
//     // success
//     await expect(token.signalClose()).to.emit(token, 'SignalClose')
//     await expect(token.closeDeadline()).to.not.equal(0)
//     // close already signaled
//     await expect(token.signalClose()).to.be.revertedWith(
//       'CLOSE_ALREADY_SIGNALED'
//     )
//   })

//   it('will allow for any caller to close the market past signal deadline, or otherwise revert', async () => {
//     const wallet2 = (await ethers.getSigners())[1]
//     token = await NFT.deploy(
//       name,
//       symbol,
//       baseURI,
//       proxy,
//       wallet.address,
//       ...defaults
//     )
//     // attempt close, no signal
//     await expect(token.close()).to.be.revertedWith('INVALID_DEADLINE')
//     // successfully signal close
//     await expect(token.signalClose()).to.emit(token, 'SignalClose')
//     // attempt close, deadline not expired
//     await expect(token.close()).to.be.revertedWith('INVALID_DEADLINE')
//     // timeout
//     await ethers.provider.send('evm_increaseTime', [86400])
//     await ethers.provider.send('evm_mine', [])
//     // successfully close from any wallet
//     token = await token.connect(wallet2)
//     await expect(token.close()).to.emit(token, 'Close')
//   })

//   it('will revert buy calls with invalid params supplied', async () => {
//     // create normal token
//     token = await NFT.deploy(
//       name,
//       symbol,
//       baseURI,
//       proxy,
//       wallet.address,
//       ...defaults
//     )
//     // insufficient price
//     let buyPrice = await token.buyPrice()
//     await expect(token.buy(wallet.address)).to.be.revertedWith(
//       'INSUFFICIENT_FUNDS'
//     )
//     // create token with supply 1
//     const params = [...defaults]
//     params[0] = 1
//     token = await NFT.deploy(
//       name,
//       symbol,
//       baseURI,
//       proxy,
//       wallet.address,
//       ...params
//     )
//     // successfully buy 1
//     await expect(token.buy(wallet.address, { value: buyPrice })).to.emit(
//       token,
//       'Buy'
//     )
//     // sold out
//     buyPrice = await token.buyPrice()
//     await expect(
//       token.buy(wallet.address, { value: buyPrice })
//     ).to.be.revertedWith('MAX_SUPPLY')
//     // close market
//     await expect(token.signalClose()).to.emit(token, 'SignalClose')
//     await ethers.provider.send('evm_increaseTime', [86400])
//     await ethers.provider.send('evm_mine', [])
//     await expect(token.close()).to.emit(token, 'Close')
//     // market closed
//     await expect(
//       token.buy(wallet.address, { value: buyPrice })
//     ).to.be.revertedWith('MARKET_CLOSED')
//   })

//   it('will revert sell calls with invalid params supplied', async () => {
//     const wallet2 = (await ethers.getSigners())[1]
//     // create normal token
//     token = await NFT.deploy(
//       name,
//       symbol,
//       baseURI,
//       proxy,
//       wallet.address,
//       ...defaults
//     )
//     // attempt to sell before buying
//     await expect(token.sell(1, wallet.address)).to.be.revertedWith('INVALID_X')
//     // successfully buy 1
//     const buyPrice = await token.buyPrice()
//     await expect(token.buy(wallet.address, { value: buyPrice })).to.emit(
//       token,
//       'Buy'
//     )
//     // sell unappproved
//     token = await token.connect(wallet2)
//     await expect(token.sell(1, wallet.address)).to.be.reverted
//     // reverts in isApprovedForAll because no valid proxy in test
//     // With(
//     //   'UNAPPROVED_SELL'
//     // )
//     // successfull sell
//     token = await token.connect(wallet)
//     await expect(token.sell(1, wallet.address)).to.emit(token, 'Sell')
//     // close market
//     await expect(token.signalClose()).to.emit(token, 'SignalClose')
//     await ethers.provider.send('evm_increaseTime', [86400])
//     await ethers.provider.send('evm_mine', [])
//     await expect(token.close()).to.emit(token, 'Close')
//     // market closed
//     await expect(token.sell(1, wallet.address)).to.be.revertedWith(
//       'MARKET_CLOSED'
//     )
//   })
// })

// describe('DAOfiV1Pair test curves with various settings', () => {
//   beforeEach(async () => {
//     NFT = await ethers.getContractFactory('CommuniftyNFT')
//     wallet = (await ethers.getSigners())[0]
//   })

//   // max supply, init x, m, n, fee, pre mint
//   const curveTestCases: any[][] = [
//     [20, 1, 1, 1, 50, 10],
//     [20, 2, 1e3, 2, 50, 5],
//     [30, 35, 1, 3, 10, 20],
//     [367, 30000, 1, 1, 950, 0],
//   ]

//   curveTestCases.forEach((testData, i) => {
//     it(`case: ${i}`, async () => {
//       const wallet2 = (await ethers.getSigners())[1]
//       token = await NFT.deploy(
//         name,
//         symbol,
//         baseURI,
//         proxy,
//         wallet.address,
//         testData[0],
//         testData[1],
//         testData[2],
//         testData[3],
//         testData[4]
//       )
//       // premint
//       await expect(token.preMint(testData[5], wallet.address))
//         .to.emit(token, 'PreMint')
//         .withArgs(testData[5], wallet.address)
//       const balance = await token.balanceOf(wallet.address)
//       expect(balance).to.be.equal(ethers.BigNumber.from(testData[5]))
//       // loop buy supply with wallet 2
//       token = await token.connect(wallet2)
//       let totalEthReserve = zero
//       let totalPlatfromFees = zero
//       let totalOwnerFees = zero
//       for (let i = 0; i < testData[0] - testData[5]; ++i) {
//         // check buy price
//         const buyPrice = await token.buyPrice()
//         const calcPrice = getPriceForXWithFees(
//           testData[1] + i,
//           testData[2],
//           testData[3],
//           testData[4]
//         )
//         expect(buyPrice).to.be.equal(ethers.BigNumber.from(calcPrice))
//         // buy with excess ETH
//         await expect(
//           token.buy(wallet2.address, {
//             value: buyPrice.add(expandTo18Decimals(1)),
//           })
//         )
//           .to.emit(token, 'Buy')
//           .withArgs(
//             wallet2.address,
//             buyPrice,
//             testData[5] + (i + 1),
//             wallet2.address
//           )
//         // check total supply
//         const totalSupply = await token.totalSupply()
//         expect(totalSupply).to.be.equal(
//           ethers.BigNumber.from(testData[5] + (i + 1))
//         )
//         // check eth reserve
//         const basePrice = ethers.BigNumber.from(
//           getPriceForX(testData[1] + i, testData[2], testData[3])
//         )
//         const ethReserve = await token.ethReserve()
//         totalEthReserve = totalEthReserve.add(basePrice)
//         expect(ethReserve).to.be.equal(ethers.BigNumber.from(totalEthReserve))
//         // check fees
//         const platformFees = await token.platformFees()
//         const ownerFees = await token.ownerFees()
//         totalPlatfromFees = totalPlatfromFees.add(basePrice.mul(50).div(1000))
//         totalOwnerFees = totalOwnerFees.add(
//           basePrice.mul(testData[4]).div(1000)
//         )
//         expect(platformFees).to.be.equal(totalPlatfromFees)
//         expect(ownerFees).to.be.equal(totalOwnerFees)
//         // check that the total ETH balance on the contract is equal to reserves and fees
//         expect(await wallet.provider?.getBalance(token.address)).to.be.equal(
//           totalEthReserve.add(totalPlatfromFees).add(totalOwnerFees)
//         )
//       }
//       // check wallet 2 owns the total supply
//       const balance2 = await token.balanceOf(wallet2.address)
//       expect(balance2).to.be.equal(
//         ethers.BigNumber.from(testData[0] - testData[5])
//       )
//       // loop sell purchased tokens with wallet 2
//       for (let i = 0; i < testData[0] - testData[5]; ++i) {
//         const tokenId = testData[5] + (i + 1)
//         const sellPrice = await token.sellPrice()
//         // sell
//         await expect(token.sell(tokenId, wallet2.address))
//           .to.emit(token, 'Sell')
//           .withArgs(wallet2.address, sellPrice, tokenId, wallet2.address)
//         const nftReservePoolLength = await token.nftReservePoolLength()
//         expect(nftReservePoolLength).to.be.equal(ethers.BigNumber.from(i + 1))
//         // check eth reserve
//         const basePrice = ethers.BigNumber.from(
//           getPriceForX(
//             testData[0] - testData[5] - i + (testData[1] - 1),
//             testData[2],
//             testData[3]
//           )
//         )
//         const ethReserve = await token.ethReserve()
//         totalEthReserve = totalEthReserve.sub(basePrice)
//         expect(ethReserve).to.be.equal(ethers.BigNumber.from(totalEthReserve))
//         // check fees
//         const platformFees = await token.platformFees()
//         const ownerFees = await token.ownerFees()
//         totalPlatfromFees = totalPlatfromFees.add(basePrice.mul(50).div(1000))
//         totalOwnerFees = totalOwnerFees.add(
//           basePrice.mul(testData[4]).div(1000)
//         )
//         expect(platformFees).to.be.equal(totalPlatfromFees)
//         expect(ownerFees).to.be.equal(totalOwnerFees)
//         // check that the total ETH balance on the contract is equal to reserves and fees
//         expect(await wallet.provider?.getBalance(token.address)).to.be.equal(
//           totalEthReserve.add(totalPlatfromFees).add(totalOwnerFees)
//         )
//       }
//       // check that reserve is 0, which verifies curve + fee math from equal buying vs selling
//       expect(await token.ethReserve()).to.be.equal(zero)
//       // withdraw owner fees, check they are 0
//       expect(await token.ownerFees()).to.be.gt(zero)
//       await expect(token.withdrawOwnerFees())
//         .to.emit(token, 'WithdrawOwnerFees')
//         .withArgs(wallet2.address, totalOwnerFees)
//       expect(await token.ownerFees()).to.be.equal(zero)
//       // withdraw platform fees, check they are 0
//       expect(await token.platformFees()).to.be.gt(zero)
//       await expect(token.withdrawPlatformFees())
//         .to.emit(token, 'WithdrawPlatformFees')
//         .withArgs(wallet2.address, totalPlatfromFees)
//       expect(await token.platformFees()).to.be.equal(zero)
//       // verify total balance on the contract is 0
//       expect(await wallet.provider?.getBalance(token.address)).to.be.equal(zero)
//       // signal close, allow for buy and sell
//       token = await token.connect(wallet)
//       await expect(token.signalClose()).to.emit(token, 'SignalClose')
//       // buy twice and sell once to have some resere on close
//       await expect(
//         token.buy(wallet.address, { value: await token.buyPrice() })
//       ).to.emit(token, 'Buy')
//       await expect(
//         token.buy(wallet.address, { value: await token.buyPrice() })
//       ).to.emit(token, 'Buy')
//       await expect(token.sell(testData[5] + 1, wallet.address)).to.emit(
//         token,
//         'Sell'
//       )
//       // close market with non-zero reserve
//       await ethers.provider.send('evm_increaseTime', [86400])
//       await ethers.provider.send('evm_mine', [])
//       expect(await token.ethReserve()).to.not.be.equal(zero)
//       await expect(token.close()).to.emit(token, 'Close')
//       // reserve removed
//       expect(await token.ethReserve()).to.be.equal(zero)
//       // withdraw fees
//       expect(await token.ownerFees()).to.not.be.equal(zero)
//       await expect(token.withdrawOwnerFees()).to.emit(token, 'WithdrawOwnerFees')
//       expect(await token.ownerFees()).to.be.equal(zero)
//       expect(await token.platformFees()).to.not.be.equal(zero)
//       await expect(token.withdrawPlatformFees()).to.emit(
//         token,
//         'WithdrawPlatformFees'
//       )
//       expect(await token.platformFees()).to.be.equal(zero)
//       // verify total balance on the contract is 0
//       expect(await wallet.provider?.getBalance(token.address)).to.be.equal(zero)
//     })
//   })
})
