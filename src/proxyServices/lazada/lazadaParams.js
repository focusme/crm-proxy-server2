import {formatUrl} from '../../utils/stringUtil';
class LazadaParams {
    async getOrderDetailUrl(body, conf) {
        let paramS = new Array("orderNumber");
        let valS = new Array(body.orderNumber+"");
      
        return formatUrl(body.baseUrl + conf.basePath, paramS, valS);
      }
}
module.exports = new LazadaParams()