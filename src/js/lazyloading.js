/**
 * Created by LinJe on 2015/10/28.
 * 延迟loading百分比的累加
 * 依赖 zepto 或 jquery
 */
;(function( $ ) {

    $.fn.lazyLoading = function( settings ) {

        var $this = $(this),
            $imgArr = $this.find('img'),

            //延迟loading变量
            aLoadData = [],
            loadCur = 0,
            loadSpeed = 30,
            loadListenI = 0,
            isProgress = false,
            loadListenTimer = null;

        $this.concat = function( arr ) {
            var collection = [];

            arr.forEach(function(item) {
                var img = new Image();
                img.src = item;
                collection.push(img);
            });

            loadImages({
                '$imgs': $($imgArr.concat(collection)),
                'progressFn': function(percent) {
                    aLoadData.push(percent);
                }
            });

            return $this;
        };

        $this.progress = function( fn ) {
            $this.on('progress', function(ev) {
                fn && fn.call($this, ev._args);
            });

            return $this;
        };

        $this.callBack = function( fn ) {
            $this.on('callBack', function() {
                fn && fn.call($this);
            });

            return $this;
        };

        loadListenTimer = setInterval(function() {
            if ( loadListenI > 35 ) {
                //未检测到缓存资源，加长延迟加载时间
                loadSpeed = 150;
                !isProgress && progressPercent();
            }
            loadListenI ++;
            if ( aLoadData[aLoadData.length-1] >= 100 ) {
                //检测到缓存资源，正常延迟加载
                clearInterval(loadListenTimer);
                loadSpeed = 30;
                !isProgress && progressPercent();
            }
        }, 50);

        function progressPercent() {
            isProgress = true;
            if ( loadCur < 100 ) {
                if ( loadCur != aLoadData[0] && aLoadData.length > 0 ) {
                    //延迟加载中... 百分比
                    loadCur = aLoadData.shift();
                }
                $this.trigger('progress', loadCur);
                if ( loadCur != 100 ) {
                    //延迟加载中 百分比 loadCur
                    setTimeout(progressPercent, loadSpeed);
                } else {
                    //延迟加载完毕 百分比 loadCur
                    $this.trigger('callBack');
                }
            } else {
                //延迟加载完毕 百分比 loadCur
                $this.trigger('callBack');
            }
        }


        function loadImages( opts ) {
            var $imgs = opts.$imgs,
                progressFn = opts.progressFn,
                callBackFn = opts.callBackFn,
                index = 0,
                iLen = $imgs.length;

            $imgs.each(function(i, elem) {
                var img = new Image();

                img.onload = load;
                img.onerror = load;
                img.src = $(elem).attr('src');
            });

            function load() {
                index ++;
                progressFn && progressFn( Math.floor(index/iLen*100) );
                index == iLen && callBackFn && callBackFn();

            }
        }


        return $this;

    }

})( Zepto || jQuery );
