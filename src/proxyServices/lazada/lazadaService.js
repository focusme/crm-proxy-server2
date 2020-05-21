import { getLazadaHeader } from '../../utils/headerUtil'
import requestUtil from '../../utils/reuqestUtil'
import {resetCookie} from '../../utils/stringUtil'
import lazadaParams  from './lazadaParams'
import lazadaConfig from '../../config/lazada'
class LazadaService {
    async queryOrderDetail(ctx) {
        try {
            let body = ctx.request.body;
            let conf = lazadaConfig.queryOrder
            let headers = getLazadaHeader(body.cookie, body.baseUrl);
            let url = await lazadaParams.getOrderDetailUrl(body, conf);
            const res = await requestUtil.get(url, headers)
            console.log(res);
            return res.data
        } catch (error) {
           console.log('error', error)
        }
        
        
      }
}

module.exports = new LazadaService()