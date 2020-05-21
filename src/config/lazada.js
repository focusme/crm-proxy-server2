const config = {
    ws: {
      aserverProxy: "msgacs-m.lazada-seller.cn",
      appkey: "H5_24813843",
      heartbeat: true,
      timeout: 10000,
      ports: 443,
    },
    info: {
      basePath: "/im/web/getLoginUserInfo" //获取卖家id
    },
    getImToken: {
      basePath: "/im/ajax/use/getImToken?",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      accsAppKey: "H5_24813843"
    },
    send: {
      basePath: "/im/ajax/receiver/sendImMessage?",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      templateId: 1,
      fromAppKey: "H5_24813843",
      ext: "{\"recognizedLanguage\":\"{0}\",\"targetLanguage\":\"{1}\",\"fromCode\":\"sc_seller_default\"}"
    },
    sendImg: {
      basePath: "/im/ajax/receiver/sendImMessage?",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      templateId: 3,
      fromAppKey: "H5_24813843",
      ext: "{\"fromCode\":\"sc_seller_default\"}" 
    }, 
    sendType: {
      order: 'sendOrder',
      product: 'sendProduct',
      voucher: 'sendVoucher'
    },
    sendOrder: {
      basePath: "/im/ajax/receiver/sendImMessage",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      templateId: 10007,
      fromAppKey: "H5_24813843",
      ext: "{\"fromCode\":\"sc_seller_order\"}" 
    },
    sendProduct: {
      basePath: "/im/ajax/receiver/sendImMessage",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      templateId: 10006,
      fromAppKey: "H5_24813843",
      ext: "{\"fromCode\":\"sc_seller_order\"}" 
    },
    sendVoucher: {
      basePath: "/im/ajax/receiver/sendImMessage",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      templateId: 10008,
      fromAppKey: "H5_24813843",
      ext: "{\"fromCode\":\"sc_seller_order\"}" 
    },
    sync: {
      basePath: "/im/ajax/dispatch/sync?",
      namespace: "1",
      source: "0",
      accountType: "2",
      dataTypeIdMap: "{\"im\":{0}}",//1802
      sdkVersion: "1"
    },
    query: {
      basePath: "/im/ajax/messagebox/querySessionList?",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      accountType: "2",
      nodeId: "1"
    },
    queryOrder: {
      basePath: "/im/card/order/query"
    },
    queryProduct: {
      basePath: "/im/card/product/search?"
    },
    queryVoucher: {
      basePath: "/im/card/voucher/search?"
    },
    queryBySessionId: {
      basePath: "/im/ajax/messagebox/queryMessageListBySessionViewId?",
      accessKey: "lazada-pc-h5",
      accessToken: "lazada-test-secret",
      accountType: "2"
    }

}

module.exports = config