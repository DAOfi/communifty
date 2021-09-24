import * as fs from 'fs'
const numTokens: number = 97
const description = 'Contemporary artist Jared Madere, presents as his first NFT-minted work, THE CRAZY LIFE IS NUTS/COCOA STRAWBERRY CLUB - three socio-emotive video collages or virtual music boxes whose soundtracks are entirely synthesized using AI. The AI techniques employed by Madere rapidly reimagine an entire world based on a flood of clues, communities, and the musicality of collectivity and consensus. The viewer’s conception of the world is redefined according to a sequence of fleeting elements that rush into and out of her field of comprehension. Each work in the three-part CRAZY LIFE suite revolves around the emotions and fantasies stirred by the mania of the global marketplace and the theatrical majesty of its peaks and valleys—a living system producing outcomes which seem at once coincidental and inevitable, rational and lunatic.'
let cl1 = 0, cl2 = 0, cl3 = 0

for (let i = 0; i < numTokens; ++i) {
  let name
  let image
  let external_url

  if (i < 48) {
    name = 'Crazy Life 1'
    image = external_url = 'https://communifty.mypinata.cloud/ipfs/QmeDs5uyRMrirT5VfgeF8U8CpUbVTWV2j3fwJYtRBu767V'
    cl1++
  } else if (i < 75) {
    name = 'Crazy Life 2'
    image = external_url = 'https://communifty.mypinata.cloud/ipfs/QmRg6vvqrJNdfGrATS8Tehaqm38jd6fs1ajxgE3GyzoKYW'
    cl2++
  } else {
    name = 'Crazy Life 3'
    image = external_url = 'https://communifty.mypinata.cloud/ipfs/QmU1wB4GzVgPPB4agsKuErQsKJzsyRJ6ZCw2SaqLGurhzq'
    cl3++
  }

  const metadata = {
    name,
    description,
    image,
    external_url,
    attributes: [
      { trait_type: 'Crazy Life is Nuts', value: 'All Crazy Life is Nuts' },
    ],
  }

  fs.writeFileSync(`crazy_life_videos_metadata/${i + 1}`, JSON.stringify(metadata))
}

console.log(`crazy life 1: ${cl1}`)
console.log(`crazy life 2: ${cl2}`)
console.log(`crazy life 3: ${cl3}`)
