const nodemailer = require('nodemailer');

module.exports = async function(param) {

    let to = param.to;
    let title = param.title || ' ';
    let text = param.text || '';
    let html = param.html || '';

    return new Promise(function(resolve, reject) {

        let transporter = nodemailer.createTransport({
            service: "qiye.aliyun",
            auth: {
                user: 'kin.coding@cuikangjie.com',
                pass: 'coding@123'
            }
        });

        let mailOptions = {
            from: '"Coding - Kin.Art" <kin.coding@cuikangjie.com>',
            to: to,
            subject: title,
            text: text,
            html: html
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // return console.log(error, 'error');
                reject({code:1,msg:error});
            }
            // console.log('Message %s sent: %s', info.messageId, info.response);
            resolve({code:0,data:{messageId:info.messageId,to:info.accepted}})
        });
    }).catch((err) => {
       reject({code:1,msg:err})
    })

}
