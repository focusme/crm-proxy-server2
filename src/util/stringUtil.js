const filterUnderLine = (obj, char = '_') => {
    const arr = Object.keys(obj).filter(item => ~item.indexOf(char))
    arr.forEach(item => {
      const val = obj[item]
      const key = underline2Camel(item)
      obj[key] = val
      delete obj[item]
    })
    return obj
  }

/**
 * 将cookie中的旧值替换掉
 * @param {*} newCookie 
 * @param {*} cookie
 */
const resetCookie=(newCookie,cookie)=>{
  if(newCookie!=undefined && newCookie.length>0){
      let oldC =getCookies(cookie);
      for(let key in newCookie)  {
      let dC =getCookies(newCookie[key]);
      for (let [key, value] of dC) {
          oldC.set(key,value);
          }
      }
      return mapToCookieStr(oldC);
  }
  else{
      return null;
  }
}
const mapToCookieStr=(strMap)=>{
  let _cookie="";
  for (let[k,v] of strMap) {
      _cookie =_cookie+";"+k+"="+v;
  }
  if(_cookie==""){return ""}
  return _cookie.substr(1);
}

const getCookies =(cookie)=> {
  let map =new Map();
    if(cookie==undefined || cookie==""){
        return map;
    }
    let arr =cookie.split(";");
    if(arr.length>0){
        for(var i=0; i<arr.length; i++){
            let aCrumb = arr[i].split("=");
            if(map.get(aCrumb[0])==undefined){
              if(aCrumb[1]!=undefined){
                map.set(aCrumb[0].trim(),aCrumb[1].trim());
              }
              else{
                map.set(aCrumb[0].trim(),aCrumb[1]);
              }
                map.get("_m_h5_tk");
            }
        }
    }
   return map;
}

const formatUrl = (baseUrl,paramsArr,valArr) => {
  const paramsStr = formatUrlParams(paramsArr,valArr)
  return `${baseUrl}?${paramsStr}`
}
const formatUrlParams = (paramsArr,valArr) => {
  const urlSearchParams = new URLSearchParams();
  for(let i=0;i<paramsArr.length;i++){
      if(![undefined, null, ''].includes(valArr[i]) ){
          urlSearchParams.set(paramsArr[i], valArr[i]); 
      }

  }
  return urlSearchParams.toString()
}

module.exports = {
  filterUnderLine,
  resetCookie,
  getCookies,
  formatUrl
}
