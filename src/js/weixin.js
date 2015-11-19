// JavaScript Document

//---------------------------------------[ wx ]

var appid = 'wx9cdb5a3b9fbfb37e'; //wx9cdb5a3b9fbfb37e
var url = document.location.href;

function wxConfig(wx_title, wx_desc, wx_link, wx_imgUrl, isInit) {

    myLab.ajax({
        type: 'GET',
        url: 'http://test.agenda-bj.com.cn:8082/api/GetJsShareScript?appid=' + appid + '&url=' + encodeURIComponent(url) + '&callback=mycallback',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data);
            wx.config({
                debug: false,
                appId: appid,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'getNetworkType',
                     'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'onVoicePlayEnd',
                    'uploadVoice',
                    'downloadVoice'
                ]
            });
        }
    });

    //ready
    wx.ready(function () {
        //wx.showOptionMenu();
        // 2.1 监听"分享给朋友"，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
            title: wx_title,
            desc: wx_desc,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
                window.location.href = wx_link;
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });

        // 2.2 监听"分享到朋友圈"按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
            title: wx_title,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
                window.location.href = wx_link;
            },
            cancel: function (res) {

            },
            fail: function (res) {
            }
        });

        // 2.3 监听"分享到QQ"按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareQQ({
            title: wx_title,
            desc: wx_desc,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            complete: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });

        // 2.4 监听"分享到微博"按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareWeibo({
            title: wx_title,
            desc: wx_desc,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            complete: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });



    });

}

var wx_title = "O365_IT易_创新益";
var wx_desc = "";
var wx_link = "http://o365.agenda-bj.com.cn/index.html";
var wx_imgUrl = "";


wxConfig(wx_title, wx_desc, wx_link, wx_imgUrl, false);

// 5 图片接口
// 5.1 拍照、本地选图
var images = {
    localId: '',
    serverId: ''
};
//document.querySelector('#chooseImage').onclick =
//    function () {
//        //alert(1);
//        wx.chooseImage({
//            count: 1, // 默认9
//            sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
//            //sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//            success: function (res) {
//                //alert(res.localIds[0]);
//                images.localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//                //document.getElementById("img1").src = images.localId;
//                //上传开始
//                //alert(images.localId);
//                wx.uploadImage({
//                    localId: images.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
//                    isShowProgressTips: 1, // 默认为1，显示进度提示
//                    success: function (res) {
//                        //alert(res.serverId);
//                        images.serverId = res.serverId; // 返回图片的服务器端ID
//                        //alert(images.serverId);
//                        //下载开始
//                        myLab.ajax({
//                            type: 'post',
//                            url: '/home/Download?serverId=' + images.serverId,
//                            dataType: 'text',
//                            success: function (data) {
//                                //"返回文件地址：" + data;
//                                //alert(data);
//                                //document.write(data);
//                                document.getElementById("img1").src = data;
//                                //callBack && callBack(data);
//                            }
//                        });
//                        //下载结束
//                    }
//                });
//                //上传结束

//            }
//        });
//        //wx.chooseImage({
//        //    success: function (res) {
//        //        images.localId = res.localIds;
//        //        alert('已选择 ' + res.localIds.length + ' 张图片');
//        //    }
//        //});
//    };

//// 5.2 图片预览
//document.querySelector('#previewImage').onclick = function () {
//    wx.previewImage({
//        current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
//        urls: [
//          'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
//          'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
//          'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
//        ]
//    });
//};

//// 5.3 上传图片
//document.querySelector('#uploadImage').onclick = function () {
//    if (images.localId.length == 0) {
//        alert('请先使用 chooseImage 接口选择图片');
//        return;
//    }
//    var i = 0, length = images.localId.length;
//    images.serverId = [];
//    function upload() {
//        wx.uploadImage({
//            localId: images.localId[i],
//            success: function (res) {
//                i++;
//                alert('已上传：' + i + '/' + length);
//                images.serverId.push(res.serverId);
//                if (i < length) {
//                    upload();
//                }
//            },
//            fail: function (res) {
//                alert(JSON.stringify(res));
//            }
//        });
//    }
//    upload();
//};

//// 5.4 下载图片
//document.querySelector('#downloadImage').onclick = function () {
//    if (images.serverId.length === 0) {
//        alert('请先使用 uploadImage 上传图片');
//        return;
//    }
//    var i = 0, length = images.serverId.length;
//    images.localId = [];
//    function download() {
//        wx.downloadImage({
//            serverId: images.serverId[i],
//            success: function (res) {
//                i++;
//                alert('已下载：' + i + '/' + length);
//                images.localId.push(res.localId);
//                if (i < length) {
//                    download();
//                }
//            }
//        });
//    }
//    download();
//};
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var requestServer = {

    



    ////zan
    //'oppenid': function () {
    //    myLab.ajax({
    //        type: 'post',
    //        url: '/home/getoppenid',
    //        dataType: 'text',
    //        success: function (data) {
    //        }
    //    });
    //},
    'zan': function (uid) {
        //myLab.ajax({
        //            type: 'post',
        //            url: '/home/getoppenid',
        //            dataType: 'text',
        //            success: function (data) {
        //                alert(data);
        //            }
        //});
                myLab.ajax({
                    type: 'post',
                    url: '/home/zan?uid=' + uid,
                    dataType: 'text',
                    success: function (data) {
                        //callBack && callBack(data);
                        //alert(data);
                        if (data == 0)
                        {
                            alert('投票失败！请重试');
                        }
                        else if (data == 2) {
                            alert('您已投过票！请勿重复投票');
                        }
                        else {
                            alert('投票成功！');
                        }
                    }
                });
    },

    'select': function () {
        //alert(1);
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
            //sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                //alert(res.localIds[0]);
                images.localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                //document.getElementById("img1").src = images.localId;
                //上传开始
                //alert(images.localId);
                wx.uploadImage({
                    localId: images.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        //alert(res.serverId);
                        images.serverId = res.serverId; // 返回图片的服务器端ID
                        //alert(images.serverId);
                        //下载开始
                        myLab.ajax({
                            type: 'post',
                            url: '/home/Download?serverId=' + images.serverId,
                            dataType: 'text',
                            success: function (data) {
                                //"返回文件地址：" + data;
                                //alert(data);
                                //document.write(data);
                                document.getElementById("img1").src = data;

                                
                                //callBack && callBack(data);
                            }
                        });
                        //下载结束
                    }
                });
                //上传结束

            }
        });

        //wx.chooseImage({
        //    success: function (res) {
        //        images.localId = res.localIds;
        //        alert('已选择 ' + res.localIds.length + ' 张图片');
        //    }
        //});
    }

};