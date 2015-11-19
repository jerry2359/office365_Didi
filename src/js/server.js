/**
 * PC
 * Created by LinJe on 2015/8/24.
 * 后端数据部分
 */
;(function ($) {

    var requestServerDidi = {

        //数据浅拷贝
        'extend': function (defs, settings) {
            for (var attr in defs) {
                if (typeof settings[attr] != 'undefined') {
                    defs[attr] = settings[attr];
                }
            }
        },

        /**
         * common() 公共方法
         * @param [object] settings
         * settings.type 默认值'POST', 请求的类型
         * settings.dataType 数据类型
         * settings.url 请求数据的地址
         * settings.data 要发送的数据
         * settings.callBack 请求之后的回调函数
         * 回调函数参数 msg 的数据格式如下：
         * {
         *      'data': msg, //成功提交之后返回的数据
         *      'status': 1, //0代表提交失败，1代表提交成功
         *      'error': '失败信息' //提交失败的信息提示
         * }
         */
        'common': function (settings) {
            //设置默认值
            var defs = {
                'type': 'POST',
                'dataType': 'json',
                'url': '',
                'data': {},
                'callBack': function () { }
            };

            //覆盖数据
            this.extend(defs, settings);

            //经过ajax处理表单数据之后返回结果
            $.ajax({
                type: defs.type,
                dataType: defs.dataType,
                url: defs.url,
                data: defs.data,
                success: function (msg) {
                    defs.callBack && defs.callBack({'data':msg, 'status':1});
                },
                error: function (err) {
                    defs.callBack && defs.callBack({'error':'服务器无响应', 'status':0});
                }
            });
        },

        /**
         * 提交表单 领奖
         * 成功返回1
         */
        'subForm': function (settings, callBack) {
            this.common({
                'type': 'POST',
                'dataType': 'json',
                'url': 'http://o365.agenda-bj.com.cn/home/postdidi',
                'data': {
                    'name': settings.name,
                    'company': settings.company,
                    'province': settings.province,
                    'city': settings.city,
                    'address': settings.address,
                    'tel': settings.tel
                },
                'callBack': callBack
            });
        }

    };

    window.requestServerDidi = requestServerDidi;

})(Zepto);