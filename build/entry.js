// TODO: Auto script for generate the entry of  index.js 

// dependencies
const path = require('path')
const fileSave = require('file-save') 

// varible
let components = require('../components.json')
const template = require('./templates.js')()
const config = require('./config.js')
// theme
const theme = config.theme
const prefix = config.name.short.toLowerCase()

// utils
const render = require('./utils/render.js')

let sidebar = [
  '/'
]
for (let key in components)
{
  sidebar.push(`/zh/${key}/`)
}

let files=[]

files.push({
  file:path.join(__dirname,'../examples/docs/sidebar.json'),
  content:JSON.stringify(sidebar,null,'  ')
})

let installs=render('  {{}},\n',Object.keys(components))
let imports=''
for (let key in components){
  if (components[key])
    imports+=`import ${key} from '${components[key].entry}'\n`
}

let themeTemplate = `import './{{}}-theme/index.scss'\n`;
let themes = render(themeTemplate,theme)

files.push({
  file:path.join(__dirname,`../packages/index.js`),
  content:themes+render(template['packages.entry.js'],{
    installs,
    imports,
    prefix
  })
})

for (let index in theme){
  files.push({
    file:path.join(__dirname,`../packages/${theme[index]}-theme/index.scss`),
    content:`@import '../common-theme/global.scss';\n`+render(`@import './{{}}.scss';\n`,Object.keys(components))
  })
}


for (let index in files){
  fileSave(files[index].file).write(files[index].content,'utf8').end('\n')
}

module.exports=function(){
  // region: file save
}