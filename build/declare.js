const path = require('path')
const fs = require('fs')
const render = require('./utils/render')

let components = require('../components.json')
const template = require('./templates')()
const config = require('./config')
let files =[]
for (let key in components){
  files.push({
    file:path.join(__dirname,`../types/${key.toLowerCase()}.d.ts`),
    content:render(template['component.d.js'],{
      ProjectName:config.name.full,
      ComponentName:config.name.short+key
    })
  })
}

for (let index in files){
  let item = files[index];
  fs.writeFile(item.file,item.content,()=>{
    console.log(item.file)
  })
}