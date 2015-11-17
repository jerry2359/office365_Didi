/**
 * Created by LinJe on 2015/10/14.
 * 利用css合并工具生成的雪碧图和css代码来播放序列帧动画
 */
var CssSprite = function( settings ) {
    var _this = this;

    _this.defs = {
        'stage': null,
        'commonClass': 'icons',
        'classPrefix': 'b',
        'frames': 60,
        'time': 5000,
        'waitTime': 0,
        'loop': 0
    };
    _this.extend(_this.defs, settings);
    _this.index = 0;
    _this.timer = null;
    _this.timerWait = null,
    _this.speed = parseInt(_this.defs.time/_this.defs.frames);
};

CssSprite.prototype.extend = function( defs, opts ) {
    for ( var attr in defs ) {
        if ( typeof opts[attr] != 'undefined' ) {
            defs[attr] = opts[attr];
        }
    }
    return this;
};

CssSprite.prototype.play = function() {
    var _this = this;

    function spritePlay() {
        if ( _this.index < _this.defs.frames ) {
            _this.index ++;
            _this.toTarget();
        } else {
            clearInterval(_this.timer);
            if ( _this.defs.loop ) {
                clearTimeout(_this.timerWait);
                _this.timerWait = setTimeout(function() {
                    _this.index = 1;
                    _this.toTarget();
                    _this.timer = setInterval(spritePlay, _this.speed);
                }, _this.defs.waitTime);
            }
        }
    }

    clearInterval(_this.timer);
    _this.timer = setInterval(spritePlay, _this.speed);
    return _this;
};

CssSprite.prototype.toTarget = function() {
    var _this = this;
    _this.defs.stage.className = _this.defs.commonClass +' '+ _this.defs.classPrefix + _this.index;
    return _this;
};

CssSprite.prototype.stop = function() {
    var _this = this;
    clearInterval(_this.timer);
    clearTimeout(_this.timerWait);
    return _this;
};
