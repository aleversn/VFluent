let process = require('child_process')
let pack = require('../package.json')
const path = require('path')
let fileSave = require('file-save')
process.exec("npm view vfluentdesign version",function(error,stdout,stderr){
  pack.version=stdout.replace('\n','')
  fileSave(path.join(__dirname,'../package.json')).write(JSON.stringify(pack,null,2),'utf8').end('\n')
})