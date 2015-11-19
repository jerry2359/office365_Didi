/**
 * Created by LinJe on 2015/11/19.
 * 根据selectdata.js处理省市联动
 * 省select id "province", 市select id "city"
 */
;(function( window, document ) {

    var oProvince = document.getElementById('province'),
        provinceName = document.getElementById('provinceName'),
        oCity = document.getElementById('city'),
        cityName = document.getElementById('cityName'),
        dataSelect = dataForm;

    //初始化
    createProvince(oProvince, dataSelect);

    //切换省
    oProvince.addEventListener('change', function() {
        var sProvince = this.value;
        createCity( oCity, findCity(sProvince, dataSelect) );
        provinceName.innerHTML = sProvince;
    }, false);

    //切换市
    oCity.addEventListener('change', function() {
        cityName.innerHTML = this.value;
    }, false);

    //创建省
    function createProvince( select, data ) {
        var oPtions = select.options;

        oPtions.length = 0;

        for ( var i = 0, iLen = data.length; i < iLen; i ++ ) {
            var sProvince = data[i].data_Name1;
            oPtions.add( new Option(sProvince, sProvince) );
        }
    }

    //创建市
    function createCity( select, data ) {
        var oPtions = select.options;

        oPtions.length = 0;

        for ( var i = 0, iLen = data.length; i < iLen; i ++ ) {
            var sCity = data[i].data_Name2;
            oPtions.add( new Option(sCity, sCity) );
        }
    }

    //根据省名查找所在市集
    function findCity( province, data ) {
        for ( var i = 0, iLen = data.length; i < iLen; i ++ ) {
            if ( data[i].data_Name1 == province ) {
                return data[i].data_Cont1;
            }
        }
    }

})( window, document );
