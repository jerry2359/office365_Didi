/**
 * Created by LinJe on 2015/11/5.
 */
;(function( $ ) {

    //共同方法
    $.extend($.fn, {
        'fadeIn': function( settings ) {
            var _this = $(this);
            settings && settings.addClass && _this.addClass(settings.addClass);
            _this.css('opacity', '0').animate({'opacity':1}, settings && settings.time || 500, '', function() {
                settings && settings.callBack && settings.callBack.call(_this);
            });
        },
        'fadeOut': function( settings ) {
            var _this = $(this);
            _this.css('opacity', '1').animate({'opacity':0}, settings && settings.time || 500, '', function() {
                settings.removeClass && _this.removeClass(settings.removeClass);
                settings && settings.callBack && settings.callBack.call(_this);
            });
        }
    });

    //loading加载
    (function() {

        var oBox = $('.loading'),
            oP = oBox.find('p');

        //选取body 延迟加载
        $('body').lazyLoading()
            .concat([
                '../img/common/bg.jpg',
                '../img/page1/lockall.png',
                '../img/page4/pic_01.png', '../img/page4/pic_04.png'
            ])
            .progress(function(percent) {
                oP.text(percent+'%');
            })
            .callBack(function() {
                oBox.hide();
                //page1Module.start();
            });

    })();

    //音频播放
    var audioModule = (function() {

        var mail = new Audio('../media/mail.mp3'),
            ring = new Audio('../media/ring.mp3'),
            boss = new Audio('../media/boss.mp3');

        mail.preload = 'auto';
        ring.preload = 'auto';
        ring.loop = 'loop';
        boss.preload = 'auto';

        /*mail.addEventListener('canplaythrough', function() {
            alert('canplaythrough');
        }, false);*/

        return {
            'playMail': function() {
                new Audio('../media/mail.mp3').play();
                return this;
            },
            'playRing': function() {
                ring.play();
                return this;
            },
            'pauseRing': function() {
                ring.pause();
                return this;
            },
            'playBoss': function() {
                boss.play();
                return this;
            },
            'bossEnded': function( callBack ) {
                boss.addEventListener('ended', function() {
                    callBack && callBack();
                }, false);
                return this;
            }
        }

    })();

    //第1页 信息提醒及解锁屏幕
    var page1Module = (function() {

        var oBox = $('.page1'),
            oUl = oBox.find('ul'),
            index = 1, timer = null;

        //开启解锁雪碧图动画
        var lockFrames = new CssSprite({
            'stage'         : document.getElementById('lock'),
            'commonClass'   : 'lock',
            'classPrefix'   : 'lock',
            'frames'        : 31,
            'time'          : 1500,
            'waitTime'      : 1000,
            'loop'          : 1
        });

        var start = function() {
            oBox.addClass('active');

            oUl.addClass('status1');
            audioModule.playMail();
            timer = setInterval(function() {
                index ++;
                if ( index < 5 ) {
                    oUl.removeClass().addClass('status'+index);
                    audioModule.playMail();
                } else {
                    clearInterval(timer);
                }
            }, 1000);

            setTimeout(function() {
                lockFrames.play();
            }, 500);

            setTimeout(function() {
                lockFrames.stop();
                oBox.removeClass('active');
                page2Module.show();
            }, 4500);
        };

        return {
            'start': start
        }

    })();


    //第2页
    var page2Module = (function() {

        var oBox = $('.page2'),
            oAnswer = oBox.find('.answer');

        //点击接听
        oAnswer.on('click', function() {
            oBox.removeClass('active');
            page3Module.show();
        });

        return {
            'show': function() {
                oBox.addClass('active');
                audioModule.playRing();
            }
        }

    })();


    //第3页
    var page3Module = (function() {

        var oBox = $('.page3');

        return {
            'show': function() {
                oBox.addClass('active');
                audioModule.pauseRing().playBoss().bossEnded(function() {
                    //alert('boss讲话完毕，大伙鼓掌！');
                    oBox.removeClass('active');
                    page4Module.show();
                });
            }
        }

    })();


    //第4页
    var page4Module = (function() {

        var oBox = $('.page4'),
            oLayerCon = oBox.find('.layer_OneDrive article'),
            oneDriveLight = oBox.find('.OneDriveLight');

        //点击弹窗的 oneDrive
        oLayerCon.find('a').on('click', function() {
            oLayerCon.animate({'opacity':0}, 200);
            setTimeout(function() {
                oneDriveLight.css('opacity', '0').animate({'opacity':1}, 1000);
            }, 800);
        });

        //点击OneDrive，打开app效果
        oneDriveLight.find('.OneDriveIcon').on('click', function() {
            oBox.removeClass('active');
            page5Module.show();
        });

        return {
            'show': function() {
                oBox.addClass('active');
            }
        }

    })();


    //第5页
    var page5Module = (function() {

        var oBox = $('.page5'),
            oVideoApp = $('#videoApp').get(0),
            oLayerSuccess = oBox.find('.layer_success'),
            firstFrame = oBox.find('.frame1');

        var handleVideo = function() {
            oVideoApp.play();
        };

        oVideoApp.addEventListener('canplaythrough', function() {
            firstFrame.hide();
        }, false);

        oVideoApp.addEventListener('ended', function() {
            oLayerSuccess.fadeIn({'addClass':'active'});
        }, false);

        return {
            'show': function() {
                oBox.addClass('active');
                handleVideo();
            }
        }

    })();


    //第6页
    (function() {

        var oBox = $('.page6'),
            oPoints = oBox.find('.points');

        var pointFrames = new CssSprite({
            'stage'         : oPoints.get(0),
            'commonClass'   : 'points',
            'classPrefix'   : 'point',
            'frames'        : 29,
            'time'          : 1000,
            'waitTime'      : 500,
            'loop'          : 1
        });
        pointFrames.play();

    })();

})( Zepto );