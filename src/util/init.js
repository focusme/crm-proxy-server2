const query = require('../sql/query.js');

const {
    selectUser,addUser
} = require('../sql/sql.js')

const {userConfig} =require('../config')
const {md5Change} = require('./index.js')

module.exports = async function() {
   let email = userConfig.email;
   let passWord = md5Change(userConfig.passWord);
   let leave = userConfig.leave;
   let name = userConfig.name;
   query(selectUser(email)).then(data =>{
     if(data.length === 0){
       query(addUser(email,passWord,name,leave)).then(data=>{
         console.log('初始化用户名和密码成功！ 用户名：'+email);
       })
     }
   })

}
