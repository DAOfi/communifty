import * as fs from 'fs'

const meta: any[] = [
  {
    name: 'Cocoa Strawberry 10',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //1
  {
    name: 'Cocoa Strawberry 36',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //2
  {
    name: 'Cocoa Strawberry 21',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //3
  {
    name: 'Cocoa Strawberry 27',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //4
  {
    name: 'Cocoa Strawberry 53',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //5
  {
    name: 'Cocoa Strawberry 81',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem', 'Single Chrome Leaf'],
  }, //6
  {
    name: 'Cocoa Strawberry 50',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //7
  {
    name: 'Cocoa Strawberry 76',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //8
  {
    name: 'Cocoa Strawberry 68',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //9
  {
    name: 'Cocoa Strawberry 8',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //10
  {
    name: 'Cocoa Strawberry 28',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //11
  {
    name: 'Cocoa Strawberry 3',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //12
  {
    name: 'Cocoa Strawberry 32',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //13
  {
    name: 'Cocoa Strawberry 23',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //14
  {
    name: 'Cocoa Strawberry 70',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //15
  {
    name: 'Cocoa Strawberry 41',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //16
  {
    name: 'Cocoa Strawberry 63',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //17
  {
    name: 'Cocoa Strawberry 20',
    tags: ['All Cocoa Strawberry Club', 'Green Stem', 'Single Chrome Leaf'],
  }, //18
  {
    name: 'Cocoa Strawberry 16',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //19
  {
    name: 'Cocoa Strawberry 71',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //20
  {
    name: 'Cocoa Strawberry 11',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //21
  {
    name: 'Cocoa Strawberry 80',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem', 'Single Chrome Leaf'],
  }, //22
  {
    name: 'Cocoa Strawberry 33',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //23
  {
    name: 'Cocoa Strawberry 26',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //24
  {
    name: 'Cocoa Strawberry 13',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //25
  {
    name: 'Cocoa Strawberry 6',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //26
  {
    name: 'Cocoa Strawberry 44',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //27
  {
    name: 'Cocoa Strawberry 66',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //28
  {
    name: 'Cocoa Strawberry 61',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem', 'Single Chrome Leaf'],
  }, //29
  {
    name: 'Cocoa Strawberry 82',
    tags: ['All Cocoa Strawberry Club', 'Chrome Duchess'],
  }, //30
  {
    name: 'Cocoa Strawberry 7',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //31
  {
    name: 'Cocoa Strawberry 64',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //32
  {
    name: 'Cocoa Strawberry 24',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //33
  {
    name: 'Cocoa Strawberry 19',
    tags: ['All Cocoa Strawberry Club', 'Green Stem', 'Single Chrome Leaf'],
  }, //34
  {
    name: 'Cocoa Strawberry 72',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //35
  {
    name: 'Cocoa Strawberry 18',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //36
  {
    name: 'Cocoa Strawberry 45',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //37
  {
    name: 'Cocoa Strawberry 35',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //38
  {
    name: 'Cocoa Strawberry 59',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //39
  {
    name: 'Cocoa Strawberry 51',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //40
  {
    name: 'Cocoa Strawberry 25',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //41
  {
    name: 'Cocoa Strawberry 56',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //42
  {
    name: 'Cocoa Strawberry 14',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //43
  {
    name: 'Cocoa Strawberry 34',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //44
  {
    name: 'Cocoa Strawberry 62',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //45
  {
    name: 'Cocoa Strawberry 17',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //46
  {
    name: 'Cocoa Strawberry 9',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //47
  {
    name: 'Cocoa Strawberry 79',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //48
  {
    name: 'Cocoa Strawberry 69',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //49
  {
    name: 'Cocoa Strawberry 48',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //50
  {
    name: 'Cocoa Strawberry 74',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //51
  {
    name: 'Cocoa Strawberry 47',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //52
  {
    name: 'Cocoa Strawberry 60',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //53
  {
    name: 'Cocoa Strawberry 1',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //54
  {
    name: 'Cocoa Strawberry 22',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //55
  {
    name: 'Cocoa Strawberry 37',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //56
  {
    name: 'Cocoa Strawberry 83',
    tags: ['All Cocoa Strawberry Club', 'Chrome Duchess'],
  }, //57
  {
    name: 'Cocoa Strawberry 78',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //58
  {
    name: 'Cocoa Strawberry 2',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //59
  {
    name: 'Cocoa Strawberry 29',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //60
  {
    name: 'Cocoa Strawberry 42',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //61
  {
    name: 'Cocoa Strawberry 65',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //62
  {
    name: 'Cocoa Strawberry 84',
    tags: ['All Cocoa Strawberry Club', 'Chrome Queen'],
  }, //63
  {
    name: 'Cocoa Strawberry 4',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //64
  {
    name: 'Cocoa Strawberry 30',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //65
  {
    name: 'Cocoa Strawberry 43',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //66
  {
    name: 'Cocoa Strawberry 67',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //67
  {
    name: 'Cocoa Strawberry 5',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //68
  {
    name: 'Cocoa Strawberry 31',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //69
  {
    name: 'Cocoa Strawberry 46',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //70
  {
    name: 'Cocoa Strawberry 73',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //71
  {
    name: 'Cocoa Strawberry 12',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //72
  {
    name: 'Cocoa Strawberry 38',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem'],
  }, //73
  {
    name: 'Cocoa Strawberry 49',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //74
  {
    name: 'Cocoa Strawberry 75',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //75
  {
    name: 'Cocoa Strawberry 15',
    tags: ['All Cocoa Strawberry Club', 'Green Stem'],
  }, //76
  {
    name: 'Cocoa Strawberry 39',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem', 'Single Chrome Leaf'],
  }, //77
  {
    name: 'Cocoa Strawberry 52',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //78
  {
    name: 'Cocoa Strawberry 77',
    tags: ['All Cocoa Strawberry Club', 'Pink Stem'],
  }, //79
  {
    name: 'Cocoa Strawberry 58',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //80
  {
    name: 'Cocoa Strawberry 54',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //81
  {
    name: 'Cocoa Strawberry 40',
    tags: ['All Cocoa Strawberry Club', 'Gold Stem', 'Single Chrome Leaf'],
  }, //82
  {
    name: 'Cocoa Strawberry 55',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //83
  {
    name: 'Cocoa Strawberry 57',
    tags: ['All Cocoa Strawberry Club', 'Purple Stem'],
  }, //84
]

for (let i = 0; i < meta.length; ++i) {
  const metadata: any = {
    name: meta[i].name,
    description:
      "The Cocoa Strawberry Club is a collection of NFTs by Jared Madere brought to you by the team at Scorpio.World. The chocolate covered strawberries symbolize the swirling confluence of seduction, desire, volatile fluctuation of global marketplaces, and ultimately the commodification of love and emotion.\n\nAs suggested by the penlight graffiti shimmering in curing chocolate, the Cocoa Strawberry Club NFTs offers her original minted members entry into Madere's companion project, The Crazy Life Is Nuts, through a system of tiered membership. Different color berries confer ownership of one or more of the three AI generative videos in the Crazy Life suite. Purple (21) and Green (20) stem berries grant ownership of the first video, Gold stem berries (20) grant ownership of the second video, and Pink stem berries (20) grant ownership of the third and most baroque video in the Crazy Life suite. The Chrome Queen (1) and Chrome Duchesses (2) allot ownership of the entire suite of Crazy Life videos, while any of the rare Chrome-leafed berries (7) grant ownership of two of the three videos chosen at random.",
    image: `https://communifty.mypinata.cloud/ipfs/QmUdPSkmAzAe462aYNBTX2F1gzJ3uJ543SHaez3zATV1RF/${
      i + 1
    }.jpg`,
    external_url: `https://communifty.mypinata.cloud/ipfs/QmUdPSkmAzAe462aYNBTX2F1gzJ3uJ543SHaez3zATV1RF/${
      i + 1
    }.jpg`,
    attributes: [],
  }

  for (let j = 0; j < meta[i].tags.length; j++) {
    metadata.attributes.push({
      trait_type: 'Crazy Life is Nuts: Cocoa Strawberry Club',
      value: meta[i].tags[j],
    })
  }

  fs.writeFileSync(
    `cocoa_strawberry_metadata/${i + 1}`,
    JSON.stringify(metadata)
  )
}
