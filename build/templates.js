const fs = require('fs')
const path = require('path')

module.exports=function(){
  let templateFiles=fs.readdirSync(path.join(__dirname,'./template'))
  let template={}
  for (let index in templateFiles){
    template[templateFiles[index]] = require(path.join(__dirname,`./template/${templateFiles[index]}`))
  }
  return template
}
