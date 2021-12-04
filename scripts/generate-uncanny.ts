import * as fs from 'fs'
const meta: any[] = [
  { name: '#likeme', file_size: '225 KB' },
  { name: '#maybeshesjustrealhungry', file_size: '225 KB' },
  { name: '#smokeshow', file_size: '211 KB' },
  { name: '#fucku', file_size: '124 KB' },
  { name: '#idoandiwishididnt', file_size: '1.1 MB' },
  { name: '#forme', file_size: '127 KB' },
  { name: '#fuckyourfeelings', file_size: '177 KB' },
  { name: '#ride', file_size: '130 KB' },
  { name: '#sadgirlsclub', file_size: '576 KB' },
  { name: '#idc', file_size: '138 KB' },
  { name: '#pcflower', file_size: '149 KB' },
  { name: '#lisafrank', file_size: '1.4 MB' },
  { name: '#liveforthelikesliketolive', file_size: '167 KB' },
  { name: '#thevirginsuicides', file_size: '155 KB' },
  { name: '#tooprettytowork#tooweirdtolive#tooraretodie', file_size: '184 KB' },
  { name: '#cybaer', file_size: '202 KB' },
  { name: '#thatshot', file_size: '136 KB' },
  { name: '#flowerlicker', file_size: '113 KB' },
  { name: '#iloveitcauseuhateit', file_size: '136 KB' },
  { name: '#dontgiveupchildren', file_size: '156 KB' },
  { name: '#breaktheinternet', file_size: '158 KB' },
  { name: '#cyberspace', file_size: '169 KB' },
  { name: '#goodnightpost', file_size: '198 KB' },
  { name: '#slippery', file_size: '162 KB' },
  { name: '#stealinyowifi', file_size: '153 KB' },
  { name: '#dontgivealovelymothafuck', file_size: '98 KB' },
  { name: '#mysticaljourney', file_size: '139 KB' },
  { name: '#3am', file_size: '116 KB' },
  { name: '#myfavecolors', file_size: '138 KB' },
  { name: '#connect', file_size: '120 KB' },
  { name: '#bad', file_size: '105 KB' },
  { name: '#i<3pink', file_size: '156 KB' },
  { name: '#touchmybutt', file_size: '102 KB' },
  { name: '#fuckupayme', file_size: '1.4 MB' },
  { name: '#goodcrywimygirls', file_size: '339 KB' },
  { name: '#NOTINTERESTED', file_size: '133 KB' },
  { name: '#wifiprincess', file_size: '145 KB' },
  { name: '#goodbye', file_size: '163 KB' },
  { name: '#mindyourdata', file_size: '146 KB' },
  { name: '#wildmind', file_size: '157 KB' },
]

for (let i = 0; i < meta.length; ++i) {
  const metadata = {
    name: meta[i].name,
    description: `@uncannysfvalley advocates for a metric of valuation which aligns with Hito Steryel’s conception of an image's quality being measured by its popularity, subverting classicist notions of high resolution and elitist tech-fetishization as an indication of value.`,
    image: `ipfs://Qmazr3PULuRxp4g4WNHUyyNYvdxYt7CjN4B1BzCk7q8JWB/${i + 1}.jpg`,
    external_url: `https://communifty.mypinata.cloud/ipfs/Qmazr3PULuRxp4g4WNHUyyNYvdxYt7CjN4B1BzCk7q8JWB/${
      i + 1
    }.jpg`,
    attributes: [
      { trait_type: 'Uncannysfvalley: Volume 1', value: `All Uncannysfvalley: Volume 1` },
      { trait_type: 'File Size', value: meta[i].file_size },
    ],
  }

  fs.writeFileSync(`uncanny_metadata/${i + 1}`, JSON.stringify(metadata))
}
