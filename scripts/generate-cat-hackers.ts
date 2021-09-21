import * as fs from 'fs'
const numTokens: number = 6
const meta: any[] = [
  { name: 'Cat Hacker 3' },
  { name: 'Cat Hacker 1' },
  { name: 'Cat Hacker 6' },
  { name: 'Cat Hacker 4' },
  { name: 'Cat Hacker 2' },
  { name: 'Cat Hacker 5' },
]

for (let i = 0; i < numTokens; ++i) {
  const metadata = {
    name: meta[i].name,
    description: 'Painted Cat Hacker Film GIFs is a collection of videos of 16mm clips of cats against a green screen, portrayed in a lo-fi aesthetic. First presented across more than 75 billboards as part of Times Square Arts’ Midnight Moment series (the world\'s “largest, longest-running digital art exhibition”), it “pays homage to the feline’s role across many moving image genres,” from viral videos to experimental films.',
    image: `https://communifty.mypinata.cloud/ipfs/QmcwvnVBf48TFRzv52Grzs9FMgAQcT8i67HpY67ov4Mpck/${i + 1}.mp4`,
    external_url: `https://communifty.mypinata.cloud/ipfs/QmcwvnVBf48TFRzv52Grzs9FMgAQcT8i67HpY67ov4Mpck/${i + 1}.mp4`,
    attributes: [
      { trait_type: 'Painted Cat Hacker Film Gifs', value: `All Cat Hackers` },
    ]
  }

  fs.writeFileSync(`cat_hackers_metadata/${i + 1}`, JSON.stringify(metadata))
}
