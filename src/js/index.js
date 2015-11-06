/**
 * Created by LinJe on 2015/11/5.
 */
;(function( $ ) {

    //第1页 信息提醒及解锁屏幕
    (function() {

        var oBox = $('.page1'),
            oUl = oBox.find('ul'),
            aLi = oUl.find('li'),
            index = 1, timer = null;

        oUl.addClass('status1');
        timer = setInterval(function() {
            index ++;
            if ( index < 5 ) {
                oUl.removeClass().addClass('status'+index);
            } else {
                clearInterval(timer);
            }
        }, 1000);

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
        setTimeout(function() {
            lockFrames.play();
        }, 1500);

        setTimeout(function() {
            lockFrames.stop();
            oBox.removeClass('active');
            page2Module.show();
        }, 6000);

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
            }
        }

    })();


    //第3页
    var page3Module = (function() {

        var oBox = $('.page3');

        return {
            'show': function() {
                oBox.addClass('active');
            }
        }

    })();

})( Zepto );