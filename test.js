const assert = require('assert')

async function test() {
  console.log('111')
  try {
    await test1()
    console.log(333)
  } catch (error) {
    console.log(error.message)
  }
}

async function test1() {
  console.log(222)
  assert(1 > 2, '德玛西亚')
}

test()