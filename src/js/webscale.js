/////////////////宽度全屏自适应设置////////////////////
(function( viewWidth, resize ){

    var oWrap = document.getElementById('wrap');

    function showScale(time) {
        setTimeout(function(){
            var deviceWidth = document.documentElement.clientWidth,
                deviceHeight = document.documentElement.clientHeight,
                viewHeight = viewWidth*deviceHeight/deviceWidth,
                iScale = deviceWidth / viewWidth;

            oWrap.style.cssText = 'width: '+ viewWidth +'px;' +
            'height: '+ viewHeight +'px;' +
            'position: relative;' +
            'top: 50%;' +
            'left: 50%;' +
            'margin: -'+ (viewHeight/2) +'px 0 0 -'+ (viewWidth/2) +'px;' +
            '-webkit-transform: scale('+ iScale +');' +
            'transform: scale('+ iScale +');';
        }, typeof time == 'number' ? time : 100);
    }

    showScale(100);
    resize && window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", showScale, false);

})( 640, true );