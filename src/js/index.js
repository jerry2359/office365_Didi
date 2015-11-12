/**
 * Created by LinJe on 2015/11/5.
 */
;(function( $ ) {

    //loading加载
    (function() {

        var oBox = $('.loading'),
            oP = oBox.find('p');

        //选取body 延迟加载
        $('body').lazyLoading()
            .concat([
                '../img/common/bg.jpg', '../img/common/icon_01.png', '../img/common/icon_02.png',
                '../img/common/icon_03.png', '../img/common/icon_04.png', '../img/common/icon_05.png',
                '../img/common/icon_06.png',
                '../img/page1/lockall.png',
                '../img/page4/pic_01.png', '../img/page4/pic_04.png'
            ])
            .progress(function(percent) {
                oP.text(percent+'%');
            })
            .callBack(function() {
                oBox.hide();
                page1Module.start();
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
            firstFrame = oBox.find('.frame1');

        var handleVideo = function() {
            oVideoApp.play();
        };

        oVideoApp.addEventListener('canplaythrough', function() {
            firstFrame.hide();
        }, false);

        oVideoApp.addEventListener('ended', function() {
            alert('app演示播放完毕');
        }, false);

        return {
            'show': function() {
                oBox.addClass('active');
                handleVideo();
            }
        }

    })();

})( Zepto );