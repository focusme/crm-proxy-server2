const getLazadaHeader = ((cookie, baseUrl) => {
    let _index = baseUrl.indexOf("/");
    let _host = baseUrl.substr(_index + 2);
    return {
      'Authority': _host,
      'Accept': '*/*',
      //'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Cookie': cookie,
      'Referer': baseUrl + '/im/window',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:74.0) Gecko/20100101 Firefox/74.0',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'TE': 'Trailers'
    };
})


const getLazadaHeaderStr = ((cookie, baseUrl) => {
    let _headers = this.getLazadaHeader(cookie, baseUrl);
    return " -H 'User-Agent: " + _headers["User-Agent"] + "' " +
    " -H 'Accept: " + _headers["Accept"] + "' " +
    " -H 'Accept-Language: " + _headers["Accept-Language"] + "' " +
    " -H 'Referer: " + _headers["Referer"] + "' " +
    " -H 'Connection: " + _headers["Connection"] + "' " +
    " -H 'Authority: " + _headers["Authority"] + "' " +
    " -H 'Cookie: " + cookie + "' --compressed ";
})

module.exports = {
getLazadaHeader,
getLazadaHeaderStr
}
