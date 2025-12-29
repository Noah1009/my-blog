// scripts/test-microcms.js
const { client } = require('../lib/api')

async function test() {
  const res = await client.get({
    endpoint: 'sake-articles',
    contentId: 'o9_q_x-jv',
  })
  console.log(res)
}

test().catch(console.error)
