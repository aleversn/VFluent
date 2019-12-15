// TODO: 替换更深层次的对象

/**
 * @param template 模板
 * @param obj 替换对象或数组
 * @returns string 返回替换后的字符串
 */
module.exports=function(template,obj={},replaceIndex=false){
  if (typeof obj!='object'){
    console.warn('para[2] must be an object')
    process.exit(1);
  }
  let content ='';
  if (obj instanceof Array){
    for (let index in obj){
      let s = template;
      if (typeof obj[index] == 'object')  
        for (let key in obj[index]){
          s=s.replace(new RegExp(`{{${key}}}`,'g'),obj[index][key])
        }
      else
        s=s.replace(new RegExp(`{{}}`,'g'),obj[index])
      if (replaceIndex){
        s=s.replace(new RegExp(`{{index}}`,'g'),index)
      }
      content+=s
    }
  }else{
    let s=template
    for (let key in obj){
      s=s.replace(new RegExp(`{{${key}}}`,'g'),obj[key])
    }
    content+=s;
  }
  return content;
}