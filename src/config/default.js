const config = {
    appName:"crm_node_rest",
    // 启动端口
    port: 1200,
    // 数据库配置
    database: {
      DATABASE: 'a22_crm',
      USERNAME: 'a22_crm',
      PASSWORD: '3egP7#rNGULyiul&',
      PORT: '3306',
      HOST: '52.80.74.156'
    },
    redis: {
      password: 'Hs7dn7his5oo5xGJ',
      isRedisCluster: true,
      nodes: [
        {
          port: 7002,
          host: '52.80.74.156'
        },
        {
          port: 7003,
          host: '52.80.74.156'
        },
        {
          port: 7004,
          host: '52.80.74.156'
        },
        {
          port: 7005,
          host: '52.80.74.156'
        },
        {
          port: 7006,
          host: '52.80.74.156'
        },
        {
          port: 7007,
          host: '52.80.74.156'
        }
      ]
    },
    message: {
      notfound: { code: 1, msg: "页面没找到!" },
      servererr: { code: 1, msg: "服务器内部异常!" },
      success: { code: 0, msg: "操作成功!" },
      error: { code: 1, msg: "操作失败!" }
    }
  }
  
  module.exports = config
  