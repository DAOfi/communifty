import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import { expect } from 'chai'
import { BigNumber, Contract, ContractFactory } from 'ethers'
import { ethers } from 'hardhat'
import { expandToDecimals, expandTo18Decimals } from './shared/utilities'

const zero = ethers.BigNumber.from(0)
const proxy = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
const name = 'Scorpio'
const symbol = 'SCRP'
const baseURI = 'https:/test.server/'

let NFT: ContractFactory
let token: Contract
let wallet: SignerWithAddress
let signers: SignerWithAddress[]

describe('ScorpioNFT success and revert cases', () => {
  beforeEach(async () => {
    NFT = await ethers.getContractFactory('ScorpioNFT')
    wallet = (await ethers.getSigners())[0]
  })

  it('reverts for any bad parameter given to constructor', async () => {
    await expect(
      NFT.deploy(name, symbol, ethers.constants.AddressZero, proxy)
    ).to.be.revertedWith('ZERO_OWNER')
  })

  it('will allow setupProject and revert setupProject in all conditions', async () => {
    const wallet2 = (await ethers.getSigners())[1]
    // create normal token
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
    // attempt to setupProject from wallet 2
    token = await token.connect(wallet2)
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.be.revertedWith('ONLY_OWNER')
    // switch back to wallet1
    token = await token.connect(wallet)
    // all fail cases
    await expect(
      token.setupProject(
        1,
        0,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.be.revertedWith('ZERO_MAX_TOKEN_ID')
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        1001,
        wallet.address,
        baseURI
      )
    ).to.be.revertedWith('MAX_ROYALTY_EXCEEDED')
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        ethers.constants.AddressZero,
        baseURI
      )
    ).to.be.revertedWith('ZERO_ROYALTY_ADDRESS')
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        ''
      )
    ).to.be.revertedWith('EMPTY_BASE_URI')
    // successful call
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.not.be.reverted
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.be.revertedWith('PROJECT_ALREADY_SETUP')
  })

  it('will allow preMint and revert preMint in all conditions', async () => {
    const wallet2 = (await ethers.getSigners())[1]
    // create normal token
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
    // successful setupProject call
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.not.be.reverted
    // attempt to preMint from wallet 2
    token = await token.connect(wallet2)
    await expect(token.preMint(1, 5, wallet2.address)).to.be.revertedWith(
      'ONLY_OWNER'
    )
    await expect(token.disablePreMint(1)).to.be.revertedWith('ONLY_OWNER')
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

  it('will quantify upper limit preMint', async () => {
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.not.be.reverted
    // successfully preMint up to gas limit
    let tx = await token.preMint(1, 200, wallet.address, { gasLimit: 15e6 })
    let receipt = await tx.wait()
    expect(receipt.gasUsed).to.eq(14238116)
  })

  it('will allow for any caller to withdraw proceeds', async () => {
    const wallet2 = (await ethers.getSigners())[1]
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.not.be.reverted
    // disable premint
    await expect(token.disablePreMint(1)).to.not.be.reverted
    // mint from wallet1
    const mintPrice = await token.projectToMintPrice(1)
    await expect(token.mint(1, wallet.address, { value: mintPrice })).to.emit(
      token,
      'Mint'
    )
    const balance = await wallet.provider?.getBalance(wallet.address)
    // successfully withdraw from any wallet
    token = await token.connect(wallet2)
    await expect(token.withdrawProceeds(1)).to.emit(token, 'WithdrawProceeds')
    expect(
      (await wallet.provider?.getBalance(wallet.address))?.gt(
        balance || ethers.constants.MaxUint256
      )
    )
  })

  it('will allow for any caller to withdraw proceeds to owner', async () => {
    const wallet2 = (await ethers.getSigners())[1]
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
    await expect(
      token.setupProject(
        1,
        10000,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.not.be.reverted
    // disable premint
    await expect(token.disablePreMint(1)).to.not.be.reverted
    // mint from wallet1
    const mintPrice = await token.projectToMintPrice(1)
    await expect(token.mint(1, wallet.address, { value: mintPrice })).to.emit(
      token,
      'Mint'
    )
    const balance = await wallet.getBalance()
    // successfully withdraw from any wallet
    token = await token.connect(wallet2)
    await expect(token.withdrawProceeds(1)).to.emit(token, 'WithdrawProceeds')
    expect((await wallet.getBalance()).gt(balance))
  })

  it('will allow for any caller to withdraw royalties to recipient', async () => {
    const wallet2 = (await ethers.getSigners())[1]
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
    await expect(
      token.setupProject(
        1,
        200,
        expandToDecimals(69, 15),
        50,
        wallet2.address,
        baseURI
      )
    ).to.not.be.reverted
    // disable premint
    await expect(token.disablePreMint(1)).to.not.be.reverted
    // mint from wallet1
    const mintPrice = await token.projectToMintPrice(1)
    await expect(token.mint(1, wallet.address, { value: mintPrice })).to.emit(
      token,
      'Mint'
    )
    const balance = await wallet2.getBalance()
    // successfully withdraw from any wallet
    await expect(token.withdrawRoyalties(1)).to.emit(token, 'WithdrawRoyalties')
    expect((await wallet2.getBalance()).gt(balance))
  })

  it('will allow/revert mint in all conditions', async () => {
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
    // un-setup
    let mintPrice = await token.projectToMintPrice(1)
    await expect(
      token.mint(1, wallet.address, { value: mintPrice })
    ).to.be.revertedWith('PROJECT_NOT_SETUP')
    // setup
    await expect(
      token.setupProject(
        1,
        200,
        expandToDecimals(69, 15),
        50,
        wallet.address,
        baseURI
      )
    ).to.not.be.reverted
    // pre-mint active
    mintPrice = await token.projectToMintPrice(1)
    await expect(
      token.mint(1, wallet.address, { value: mintPrice })
    ).to.be.revertedWith('PREMINT_ENABLED')
    // pre-mint up to limit - 1 and disable premint
    await expect(
      token.preMint(1, 199, wallet.address, { gasLimit: 15e6 })
    ).to.emit(token, 'PreMint')
    await expect(token.disablePreMint(1)).to.not.be.reverted
    // insufficient value
    await expect(
      token.mint(1, wallet.address, { value: zero })
    ).to.be.revertedWith('MINT_PRICE_NOT_MET')
    // success
    await expect(token.mint(1, wallet.address, { value: mintPrice })).to.emit(
      token,
      'Mint'
    )
    // max supply
    mintPrice = await token.projectToMintPrice(1)
    await expect(
      token.mint(1, wallet.address, { value: mintPrice })
    ).to.be.revertedWith('MAX_SUPPLY_MINTED')
  })
})

describe('ScorpioNFT with multiple tokens using various settings', () => {
  before(async () => {
    signers = await ethers.getSigners()
    NFT = await ethers.getContractFactory('ScorpioNFT')
    wallet = signers[0]
    token = await NFT.deploy(name, symbol, wallet.address, proxy)
  })

  // max tokens, price, fee, base URI, pre-mint amount
  const parameters: any[][] = [
    [5, '0.069', 50, 'ipfs://tk1/', 0],
    [10, '0.42', 0, 'ipfs://tk2/', 2],
    [15, '1.0', 150, 'ipfs://tk3/', 4],
    [20, '2.0', 1000, 'ipfs://tk4/', 8],
  ]
  const totals = {
    preMinted: 0,
    projectProceeds: [zero],
    proceeds: zero,
    projectRoyalties: [zero],
    royalties: zero,
  }
  let tokenId = 0

  parameters.forEach((testData, projectId) => {
    it(`test case: ${projectId}`, async () => {
      projectId = projectId + 1
      const royaltyWallet = signers[projectId]
      // setup
      await expect(
        token.setupProject(
          projectId,
          testData[0],
          ethers.utils.parseEther(testData[1]),
          testData[2],
          royaltyWallet.address,
          testData[3]
        )
      ).to.not.be.reverted

      // premint
      await expect(token.preMint(projectId, testData[4], wallet.address))
        .to.emit(token, 'PreMint')
        .withArgs(projectId, wallet.address, testData[4])
      totals.preMinted += testData[4]
      tokenId += testData[4]
      const balance = await token.balanceOf(wallet.address)
      expect(balance).to.be.equal(ethers.BigNumber.from(totals['preMinted']))

      // disable premint
      await expect(token.disablePreMint(projectId)).to.not.be.reverted
      // loop to mint total supply
      for (let i = 0; i < testData[0] - testData[4]; ++i) {
        const mintPrice = await token.projectToMintPrice(projectId)
        // increment expected internal tokenId
        tokenId++
        // mint
        await expect(
          token.mint(projectId, royaltyWallet.address, {
            value: mintPrice,
          })
        )
          .to.emit(token, 'Mint')
          .withArgs(
            projectId,
            tokenId,
            testData[4] + (i + 1),
            mintPrice,
            royaltyWallet.address
          )
        // check total supply
        const totalSupply = await token.totalSupply()
        expect(totalSupply).to.be.equal(ethers.BigNumber.from(tokenId))
        // check project supply
        const projectSupply = await token.projectToCurrentTokenId(projectId)
        expect(projectSupply).to.be.equal(
          ethers.BigNumber.from(testData[4] + (i + 1))
        )
        // check token URI
        const tokenURI = await token.tokenURI(tokenId)
        expect(tokenURI).to.be.equal(testData[3] + projectSupply)
        // check royalty fees
        const royaltyFee = mintPrice.mul(testData[2]).div(1000)
        totals.projectRoyalties[projectId] = (
          totals.projectRoyalties[projectId]
            ? totals.projectRoyalties[projectId]
            : zero
        ).add(royaltyFee)
        const projectRoyalties = await token.projectToRoyalties(projectId)
        expect(projectRoyalties).to.be.equal(totals.projectRoyalties[projectId])
        totals.royalties = totals.royalties.add(royaltyFee)
        // check eth proceeds
        const ethProceeds = mintPrice.sub(royaltyFee)
        totals.projectProceeds[projectId] = (
          totals.projectProceeds[projectId]
            ? totals.projectProceeds[projectId]
            : zero
        ).add(ethProceeds)
        const projectProceeds = await token.projectToProceeds(projectId)
        expect(projectProceeds).to.be.equal(totals.projectProceeds[projectId])
        totals.proceeds = totals.proceeds.add(ethProceeds)
        // check that the total ETH balance on the contract is equal to reserves and fees
        const contractBalance =
          (await wallet.provider?.getBalance(token.address)) || zero
        expect(contractBalance).to.be.equal(
          totals.proceeds.add(totals.royalties)
        )
      }
    })
  })

  parameters.forEach((testData, projectId) => {
    it(`verify case: ${projectId}`, async () => {
      projectId = projectId + 1
      const royaltyWallet = signers[projectId]
      // check royalty wallet owns the minted supply
      const mintBalance = await token.balanceOf(royaltyWallet.address)
      expect(mintBalance).to.be.equal(
        ethers.BigNumber.from(testData[0] - testData[4])
      )
      // withdraw royalty fees, check royalty wallet ballance
      const royaltyBalance = await royaltyWallet.getBalance()
      await expect(token.withdrawRoyalties(projectId))
        .to.emit(token, 'WithdrawRoyalties')
        .withArgs(projectId, totals.projectRoyalties[projectId])
      expect(await token.projectToRoyalties(projectId)).to.be.equal(zero)
      expect(await royaltyWallet.getBalance()).to.be.equal(
        royaltyBalance.add(totals.projectRoyalties[projectId])
      )
      // connect to non-owner wallet
      token = token.connect(signers[parameters.length])
      // withdraw proceeds, check wallet balance
      const walletBalance = await wallet.getBalance()
      await expect(token.withdrawProceeds(projectId))
        .to.emit(token, 'WithdrawProceeds')
        .withArgs(projectId, totals.projectProceeds[projectId])
      expect(await token.projectToProceeds(projectId)).to.be.equal(zero)
      expect(await wallet.getBalance()).to.be.equal(
        walletBalance.add(totals.projectProceeds[projectId])
      )
      // connect back to owner wallet
      token = token.connect(wallet)
    })
  })
})
