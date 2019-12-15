const fs = require("fs"),path = require("path"),filesave=require('file-save');
const uppercamelcase = require('uppercamelcase')

const config=require('./config.js')


const theme = config.theme

function rmdir(url){
    var files = [];
        
    if( fs.existsSync(url) ) {  
           
        files = fs.readdirSync(url);  
        files.forEach(function(file){
            var curPath = path.join(url,file);
                
            if(fs.statSync(curPath).isDirectory()) { 
                rmdir(curPath);
            } else {    
                fs.unlinkSync(curPath);    
            }
                
        });
           
        fs.rmdirSync(url); //清除文件夹
    }else{
        console.log("file dir not exists！");
    }
}

function rm(url,name){
  var files = [];
      
  if( fs.existsSync(url) ) {   
         
      files = fs.readdirSync(url);    

      files.forEach(function(file){

          var curPath = path.join(url,file);

          if(fs.statSync(curPath).isDirectory()) { 
              rm(curPath,name);
          } else {   
                 
              if(file.indexOf(name)>-1){    
                  fs.unlinkSync(curPath);
                  console.log("remove file："+curPath);
              }
          }  
      });
  }else{
      console.log("file not exists！");
  }
}

if (!process.argv[2]){
  console.log('The Argument[2]:ComponentName is required!')
  process.exit(1)
}

let componentName = uppercamelcase(process.argv[2])

let components = require('../components.json')

if (!components[componentName]){
  console.log(`The Component ${componentName} does not exists!`)
  process.exit(1)
}

try{
    rmdir(path.join(__dirname,`../examples/docs/zh/${componentName}/`))
}catch (e){
    console.log(e)
}
try{
    rmdir(path.join(__dirname,`../packages/${componentName}/`))
}catch (e){
    console.log(e)
}
try{
    rm(path.join(__dirname,`../packages/common-theme/`),`${componentName}.scss`)
    for (let index in theme)
        rm(path.join(__dirname,`../packages/${theme[index]}-theme/`),`${componentName}.scss`)
}catch(e){
    console.log(e)
}

delete components[componentName]

filesave(path.join(__dirname,'../components.json')).write(JSON.stringify(components,null,'  '),'utf8').end('\n')

console.log(`component ${componentName} remove!`)

const entry = require('./entry.js')

entry()


