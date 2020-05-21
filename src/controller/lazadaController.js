import {RequestMethod,Controller,RequestMapping } from "../common/decorator/index"
import TestFun from '../middleware/index'
import lazadaService from '../proxyServices/lazada/lazadaService'
import browserService from '../services/browserService'

// 添加Controller前缀
@Controller("/api/lazada")
export default class LazadaController {
    constructor () {
        this.shopKey ="lazada";
    }

    @RequestMapping({
        url:"/queryOrderDetail",
        method:RequestMethod.POST, // 定义请求方法
    })
    async queryOrderDetail(ctx){
        const { success: flag, data, err } = await browserService.listByUserShopId(ctx, 'lazada')
       
        console.log('>>>>>data', data)
        if (flag) {
            let data2 = await lazadaService.queryOrderDetail(ctx);
            ctx.body = {
                code:0,
                message:"success",
                data: data2
            }
          } else {
            ctx.body = failed("LazadaSellBService,queryOrderDetail=>",err)
          }
    }

    // 定义有中间件的router  /api/test/test
    @RequestMapping({
        method:RequestMethod.POST, // 定义请求方法
        middleware: [TestFun] // 使用中间件
    })
    async test(ctx){
        ctx.body = {
            code:0,
            message:"success"
        }
    }

    
}