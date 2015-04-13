/**
 * Created by zppro on 15-3-20.
 */


var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var wechat = require('wechat');

var debugFlag = false;
var config = {
    port : 8078,
    appid: 'unknow', //公众号
    token : 'unknow', //公众号token
    encodingAESKey:'unknow' //消息加解密密钥
};

// debug=8078
process.argv.forEach(function(v,i,arr){
    var arr = v.split('=');
    if(arr.length > 1 && arr[1].length >0){
        config[arr[0]] = arr[1];
    }

    if(v.match(/debug/) && v.split('=').length == 1){
        debugFlag = true;
    }
});


if(debugFlag){
    console.log(config);
}

var app = express();
app.use(express.query());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(wechat(  {
    appid: config.appid, //公众号
    token : config.token, //公众号token
    encodingAESKey:config.encodingAESKey //消息加解密密钥
}, function (req, res, next) {
    //res.setHeader('content-type','text/xml');
    var message = req.weixin;
    if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        //res.reply([
        //    {
        //        title: '你来我家接我吧',
        //        description: '这是女神与高富帅之间的对话',
        //        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        //        url: 'http://nodeapi.cloudfoundry.com/'
        //    }
        //]);
        res.reply('hello world!!!');

    }
}));





/****路由 ******/

//认证 http://wx.ngrok.lifeblue.com.cn
//app.get('/',function(req,res){
//    var ret = 'invalid';
//    var arr = [config.token,req.query.timestamp,req.query.nonce];
//    arr.sort();
//    var md5sum = crypto.createHash('sha1');
//    md5sum.update(arr.join(''));
//    var sha1Str = md5sum.digest('hex');
//    console.log('sha1Str -> '+sha1Str);
//    console.log('signature -> '+req.query.signature);
//    if(req.query.signature == sha1Str){
//        ret = req.query.echostr;
//    }
//    console.log('ret -> ' + ret);
//    res.end(ret);
//});

app.listen(config.port,function(){
    console.log('开始侦听'+config.port+'...');
});
