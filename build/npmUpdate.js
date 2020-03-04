let process = require('child_process')
let pack = require('../package.json')
const path = require('path')
let fileSave = require('file-save')

let version={
  patch:function(str){
    let num=str.split('.')
    let c=1;
    for (let i=num.length-1;i>=0;--i){
      num[i]=parseInt(num[i])
      num[i]+=c;
      c=Math.floor(num[i]/100)
      num[i]%=100;
    }
    return num.join('.')
  }
}

process.exec("npm view vfluentdesign version",function(error,stdout,stderr){
  pack.version=stdout.replace('\n','')
  pack.version=version.patch(pack.version)
  console.log(`new version:${pack.version}`)
  fileSave(path.join(__dirname,'../package.json')).write(JSON.stringify(pack,null,2),'utf8').end('\n')
})