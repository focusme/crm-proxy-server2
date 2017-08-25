let config = {
  development: {
    sqlConfig:{
      host     : '127.0.0.1',
      user     : 'root',
      password : 'kindom',
      database : 'home',
      connectionLimit: 10
    }
  },
  production:{

  }
}

module.exports = {
   port: 8000,

   key: 'XXXXXX', //开发务必修改
   
   sqlConfig: config[process.env.NODE_ENV || "development"].sqlConfig
}
