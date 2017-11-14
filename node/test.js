const fs = require('fs')
const path = require('path')

let target = path.join(__dirname, process.argv[2] || './')

function load(target, depth) { // 缩进等级
  // let prefix = '│ '.repeat(depth) // 锁进前缀 es6 写法
  let prefix = new Array(depth + 1).join('│ ') // 锁进前缀
  let dirinfos = fs.readdirSync(target)

  let dirs = [], files = []

  dirinfos.forEach(info => {
    let stats = fs.statSync(path.join(target, info))
    if (stats.isFile()) {
      files.push(info)
    } else {
      dirs.push(info)
    }
  })

  dirs.forEach(dir => {
    console.log(`${prefix}├──${dir}`)
    load(path.join(target, dir), depth + 1)
  })
  let count = files.length - 1
  files.forEach(file => {
    console.log(`${prefix}${count -- ? '├──' : '└──'}${file}`)
  })
}

load(target, 0)