const fs = require('fs')
const numTokens = 108

for (let i = 0; i < numTokens; ++i) {
  const metadata = {
    name: 'Trance DAO',
    description: `Trance DAO Membership #${i + 1}\n\nTrance DAO is a community of electronic music enthusiasts in the crypto space. The community shares music, organizes in-person networking events at festivals and shows, participate in philanthropy in music and creative arts, and organize live events and meetups.`,
    image: `ipfs://QmV3hBDBCx6GqndfDfh8CBgiapwHKF3GkRQmTSYVdvMhBQ/trance_assets/${
      i + 1
    }.png`,
    attributes: [{ trait_type: 'Membership', value: i + 1, display_type: 'number' }],
  }
  fs.writeFileSync(`trance_metadata/${i + 1}`, JSON.stringify(metadata))
}
