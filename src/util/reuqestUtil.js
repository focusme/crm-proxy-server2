import axios  from'axios';
import curlirize from 'axios-curlirize';
class RequestUtil {
  constructor() {
    curlirize(axios);
  }

    post (url, datas){
        return new Promise( function(resolve, reject) {
            axios.post(url,datas)
            .then(function(res){
              resolve(res)
            })
            .catch(function(err){
              console.log(err);
              reject(err)
            });
          } );
    }

    get (url, headers){
        return new Promise( function(resolve, reject) {
            axios.get(url, {headers})
              .then(function (res) {
                resolve(res)
              })
              .catch(function (err) {
                console.log(err);
                reject(err)
              })
            });
    }

    
      
     

    

}

module.exports = new RequestUtil()