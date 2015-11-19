// JavaScript Document

/*----兼容随记-----*/
/*
　innerHTML是符合W3C标准的属性，而innerText只适用于IE浏览器，因此，尽可能地去使用innerHTML，而少用innerText，如果要输出不含HTML标签的内容，可以使用innerHTML取得包含HTML标签的内容后，再用正则表达式去除HTML标签，下面是一个简单的符合W3C标准的示例：
 <a href="javascript:alert(document.getElementById('test').innerHTML.replace(/<.+?>/gim,''))">无HTML,符合W3C标准</a>
*/


//---------------------------------------------------------------清单
/*DOM操作
  <1>.hasClass(obj, sClassName);
  <2>.addClass(obj, newClass);
  <3>.removeClass(obj,delClass);
  <4>.getByClass(oParent,sClass,tagName);
  <5>.getStyle(obj,attr);  获取样式
  	  css(obj,option,val); 设置样式
  <6>.css3(obj,attr,val);
  <7>.getChildAttr( oParent, tagName, attr ); 获取元素属性
  <8>.图片加载:
      1. loadImgArr( loadImgSrcArr, loadingFn, callBack );
	  2. loadImg( obj, src, callBack, error );
  	  3. loadScript(src,callback,target,error);
  <9>.myDelegate(oP,tar,evt,fn)  
  	
*/

/*BOM操作
  <1>.----browerMaster.than2(name,num,MoL);	[ name : msie，firefox，opera，chrome，safari ]  [ num ]  [ MoL : gt,gte,lt,lte,eq ]
      ----browerMaster.desMes()  浏览器的基本信息
  
  <2>.获取元素距离屏幕左侧和顶部的真实距离
      getOffsetPos(obj)
	  
  <3>.scrollH();
      offsetH();
	  scrollT();
	  getMax([myLab.viewH(),myLab.scrollH(),myLab.offsetH()])  获取遮罩层的最大高度
 
  <4>.视窗的宽度，高度
       viewH();
	   viewW();
	   
  <5>.get方式传参
	 GetRequest();
	 例子：whichIndex是参数的名字  
	 URL: http://www.baidu.com?whichIndex=1
	 var Request = new Object();
	 Request = GetRequest();
	 var actionIndex = Request['whichIndex'];
	 if(actionIndex){
		setTimeout(function(){
			aBtns.eq(actionIndex).trigger('click');
		},500);
	 }	
	 
  <6>.PC端判断 返回布尔值
      isPc();   
  	  
*/

/*UI
  <1>.自定义滚动条 scrollNorm.scrollMoveTo(val); 移动到某处
                 scrollNorm.resizeFn();  滚动条resize				 
  		 				   				   
*/

/*基础层
  <1>.getMax(arr);
  <2>.bindEvent(obj,evt,fn);
  <3>.delEvent(obj,evt,fn);
  <4>.date_getTime();  获取时间 ms

*/

/*运动
   <0>.scrollToTar(tar,fn); //滑动到某个区域
   <1>.oldStartMove(obj, json, fn);   
   <2>.startMove(obj,json,times,fx,fn,fnMove);   
   <3>.shake(obj,attr,callBack);
   <4>.getClose(obj,target);
*/

/*移动端开发
  
  <1> function touch( json, toLeftFn, toRightFn, toMoveFn )	
  //json: {  obj:'', dirType:'pageX'/'pageY', moveObj:'', endObj:'' }
  //toLeftFn : 左/上
  //toRightFn : 右/下
  //toMoveFn: 移动中回调 ( 移动的新坐标，移动的距离 )
*/

/*移动端自定义滚动条
  phoneScrollNorm(json) json见下面demo
*/

//摇一摇
//shakeMobile(fn)

/*
	正则常用
	var str=str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记
	var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
	return  result.replace(/\s/g,"");//去除文章中间空格

	//手机操作
	禁止弹出选择菜单：
	document.documentElement.style.webkitTouchCallout = "none"; 
*/

//-----------------------------------------------------------【 myLab 】
;(function( window, document, undefined ){
	
	var myLab = {
		
		//---------------【 DOM 】
		firstSonEle : function(oParent){
			return oParent.firstElementChild || oParent.firstChild;	
		},
		
		lastSonEle : function(oParent){
			return oParent.lastElementChild || oParent.lastChild;	
		},
		
		prevEle : function(obj){
			return obj.previousElementSibling || obj.previousSibling;
		},
		
		nextEle : function(obj){
			return obj.nextElementSibling || obj.nextSibling;
		},
		
		addClass : function(obj,newClass){
			var oldClass = obj.className;
			var oldClassArr = [];
			
			if(oldClass=='' || oldClass==null){
				obj.className = newClass;	
			}else{
				oldClassArr = oldClass.split(' ');	
				for(var i=0; i<oldClassArr.length; i++){
					if(oldClassArr[i]!=' '&& oldClassArr[i]==newClass){
						break;	
					}	
				}
				obj.className = oldClass+' '+newClass;
			} 	
		},
		
		removeClass : function(obj,delClass){
			var oldClass = obj.className;
			var oldClassArr = [];
			var newClassArr = [];
			
			if(oldClass=='' || oldClass==null){
				return;
			}else{
				oldClassArr = oldClass.split(' ');	
				for(var i=0; i<oldClassArr.length; i++){
					if(oldClassArr[i]!=' '&& oldClassArr[i]!=delClass){
						newClassArr.push(oldClassArr[i]);
					}	
				}
				obj.className = newClassArr.join(' ');
			} 	
		},
		
		getById : function(tagId){
			return document.getElementById(tagId);
		},
		
		getByClass : function(oParent,sClass,tagName){
			var aEle = [],result = [];
			if( tagName && typeof tagName == 'string'){
				aEle = oParent.getElementsByTagName(tagName);	
			}else{
				aEle = oParent.getElementsByTagName('*');
			}
			
			if(!tagName && oParent.getElementsByClassName){
				return oParent.getElementsByClassName(sClass); //性能考虑
			}else{
				var re = new RegExp('(^|\\s)' + sClass + '($|\\s)', 'i');
				for(var i = 0; i < aEle.length; i++){
					if(re.test(aEle[i].className)){
						result.push(aEle[i]);
					}
				}
				return result;
			}
		},
		
		hasClass : function(obj, sClassName){
			var hasBtn = false;
			var sClass =  obj.className;                  
			if (sClass == '') {							  
				hasBtn = false;
			} else {									  
				var aClass = sClass.split(' ');				
				for (var i=0; i<aClass.length; i++) {	  
					if (aClass[i] == sClassName) {
						hasBtn = true;                          
					}
				}
			}
			return hasBtn;
		},
		
		/*function css(obj,attr,val){
			if(!val){
				return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
			}else{
				obj.style[attr] = val;
			}
		}*/
		
		getStyle : function( obj, attr ){
			function getResult( rAttr ){
				return obj.currentStyle ? obj.currentStyle[rAttr] : getComputedStyle( obj )[rAttr]
			};
			
			var result = getResult( attr );
			if( attr === "opacity" && typeof result === "undefined" ) return 1;
			if( result === "auto" ){
				
				if( attr !== "width" && attr !== "height" && attr.indexOf("margin") === -1 && attr !== "left" && attr !== "right" && attr !== "top" && attr !== "bottom" ) return result;
				var sPosition = myLab.getStyle(obj, "position");
				
				if( sPosition !== "absolute" && sPosition !== "fixed" ){
					switch( attr ){
						case "marginLeft"  : return myLab.getOffsetPos(obj).l - myLab.getOffsetPos(obj.parentNode).l + "px";
						case "marginRight" : return obj.parentNode.offsetWidth - obj.offsetWidth - ( myLab.getOffsetPos(obj).l - myLab.getOffsetPos(obj.parentNode).l ) + "px";
						case "marginBottom": return obj.parentNode.offsetHeight - obj.offsetHeight - ( myLab.getOffsetPos(obj).t - myLab.getOffsetPos(obj.parentNode).t ) + "px";
						case "width"       : return obj.parentNode.offsetWidth + "px";
					};
				};
				
				if( attr === "width" || attr === "height" || attr.indexOf("margin") !== -1 || attr === "left" || attr === "right" || attr === "top" || attr === "bottom" && sPosition === "absolute" || sPosition === "fixed" ){
					return 0 + "px";
				};
			};
			return result;
		},
		
		css : function( obj, option, val ){
			if( myLab.isJson( option ) ){
				for( var attr in option ){
					if( attr !== "opacity" ){
						var temp = Number(option[attr]);
						var newVal = typeof option[attr] === "number" && temp === temp ? option[attr] + "px" : option[attr];
						obj.style[attr] = newVal;
					} else {
						obj.style[attr] = option[attr];
						obj.style.filter = 'alpha(opacity='+ option[attr]*100 +')';
					};
				};
			}else{
				if(!val){
					return myLab.getStyle(obj,option);
				}else{
					obj.style[option] = val;
				};
			};
		},
		
		css3 : function(obj,attr,val){
			var str = attr.charAt(0).toUpperCase() + attr.substring(1);
			
			obj.style['Webkit'+str] = val;
			obj.style['Moz'+str] = val;
			obj.style['ms'+str] = val;
			obj.style['O'+str] = val;
			obj.style[attr] = val;
		},
		
		getChildAttr : function( oParent, tagName, attr ){
			var aEle = oParent.getElementsByTagName(tagName);
			var arr = [];
			attr = attr === "class" && aEle[0].getAttribute("className") !== null ? "className" : attr;
			
			for(var i = 0; i < aEle.length; i++){
				var attrVal = attr === "style" ? aEle[i].style.cssText : aEle[i].getAttribute(attr);
				
				if( attrVal === "" || typeof attrVal !== "string" ){
					continue;
				} else {
					arr.push( attrVal );
				};
			};
			return arr;
		},
		
		loadImgArr : function( loadImgSrcArr, loadingFn, callBack ){
			var loadI = 0;//初始化的进度数
			var totalImg = loadImgSrcArr.length;//统计页面图片总数
			//载入loading数据
			for (var i = 0; i < totalImg; i++) {
				var image = new Image();//创建一个图片对象
				
				myLab.loadImg( image, loadImgSrcArr[i], function(){
					
					loadI ++;
					var Scale = loadI / totalImg;
					var percent = Math.floor(Scale * 100);
					//设置进度数
					typeof loadingFn == "function" && loadingFn(percent);
					//当所有图片加载完毕时
					if(loadI == totalImg){
						setTimeout(function() {
							typeof callBack == "function" && callBack();
						}, 300);
					};
					
				},function(){
					this.src = '';
					loadI ++;
					var Scale = loadI / totalImg;
					var percent = Math.floor(Scale * 100);
					//设置进度数
					typeof loadingFn == "function" && loadingFn(percent);
					//当所有图片加载完毕时
					if(loadI == totalImg){
						setTimeout(function() {
							typeof callBack == "function" && callBack();
						}, 300);
					};	
				});
			};
		},
		
		//判断单张图片加载完成方法
		loadImg : function( obj, src, callBack, error ) {
			
			if ( obj.readyState ) { //IE
				obj.onreadystatechange = function() {
					if( obj.readyState == "loaded" || obj.readyState == "complete" ) {
						obj.onreadystatechange = null;
						typeof callBack == "function" && callBack();
					}
				};
			} else { //Others: Firefox, Safari, Chrome, and Opera
				obj.onload = function() {
					typeof callBack == "function" && callBack();
				};
			};
			
			obj.onerror = function(){ typeof error === "function" && error.call(obj) };
			
			obj.src = src;
		},
		
		loadScript : function( src, callBack, target, error ){
			var script = document.createElement("script");
			target = typeof target === "undefined" || target === "" || target === null ? "head" : target;
			document.getElementsByTagName(target)[0].appendChild( script );
			myLab.loadImg( script, src, callBack, error );
		},
		
		//JSON类型判断
		isJson : function(obj){
			var result = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
			return result;
		},
		
		//-------------------【 BOM 】
		viewW : function(){
			return document.documentElement.clientWidth;		
		},
		
		viewH : function(){
			return document.documentElement.clientHeight;	
		},
		
		scrollH : function(){
			return document.body.scrollHeight;	
		},
		
		offsetH : function(){
			return document.body.offsetHeight;	
		},
		
		scrollT : function(){
			return document.body.scrollTop || document.documentElement.scrollTop;	
		},
		
		scrollL : function(){
			return document.body.scrollLeft || document.documentElement.scrollLeft;	
		},
		
		getOffsetPos : function(obj){
			var result = {'l':0,'t':0};
			while(obj){
				result.l += obj.offsetLeft;	
				result.t += obj.offsetTop;	
				obj = obj.offsetParent;
			}
			return result;	
		},
		
		//视觉窗口viewport
		viewport: function( viewWidth ){
			var viewport = document.querySelector("meta[name=viewport]");
			var winWidths = document.documentElement.clientWidth;
			var densityDpi = viewWidth/winWidths;
				densityDpi = densityDpi > 1 ? 300*viewWidth*densityDpi/viewWidth : densityDpi;
			
			viewport.setAttribute('content', 'width='+ viewWidth +', target-densityDpi='+densityDpi+', user-scalable=no');
		},
		
		//get方式传参
		GetRequest : function() {
		   var url = location.search; //获取url中"?"符后的字串
		   var theRequest = new Object();
		   if (url.indexOf("?") != -1) {
			  var str = url.substr(1);
			  strs = str.split("&");
			  for(var i = 0; i < strs.length; i ++) {
				 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			  }
		   }
		   return theRequest;
		},
		
		//PC端判断
		isPc : function() {
			var userAgentInfo = navigator.userAgent;
			var agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
			var flag = true;
			for (var v = 0; v < agents.length; v++) {
				if (userAgentInfo.indexOf(agents[v]) > 0) { flag = false; break; }
			}
			return flag;
		},
		
		isWeiXin : function(){
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				return true;
			}else{
				return false;
			}
		},
		
		isPad : function() {
			var userAgentInfo = navigator.userAgent.toLowerCase();
			var flag = false;
			if (userAgentInfo.indexOf('ipad')!=-1){ flag = true;}
			return flag;
		},
		
		isWinphone : function() {
			var userAgentInfo = navigator.userAgent.toLowerCase();
			var flag = false;
			if (userAgentInfo.indexOf('windows phone')!=-1){ flag = true;}
			return flag;
		},
		
		//微信与否
		isWechat : function(){
			return navigator.userAgent.indexOf("MicroMessenger");
		},
		
		//----------------------【 Base 】
		//绑定事件
		bindEvent : function(obj,evt,fn){
			if(obj.addEventListener){
			   obj.addEventListener(evt,fn,false);
			}else{
				obj.attachEvent('on'+evt,function(){
					fn.call(obj);	
				})	
			}	
		},
		
		//删除事件
		delEvent : function(obj,events,fn){
			if( obj.removeEventListener ){
				obj.removeEventListener(events,fn,false);
			}
			else{
				obj.detachEvent('on'+events,fn);
			}
		},
		
		getMax : function(arr){ 
			var iMin = -999999; 
			var iMinIndex = -999999;	
			for(var i=0; i<arr.length; i++){	
			   if(arr[i]>=iMin){		
				  iMin = arr[i];
				  iMinIndex = i;			
			   }			
			}	
			return {
				val : iMin,
				index : iMinIndex
			};	
		},
		
		date_getTime : function(){
			var time = new Date();
			var now = time.getTime();
			return now;	
		},
		
		//弧度转换角度
		a2d : function(n){
			return n*180/Math.PI;
		},
		
		//两个范围内找值
		rnd : function(n,m){
			return parseInt(Math.random()*(m-n))+n;
		},
		
		//保留小数点几位
		floorNum : function(num,pointNum)
		{	
			var pointNum = pointNum || 2;
			if(isNaN(Number(num))){
				alert('填写的数字格式错误');	
			}else{
				num = num + '';	
				return Number(num.substring(0,num.indexOf('.')+pointNum));
			}
			
			//return( Math.round(num*100)/100);
		},
		
		//补0
		addZero : function(num){
			if(num<10){
				return "0" + num;
			}else{
				return "" + num;
			}	
		},
		
		/*我的事件委托
		  tar 可以是委托对象的标签名，或者是类名
		  支持多事件绑定操作
		*/
		myDelegate : function(oP,tar,evt,fn){
			myLab.bindEvent(oP,evt,function(ev){
				var oEv = ev || window.event;
				var oTar = oEv.target || oEv.srcElement;
				if(oTar.nodeName.toLowerCase()==tar.toLowerCase() || myLab.hasClass(oTar,tar)){
					fn.call(oTar);
				}		
			});
		},
		
		/*字符串加密*/
		EnEight : function(arr){
			var resultArr = [];
			for(var i=0; i<arr.length; i++){
				var nowVal = arr[i].replace(/(^\s+)|(\s+$)/g,"");
				if(nowVal!='' || nowVal!=null){
					nowVal = nowVal+'';
					var letterArr = [];
					letterArr = nowVal.split('');
					
					for(var j=0; j<letterArr.length; j++){
						resultArr.push(letterArr[j].charCodeAt(0));
					}
				} 
			}
			return resultArr;
		},
		
		/*字符串解密*/
		DeEight : function(arr){
			var resultStr = '';
			arr = eval(arr);
			for(var i=0; i<arr.length; i++){
				var nowVal = arr[i];
				if(nowVal!='' || nowVal!=null){
					resultStr+=String.fromCharCode(Number(nowVal)); 
				}
			}
			return resultStr;
		},
		
		//摇一摇
		shakeMobile : function(fn){
			if ( window.DeviceMotionEvent ) {
				var speed = 25;
				var x = y = z = lastX = lastY = lastZ = 0;
				
				window.addEventListener('devicemotion', function(){
					var acceleration = event.accelerationIncludingGravity;
					x = acceleration.x;
					y = acceleration.y;
					if (Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
						//摇一摇结束后
						fn && fn();
					};
					lastX = x;
					lastY = y;
				}, false);
			} else {
				alert("亲！您的手机暂不支持摇一摇(*^__^*)");
			};
		},
		
		
		//***********===//***ajax*异*步*请*求*数*据***\\===**********\\
		/*
		type: 请求的方法 "get" 或 "post"， 默认: "get"; （注：jsonp模式下为 "get"）
		url: 发送请求的地址。
		data: 发送到服务器的数据，url后的传参 'foo=bar1&foo2=bar2'
		dataType: 服务器返回的数据类型 默认: text
					"json": 返回 JSON 数据
					"jsonp": 跨域传输
					"text": 返回纯文本字符串
		processData: 是否对 返回结果的数据 自动转换数据格式, 默认: true; （注：jsonp模式下此参数不参与）
		async: 是否异步加载，默认: true （注：jsonp模式下此参数不参与）
		cache: 默认: true，设置为 false 将不缓存此页面。 （注：jsonp模式下 默认: false）
		success: 请求成功时调用此函数，如带参数 data，可获得返回的数据
		error: 请求失败时调用此函数， 如带参数 data， 则抛出错误信息
		*/
		ajax : function( json ){
			
			var type = json.type !== "post" || json.dataType === "jsonp" ? "get" : "post";
			
			var url = null;
			if( typeof json.url !== "undefined" &&  json.url && json.url.length > 0 ){
				url = json.url;
			} else {
				alert( "发送请求的地址url必须是字符串且不能为空！" );
				return;
			};
			
			var data = json.data;
			//处理发送数据格式
			if(myLab.isJson( data )){
				var arr = [];
				for(var i in data){
					arr.push(i+'='+data[i]);
				}
				data = arr.join('&'); 
				//alert(data);
			}
			
			var dataType = json.dataType !== undefined && typeof json.dataType === "string" ? json.dataType : "text";
			var processData = json.processData !== undefined && typeof json.processData === "boolean" ? json.processData : true;
			var async = json.async !== undefined && typeof json.async === "boolean" ? json.async : true;
			var cache = json.cache !== undefined && typeof json.cache === "boolean" ? json.cache : true;
			var jsonpcache = json.cache !== undefined && typeof json.cache === "boolean" && dataType === "jsonp" ? json.cache : false;
			var success = json.success;
			var error = json.error;
			
			if( !cache ){ data += '&' + this.date_getTime(); };
		
			if( type === 'get' && data ) { url += '?' + data; };
			
			if( dataType === "jsonp" ){ this.jsonp( {"url":url, "cache":jsonpcache, "jsonp": json.jsonp, "success": success, "error": error} ); return; };//调用跨域传输。。。 不执行以下语句！
			
			var xhr = null;
			try {
				xhr = new XMLHttpRequest();
			} catch (e) {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			};
			
			xhr.open( type, url, async );
			//alert(type+','+url)
			if( type === 'get' ) {
				xhr.send();
			} else {
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
				xhr.send(data);
			};
			
			xhr.onreadystatechange = function() {
				
				if ( xhr.readyState == 4 ) {
					if ( xhr.status == 200 ) {
						var result = dataType === "json" && processData ? parseTxt( xhr.responseText ) : xhr.responseText;
						typeof success === "function" && success( result );
					} else {
						//出错了。。。
						typeof error === "function" && error( xhr.status );
					};
				};
				
			};
			
		},
		
		/*
		//***********===//***josnp*跨*域*传*输***\\===**********\\
		url: 发送请求的地址，默认截取 callback后的字符作为回调函数名。 如需自定义回调函数名，请使用下面的jsonp参数
		jsonp: 自定义回到函数名，值必须是json格式的字符串。 如：'{"callback": "mycbFn"}'
		cache: 默认: false，设置为 false 将不缓存此页面
		success: 请求成功时调用此函数，如带参数 data，可获得返回的数据
		error: 请求失败时调用此函数
		*/
		jsonp: function( json ){
			
			var url = null;
			if( typeof json.url !== "undefined" &&  json.url && json.url.length > 0 ){
				url = json.url;
			} else {
				alert( "发送请求的地址url必须是字符串且不能为空！" );
				return;
			};
			
			var cache = json.cache !== undefined && typeof json.cache === "boolean" ? json.cache : false;
			var success = json.success;
			var error = json.error;
			var callbackName = null;
			var oJsonp = json.jsonp ? myLab.parseTxt( json.jsonp ) : null;
			
			if( oJsonp ){
				for( var attr in oJsonp ){
					callbackName = oJsonp[attr];
					if( url.indexOf(attr + "=") !== -1 ){
						//url中含有回调函数的关键 key
						url = url.replace( url.split(attr +"=")[1], "myLab.jsonpCallBack."+callbackName );	
					} else {
						url += "&" + attr + "=" + "myLab.jsonpCallBack." + callbackName;
					};
				};
			} else {
				if( url.indexOf("callback") !== -1 ){
					callbackName = url.split("&callback=")[1];
					callbackName = callbackName.indexOf("&") ? callbackName.split("&")[0] : callbackName;
					url = url.replace( callbackName, "myLab.jsonpCallBack."+callbackName );
				} else {
					alert("无法获取回调函数名！");
					return;
				};
			};
			
			url = !cache ? url + '&' + this.date_getTime() : url;
			this.loadScript( url, '', "head", error );
			
			//调用数据
			if( typeof this.jsonpCallBack !== "object" ) this.jsonpCallBack = {};
			this.jsonpCallBack[callbackName] = function(data){ typeof success === "function" && success(data); };
			
		},
		
		//*********************//***数*据*处*理*部*分***\\*********************\\
		//将字符串转换成对象
		parseTxt : function(text) {
			try {
				return eval('[' + text + ']')[0];
			} catch (err) {
				throw new ReferenceError("转换失败！该字符串不符合转换成对象的格式。");
			};
		},
		
		//------------------------【 UI 】
				
		//自定义滚动条
		scrollNorm : function(json,fn){
			
			if(myLab.isJson(json)){
				if( typeof json.objId !== "undefined" ){
					var objId = json.objId;
					var isPersonBtn = false || json.isPersonBtn;
					var hasTBBtns = false || json.hasTBBtns; 
					var scrollBtnBg = json.scrollBtnBg;
					var ctrlTopBtnBg = json.ctrlTopBtnBg;
					var ctrlBtmBtnBg = json.ctrlBtmBtnBg;
					var scrollBarW = json.scrollBarW || 15;
					var scrollBarH = json.scrollBarH || 60;
				}
			}
			
			if(!document.getElementById(objId)){return false;}
			var oBox = document.getElementById(objId);
			
			var inColor = '#999';
			var outColor = '#666';
			var iT = 0;	
			var clickT = 0;
			var person = 0;
			var iBtnTime = null;
			var sSpeed = 2;
			
			//左侧容器
			var oldcontent = oBox.children[0];
			var contentOffsetH = document.createElement('div');
			contentOffsetH.style.cssText = '\
			position:absolute;\
				 top:0px;\
				 left:0px;\
			  z-index:999;\
			   width:100%'; 
			contentOffsetH.innerHTML = oldcontent.innerHTML;	
			oBox.removeChild(oldcontent);   
			
			var contentWindow = document.createElement('div');
			contentWindow.style.cssText = 'position:absolute;\
				  top:0px;\
				 left:0px;\
			  z-index:999;\
				width:'+(oBox.clientWidth-scrollBarW-5)+'px;\
			   height:100%;\
			   overflow:hidden;';
			oBox.appendChild(contentWindow);
			contentWindow.appendChild(contentOffsetH);
			
			//滚动条按钮
			var scrollBtnBox = document.createElement('div');
			scrollBtnBox.style.cssText = 'position:absolute;\
				 right:0px;\
			  z-index:999;\
			   width:'+scrollBarW+'px;\
			   background:#222';
			oBox.appendChild(scrollBtnBox);
			
			myLab.css3(scrollBtnBox,'borderRadius','5px');
			
			//有无上下两侧按钮
			if(hasTBBtns){
				scrollBtnBox.style.top = '20px';	
				scrollBtnBox.style.height = oBox.clientHeight-40+'px';
			}else{
				scrollBtnBox.style.top = 0;
				scrollBtnBox.style.height = oBox.clientHeight+'px';	
			}
			
			var scrollBtn = document.createElement('div');
			scrollBtn.style.cssText = 'position:absolute;\
				 top:0;\
				left:0;\
			  z-index:999;\
			   width:'+scrollBarW+'px;\
			   height:'+scrollBarH+'px;\
			   background-image:'+(function(){return scrollBtnBg = scrollBtnBg ? scrollBtnBg : 'none'})()+';\
			   font-size:0;\
			   line-height:0;\
			   overflow:hidden;\
			   cursor:pointer;';
			scrollBtnBox.appendChild(scrollBtn);   
			if(typeof scrollBtnBg!='none'){
				myLab.css3(scrollBtn,'borderRadius','5px');
				scrollBtn.style.backgroundColor = outColor;
			}
			//上下按钮
			if(hasTBBtns){
				var topBtn = document.createElement('div');
				topBtn.style.cssText = '\
				position:absolute;\
					 top:0;\
					right:0px;\
				  z-index:999;\
				   width:'+scrollBarW+'px;\
				   height:15px;\
				   background-image:'+(function(){return ctrlTopBtnBg = ctrlTopBtnBg ? ctrlTopBtnBg : 'none'})()+';\
				   font-size:0;\
				   line-height:0;\
				   overflow:hidden;\
				   cursor:pointer;';
				oBox.appendChild(topBtn);
				
				if(typeof ctrlTopBtnBg!='none'){
					topBtn.style.backgroundColor = outColor;	
				}
				
				var btmBtn = document.createElement('div');
				btmBtn.style.cssText = '\
				position:absolute;\
				  bottom:0;\
					right:0px;\
				  z-index:999;\
				   width:'+scrollBarW+'px;\
				   height:15px;\
				   background-image:'+(function(){return ctrlBtmBtnBg = ctrlBtmBtnBg ? ctrlBtmBtnBg : 'none'})()+';\
				   font-size:0;\
				   line-height:0;\
				   overflow:hidden;\
				   cursor:pointer;';
				oBox.appendChild(btmBtn);
				
				if(typeof ctrlBtmBtnBg!='none'){
					 btmBtn.style.backgroundColor = outColor;	
				}
			}
			
			if(scrollBtn&&scrollBtnBox&&contentWindow&&contentOffsetH){			
				
				//运动比例
				function upAndBtm(){
					if(iT<0){
						iT = 0;	
					}else if(iT>(scrollBtnBox.offsetHeight-scrollBtn.offsetHeight)){
						iT = scrollBtnBox.offsetHeight-scrollBtn.offsetHeight;	
					}
					person = iT/(scrollBtnBox.offsetHeight-scrollBtn.offsetHeight);
							
					if(contentOffsetH.offsetHeight > contentWindow.offsetHeight){
						//contentOffsetH.style.top = -person*(contentOffsetH.offsetHeight - contentWindow.offsetHeight)+"px";	
						var theTop = -person*(contentOffsetH.offsetHeight - contentWindow.offsetHeight);	
						myLab.oldStartMove(contentOffsetH,{top:Math.floor(theTop)});
					}
					fn && fn(person);
					scrollBtn.style.top = iT + 'px';
					//oldStartMove(scrollBtn,{top:iT});
				}
				
				//调整滚动条状态
				function resizeIt(){
					contentWindow.style.width = oBox.clientWidth-scrollBarW-5+'px';
					//有无上下两侧按钮
					if(hasTBBtns){
						scrollBtnBox.style.height = oBox.clientHeight-40+'px';
					}else{
						scrollBtnBox.style.height = oBox.clientHeight+'px';	
					}
					
					//右侧滚动条高度以及显示与否
					if(contentOffsetH.offsetHeight < contentWindow.offsetHeight){
						//alert('移除滚动条');
						scrollBtnBox.style.display = 'none';
						if(topBtn&&btmBtn){
							 topBtn.style.display = btmBtn.style.display = 'none';
						}
						iT = 0;
						myLab.oldStartMove(contentOffsetH,{top:0});
						scrollBtn.style.top = '0';
					}else{
						//alert('添加滚动条');
						scrollBtnBox.style.display = 'block';
						scrollBtnBox.style.visibility = 'visible';
						if(topBtn&&btmBtn){
							 topBtn.style.display = btmBtn.style.display = 'block';
							 topBtn.style.visibility = btmBtn.style.visibility = 'visible';
						}
						
						//scrollBtn's height				
						//scrollBtn.style.height = Math.floor(scrollBtnBox.offsetHeight*contentWindow.offsetHeight/contentOffsetH.offsetHeight)+'px';
						if(isPersonBtn){
							myLab.oldStartMove(scrollBtn,{height:(Math.floor(scrollBtnBox.offsetHeight*contentWindow.offsetHeight/contentOffsetH.offsetHeight))});
						}
						
						setTimeout(function(){
							upAndBtm();
						},300);
					};	
				}
				resizeIt();
				
				//点击滚动条某一位置，动作
				scrollBtnBox.onclick = function(ev){
					var oEv = ev || window.event;	
					var oT = oEv.clientY + myLab.scrollT() - myLab.getOffsetPos(scrollBtnBox).t - clickT; 
					iT = oT;
					upAndBtm();
					oEv.cancelBubble = true;
				}
				
				//滑到某一位置
				function scrollMoveTo(val){
					myLab.oldStartMove(contentOffsetH,{top:val});
					person = -val/(contentOffsetH.offsetHeight - contentWindow.offsetHeight);
					iT = Math.floor(person*(scrollBtnBox.offsetHeight-scrollBtn.offsetHeight));
					myLab.oldStartMove(scrollBtn,{top:iT});
					fn && fn(person);
				}
				
				//按钮滑入滑出效果
				if(scrollBtn){
					if(typeof scrollBtnBg!='none'){
						scrollBtn.onmouseover = function(){ this.style.backgroundColor = inColor;};
						scrollBtn.onmouseout = function(){ this.style.backgroundColor = outColor;};
					}else{
						scrollBtn.onmouseover = function(){ myLab.css(this,'opacity',0.8)};
						scrollBtn.onmouseout = function(){ myLab.css(this,'opacity',1)};	
					}
				}
				if(topBtn){
					if(typeof ctrlTopBtnBg!='none'){
						topBtn.onmouseover = function(){ this.style.backgroundColor = inColor;};
						topBtn.onmouseout = function(){ this.style.backgroundColor = outColor;};
					}
				}
				if(btmBtn){
					if(typeof ctrlBtmBtnBg!='none'){
						btmBtn.onmouseover = function(){ this.style.backgroundColor = inColor;};
						btmBtn.onmouseout = function(){ this.style.backgroundColor = outColor;};
					}
				}
				
				//上下按钮 函数
				function btnUpDown(obj,num){
					obj.onmousedown = function(){
						clearInterval(iBtnTime);
						iBtnTime = setInterval(function(){
							iT = scrollBtn.offsetTop - num;				
							upAndBtm();	
						},40);
					}
					obj.onmouseup = function(){
						clearInterval(iBtnTime);	
					}	
				}
				if(topBtn){
					btnUpDown(topBtn,sSpeed);
				}
				if(btmBtn){
					btnUpDown(btmBtn,-sSpeed);
				}
				
				//拖拽按钮
				scrollBtn.onmousedown = function(ev){
					//clearTimer
					clearInterval(iBtnTime);	
					var ev = ev || event; 
					var disY = ev.clientY - scrollBtn.offsetTop;
					if(scrollBtn.setCapture){
						scrollBtn.setCapture();	
					}
					document.onmousemove = function(ev){
						var ev = ev || event;
						iT = ev.clientY - disY;
						upAndBtm();	
						clickT = ev.clientY + myLab.scrollT() - myLab.getOffsetPos(scrollBtn).t;
					}
					document.onmouseup = function(){
						document.onmousemove = null;
						document.onmouseup = null;
						if(scrollBtn.releaseCapture){
							scrollBtn.releaseCapture();	
						}	
					}
					return false;	
				}
				
				//鼠标滚动函数
				var myScrollBtn = '';
				function myScroll(ev){
					var ev = ev || event;
					ev.cancelBubble = true;
					if(ev.detail){
						if(ev.detail>0){
							myScrollBtn = false;
						}else{
							myScrollBtn = true;
						}	
					}
					if(ev.wheelDelta){
						if(ev.wheelDelta>0){
							myScrollBtn = true;
						}else{
							myScrollBtn = false;
						}	
					}	
				
					if(!myScrollBtn){
						iT = scrollBtn.offsetTop + sSpeed;	
					}else{
						iT = scrollBtn.offsetTop - sSpeed;
					}
					
					upAndBtm();
					
					if(ev.preventDefault){
						ev.preventDefault();	
					}else{
						return false;	
					}
				}
				
				//绑定滚动事件
				if(scrollBtnBox.addEventListener){
					scrollBtnBox.removeEventListener("DOMMouseScroll",myScroll,false);
					contentWindow.removeEventListener("DOMMouseScroll",myScroll,false);
					scrollBtnBox.addEventListener("DOMMouseScroll",myScroll,false);	
					contentWindow.addEventListener("DOMMouseScroll",myScroll,false);
				}
				scrollBtnBox.onmousewheel = null;
				contentWindow.onmousewheel = null;
				scrollBtnBox.onmousewheel = myScroll;
				contentWindow.onmousewheel = myScroll;
				
				return {
					resizeFn : resizeIt,
					scrollMoveFn : scrollMoveTo	
				}
				
			}
		},
		
		//-------------------------【 运动 】
		//不能规定时间的运动
		oldStartMove : function(obj, json, fn){
			clearInterval(obj.iTimer);
			var iSpeed = 0;
			var iCur = 0;
			obj.iTimer = setInterval(function(){
				var iBtn = true;
				for(var attr in json){
					
					if(attr == 'opacity'){
						iCur = Math.round(parseFloat(myLab.getStyle(obj, 'opacity')) * 100);
					}else{
						iCur = parseInt(myLab.getStyle(obj, attr));
					}
					
					iSpeed = (json[attr] - iCur)/4;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
					
					if(iCur != json[attr]){
						iBtn = false;
					}
					
					if(attr == 'opacity'){
						obj.style.opacity = (iCur + iSpeed) / 100;
						obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
					}else{
						obj.style[attr] = iCur + iSpeed + 'px';
					}
					
				}
				if(iBtn){
					clearInterval(obj.iTimer);
					fn && fn();
				}
			}, 30);
		}, 
		
		//新的运动
		startMove : function( obj, json, times, fx, fn, fnMove ){
			var isCallBack = true;
			var iCur = {};
			var type = {};
			var timer = null;
			for(var attr in json){
				if(attr == 'opacity'){
					iCur[attr] = Math.round(myLab.getStyle(obj,attr)*100);
				} else {
					iCur[attr] = parseInt(myLab.getStyle(obj,attr));
					type[attr] = typeof json[attr] === "string" && json[attr].indexOf("%") !== -1 ? "%" : "px";
					json[attr] = parseInt( json[attr] );
				};
			};
			var startTime = myLab.date_getTime();
			clearInterval(timer);
			timer = setInterval(function(){
				var changeTime = myLab.date_getTime();
				var scale = 1 - Math.max(0,(startTime - changeTime + times)/times);
				//运动过程中的函数
				if(fnMove){
					fnMove(scale);
				};
				
				for(var attr in json){
					var value = 0;
					fx = typeof fx == "undefined" || fx == "" ? "def" : fx;
					
					value = Tween[fx](scale*times, iCur[attr] , json[attr] - iCur[attr] , times );
					if(attr == 'opacity'){
						obj.style.filter = 'alpha(opacity='+ value +')';
						obj.style.opacity = value/100;
					} else {
						//百分比情况
						obj.style[attr] = value + type[attr];
					};
					
					if(scale == 1){
						clearInterval(timer);
						if(fn && isCallBack){
							fn.call(obj);
							isCallBack = false;
						};
					};
					
				};
				
			},13);
			
			var Tween = {
					def: function (t, b, c, d) {
						return this["easeOutQuad"](t, b, c, d);
					},
					easeInQuad: function (t, b, c, d) {
						return c*(t/=d)*t + b;
					},
					easeOutQuad: function (t, b, c, d) {
						return -c *(t/=d)*(t-2) + b;
					},
					easeInOutQuad: function (t, b, c, d) {
						if ((t/=d/2) < 1) return c/2*t*t + b;
						return -c/2 * ((--t)*(t-2) - 1) + b;
					},
					easeInCubic: function (t, b, c, d) {
						return c*(t/=d)*t*t + b;
					},
					easeOutCubic: function (t, b, c, d) {
						return c*((t=t/d-1)*t*t + 1) + b;
					},
					easeInOutCubic: function (t, b, c, d) {
						if ((t/=d/2) < 1) return c/2*t*t*t + b;
						return c/2*((t-=2)*t*t + 2) + b;
					},
					easeInQuart: function (t, b, c, d) {
						return c*(t/=d)*t*t*t + b;
					},
					easeOutQuart: function (t, b, c, d) {
						return -c * ((t=t/d-1)*t*t*t - 1) + b;
					},
					easeInOutQuart: function (t, b, c, d) {
						if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
						return -c/2 * ((t-=2)*t*t*t - 2) + b;
					},
					easeInQuint: function (t, b, c, d) {
						return c*(t/=d)*t*t*t*t + b;
					},
					easeOutQuint: function (t, b, c, d) {
						return c*((t=t/d-1)*t*t*t*t + 1) + b;
					},
					easeInOutQuint: function (t, b, c, d) {
						if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
						return c/2*((t-=2)*t*t*t*t + 2) + b;
					},
					easeInSine: function (t, b, c, d) {
						return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
					},
					easeOutSine: function (t, b, c, d) {
						return c * Math.sin(t/d * (Math.PI/2)) + b;
					},
					easeInOutSine: function (t, b, c, d) {
						return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
					},
					easeInExpo: function (t, b, c, d) {
						return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
					},
					easeOutExpo: function (t, b, c, d) {
						return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
					},
					easeInOutExpo: function (t, b, c, d) {
						if (t==0) return b;
						if (t==d) return b+c;
						if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
						return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
					},
					easeInCirc: function (t, b, c, d) {
						return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
					},
					easeOutCirc: function (t, b, c, d) {
						return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
					},
					easeInOutCirc: function (t, b, c, d) {
						if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
						return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
					},
					easeInElastic: function (t, b, c, d) {
						var s=1.70158;var p=0;var a=c;
						if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
						if (a < Math.abs(c)) { a=c; var s=p/4; }
						else var s = p/(2*Math.PI) * Math.asin (c/a);
						return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
					},
					easeOutElastic: function (t, b, c, d) {
						var s=1.70158;var p=0;var a=c;
						if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
						if (a < Math.abs(c)) { a=c; var s=p/4; }
						else var s = p/(2*Math.PI) * Math.asin (c/a);
						return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
					},
					easeInOutElastic: function (t, b, c, d) {
						var s=1.70158;var p=0;var a=c;
						if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
						if (a < Math.abs(c)) { a=c; var s=p/4; }
						else var s = p/(2*Math.PI) * Math.asin (c/a);
						if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
						return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
					},
					easeInBack: function (t, b, c, d, s) {
						if (s == undefined) s = 1.70158;
						return c*(t/=d)*t*((s+1)*t - s) + b;
					},
					easeOutBack: function (t, b, c, d, s) {
						if (s == undefined) s = 1.70158;
						return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
					},
					easeInOutBack: function (t, b, c, d, s) {
						if (s == undefined) s = 1.70158; 
						if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
						return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
					},
					easeInBounce: function (t, b, c, d) {
						return c - this["easeOutBounce"] (d-t, 0, c, d) + b;
					},
					easeOutBounce: function (t, b, c, d) {
						if ((t/=d) < (1/2.75)) {
							return c*(7.5625*t*t) + b;
						} else if (t < (2/2.75)) {
							return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
						} else if (t < (2.5/2.75)) {
							return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
						} else {
							return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
						}
					},
					easeInOutBounce: function (t, b, c, d) {
						if (t < d/2) return this["easeInBounce"] (t*2, 0, c, d) * .5 + b;
						return this["easeOutBounce"] (t*2-d, 0, c, d) * .5 + c*.5 + b;
					}
				}
		},
		
		//震荡
		shake : function( obj, attr, callBack ){
			if ( obj.onOff ) return;
			obj.onOff = true;
			
			var pos = parseInt(myLab.getStyle(obj, attr));	
			var arr = [];			// 20, -20, 18, -18 ..... 0
			var num = 0;
			var timer = null;
				
			for ( var i=20; i>0; i-=2 ) {
				arr.push( i, -i );
			}
			arr.push(0);
				
			clearInterval( obj.shake );
			obj.shake = setInterval(function (){
				obj.style[attr] = pos + arr[num] + 'px';
				num++;
				if ( num === arr.length ) {
					clearInterval( obj.shake );
					callBack && callBack();
					obj.onOff = false;
				}
			}, 50);
		},
		
		//碰撞
		getClose : function(obj,target){
			var L1 = obj.offsetLeft;
			var T1 = obj.offsetTop;
			var W1 = obj.offsetWidth;
			var H1 = obj.offsetHeight;
			
			var L2 = target.offsetLeft;
			var T2 = target.offsetTop;
			var W2 = target.offsetWidth;
			var H2 = target.offsetHeight;
		
			if( (W1+L1)<L2 || L1>(W2+L2) || (H1+T1)<T2 || T1>(H2+T2) ){
				return false;
			}else{
				return true;
			}
		},
		
		//slideDown
		mySlideUp : function(obj,num,fn){
			if(obj){
				var iSpeed = num || 350;
				myLab.startMove(obj,{height:0,opacity:0},iSpeed,'def',function(){
					this.style.display = 'none';
					fn && fn();		
				});	
			}
		},
		
		//slideUp
		mySlideDown : function(obj,num,fn){
			if(obj){
				var iSpeed = num || 350;
				obj.style.opacity = 0;
				obj.style.filter = 'aplha(opacity=0)';
				obj.style.display = 'block';
				obj.style.height = 'auto';
				var _tarH = obj.offsetHeight;
				obj.style.height = 0;
				myLab.startMove(obj,{height:_tarH,opacity:100},iSpeed,'def',function(){
					fn && fn();	
				});	
			}
		},
		
		//-------------------------【 移动端开发 】
		//json: {  obj:'', dirType:'pageX'/'pageY', moveObj:'', endObj:'' }
		//toLeftFn : 左/上
		//toRightFn : 右/下
		//toMoveFn: 移动中回调 ( 移动的新坐标，移动的距离 )
		touch : function( json, toLeftFn, toRightFn, toMoveFn ){
			var obj = null;
			if( typeof json.obj !== "undefined" ){
				obj = json.obj;
			} else {
				return;
			};
			var startObj = typeof json.startObj === "object" ? json.startObj : obj;
			var endObj = typeof json.endObj === "object" ? json.endObj : obj;
			var moveObj = typeof json.moveObj === "object" ? json.moveObj : obj;
			
			var dirStr = json.dirType !== "pageY" ? "pageX" : json.dirType;
			var dirJson = {
				"page"    : dirStr,
				"offsetLT": dirStr === "pageX" ? "offsetLeft" : "offsetTop",
				"offsetWH": dirStr === "pageX" ? "offsetWidth" : "offsetHeight"
			};
			
			var downVal = 0;
			var downLT = 0;
			var downTime = 0;
			var allowMove = false;
			
			function startFn(ev){
				
				var ev = ev || event;
				var touchs = typeof ev.changedTouches === "undefined" ? ev : ev.changedTouches[0];
				
				downVal = touchs[dirJson.page];
				downLT = obj[dirJson.offsetLT];
				downTime = myLab.date_getTime();
				allowMove = true;
				
			};
			
			function moveFn(ev){
				
				if( typeof toMoveFn !== "function" || !allowMove )return;
				
				var ev = ev || event;
				var touchs = typeof ev.changedTouches === "undefined" ? ev : ev.changedTouches[0];
				
				var touchDistance = touchs[dirJson.page] - downVal;
				var moveVal = touchDistance + downLT;
				
				//移动中...
				toMoveFn.call( obj, moveVal, touchDistance );
				
			};
			
			function endFn(ev){
				if ( !allowMove ) return false;
				allowMove = false;
				
				var ev = ev || event;
				var touchs = typeof ev.changedTouches === "undefined" ? ev : ev.changedTouches[0];
				
				var endX = touchs[dirJson.page] - downVal;
				if( endX < 0 ){//←
					if( (Math.abs(endX) > obj[dirJson.offsetWH]/3 || (myLab.date_getTime() - downTime < 300 && Math.abs(endX) > 30 )) ){
						//dirJson.page = "pageX"向左运动； dirJson.page = "pageY"向上运动
						typeof toLeftFn === "function" ? toLeftFn.call( obj ) : "";
						
					}
				} else {//→
					if( (Math.abs(endX) > obj[dirJson.offsetWH]/3 || (myLab.date_getTime() - downTime < 300 && Math.abs(endX) > 30 )) ){
						//dirJson.page = "pageX"向右运动； dirJson.page = "pageY"向下运动
						typeof toRightFn === "function" ? toRightFn.call( obj ) : "";
						
					}
				};
			};
			
			//事件绑定
			if(myLab.isPc()){
				myLab.bindEvent( moveObj, "mousedown", function(ev){
					var ev = ev || window.event;
					ev.cancelBubble = true;	
					ev.preventDefault();				
				});
				myLab.bindEvent( startObj, "mousedown", startFn );
				myLab.bindEvent( moveObj, "mousemove", moveFn );
				myLab.bindEvent( endObj, "mouseup", endFn );
			}else if(myLab.isWinphone()){
				myLab.bindEvent( moveObj, "MSPointerOver", function(ev){
					var ev = ev || window.event;
					ev.cancelBubble = true;
					ev.preventDefault();
				});
				myLab.bindEvent( startObj, "MSPointerOver", startFn );
				myLab.bindEvent( moveObj, "MSPointerMove", moveFn );
				myLab.bindEvent( endObj, "MSPointerOut", endFn );	
			}else{
				myLab.bindEvent( moveObj, "touchmove", function(ev){
					var ev = ev || window.event;
					ev.cancelBubble = true;
					ev.preventDefault();
				});
				myLab.bindEvent( startObj, "touchstart", startFn );
				myLab.bindEvent( moveObj, "touchmove", moveFn );
				myLab.bindEvent( endObj, "touchend", endFn );		
			};
			
		},
		
		//手机屏幕方向的检测
		addListenScreen : function(){
			function listenScreen(){
				switch(window.orientation){
					case 0 :  alert(1);
							   break;
					case 90 : alert(2);
							   break;
					case 180 : alert(3);
							   break;
					case -90 : alert(4);
							   break;		   		   		   	
				}
			};
			listenScreen();
			window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", listenScreen, false);
		},
		
		//移动端，滚动条
		/*var kjScroll = phoneScrollNorm({
			scrollBtn: oScrollBtn,
			scrollBtnBox: oScrollBox,
			contentWindow: oSportWin,
			contentOffsetH: oSportBox,
			fn: '',
			topBtn: oScrollTopBtn,
			btmBtn: oScrollBtmBtn
		});
		bindEvent(window, 'resize', function () {
			kjScroll.resizeFn();
		});
		*/
		phoneScrollNorm : function(json) {
			var startEvt = '',midEvt = '',endEvt = '';
			if(myLab.isPc()){
				startEvt = 'mousedown';	
				midEvt = 'mousemove';	
				endEvt = 'mouseup';
			}else if(myLab.isWinphone()){
				startEvt = 'MSPointerOver';
				midEvt = 'MSPointerMove';
				endEvt = 'MSPointerOut';		
			}else{
				startEvt = 'touchstart';
				midEvt = 'touchmove';
				endEvt = 'touchend';
			}
		
			var scrollBtn = json.scrollBtn;
			var scrollBtnBox = json.scrollBtnBox;
			var contentWindow = json.contentWindow;
			var contentOffsetH = json.contentOffsetH;
			var spBox = contentOffsetH;
			var oBox = contentWindow;
			var fn = json.fn || null;
			var topBtn = json.topBtn || null;
			var btmBtn = json.btmBtn || null;
			var iT = 0;
			var person = 0;
			var iBtnTime = null;
			var sSpeed = 15;
			var iNow = 0;
		
			if (scrollBtn && scrollBtnBox && contentWindow && contentOffsetH) {
		
				//运动比例
				function upAndBtm() {
					if (iT < 0) {
						iT = 0;
					} else if (iT > (scrollBtnBox.offsetHeight - scrollBtn.offsetHeight)) {
						iT = scrollBtnBox.offsetHeight - scrollBtn.offsetHeight;
					}
					person = iT / (scrollBtnBox.offsetHeight - scrollBtn.offsetHeight);
		
					if (contentOffsetH.offsetHeight > contentWindow.offsetHeight) {
						//contentOffsetH.style.top = -person * (contentOffsetH.offsetHeight - contentWindow.offsetHeight) + "px";
						theTop = -person*(contentOffsetH.offsetHeight - contentWindow.offsetHeight);	
						myLab.oldStartMove(contentOffsetH,{top:Math.floor(theTop)});
					}
					fn && fn();
					scrollBtn.style.top = iT + 'px';
				}
		
				//调整滚动条状态
				function resizeIt() {
					//右侧滚动条高度以及显示与否
					if (contentOffsetH.offsetHeight < contentWindow.offsetHeight) {
						//alert(contentOffsetH.offsetHeight + ',' + contentWindow.offsetHeight);//342 403
						//alert('移除滚动条');
						scrollBtnBox.style.display = 'none';
						if (topBtn && btmBtn) {
							topBtn.style.display = btmBtn.style.display = 'none';
						}
						iT = 0;
						myLab.oldStartMove(contentOffsetH, { top: 0 });
						scrollBtn.style.top = '0';
					} else {
						//alert('添加滚动条');
						scrollBtnBox.style.display = 'block';
						scrollBtnBox.style.visibility = 'visible';
						if (topBtn && btmBtn) {
							topBtn.style.display = btmBtn.style.display = 'block';
							topBtn.style.visibility = btmBtn.style.visibility = 'visible';
						}
		
						//scrollBtn's height				
						scrollBtn.style.height = parseInt(scrollBtnBox.offsetHeight * contentWindow.offsetHeight / contentOffsetH.offsetHeight) + 'px';
						if (browerMaster.than2('msie', 10, 'lt')) {
							setTimeout(function () {
								upAndBtm();
							}, 300)
						} else {
							myLab.addClass(scrollBtn, 'ts3'); myLab.addClass(contentOffsetH, 'ts3');
							setTimeout(function () {
								upAndBtm();
								setTimeout(function () {
									myLab.removeClass(scrollBtn, 'ts3'); myLab.removeClass(contentOffsetH, 'ts3');
								}, 300)
							}, 300);
						}
		
					};
				}
				//setInterval(function () {
					resizeIt();
				//}, 3000);
		
				//上下按钮 函数
				function btnUpDown(obj, num) {
					function startFn() {
						clearInterval(iBtnTime);
						iBtnTime = setInterval(function () {
							iT = scrollBtn.offsetTop - num;
							upAndBtm();
						}, 40);
					}
					function endFn() {
						clearInterval(iBtnTime);
					}
					myLab.bindEvent(obj, startEvt , startFn);
					myLab.bindEvent(obj, endEvt , endFn);
				}
				if (topBtn) {
					btnUpDown(topBtn, sSpeed);
				}
				if (btmBtn) {
					btnUpDown(btmBtn, -sSpeed);
				}
		
				var disY
				//touch拖拽滚动按钮
				function scrollBtnStart(ev) {
					clearInterval(iBtnTime);
					var ev = ev || event;
					var touchs = typeof ev.changedTouches === "undefined" ? ev : ev.changedTouches[0];
					disY = touchs.pageY - scrollBtn.offsetTop;
					myLab.bindEvent(scrollBtn, midEvt, scrollBtnMove);
					myLab.bindEvent(scrollBtn, endEvt , scrollBtnEnd);
					//css(this, { opacity: 70 });
					ev.cancelBubble = true;
					ev.preventDefault();
				}
				function scrollBtnMove(ev) {
					var ev = ev || event;
					var touchs = typeof ev.changedTouches === "undefined" ? ev : ev.changedTouches[0];
					iT = touchs.pageY - disY;
					upAndBtm();
				}
				function scrollBtnEnd() {
					//css(this, { opacity: 100 });
					myLab.delEvent(scrollBtn, midEvt , scrollBtnMove);
					myLab.delEvent(scrollBtn, endEvt , scrollBtnMove);
				}
				myLab.bindEvent(scrollBtn, startEvt , scrollBtnStart);
		
				//主体区域拖拽
				var downY = 0;
				var bBtn = false;
				function startFn(ev) {
					if (scrollBtnBox.style.display == 'none') { return false;}
					var ev = ev || event;
					var touchs = typeof ev.changedTouches === "undefined" ? ev : ev.changedTouches[0];
					bBtn = true;
					downY = touchs.pageY;
					downTop = spBox.offsetTop;            
					downTime = myLab.date_getTime();
					myLab.bindEvent(contentOffsetH, midEvt , moveFn);
					myLab.bindEvent(contentOffsetH, endEvt , endFn);
					ev.cancelBubble = true;
				};
				//moveFn
				function moveFn(ev) {
					var ev = ev || event;
					var touchs = typeof ev.changedTouches === "undefined" ? ev : ev.changedTouches[0];
					if (spBox.offsetTop >= 0) {
						if (bBtn) {
							bBtn = false;
							downY = touchs.pageY;
						}
						spBox.style.top = (touchs.pageY - downY) / 5 + 'px';
					}
					else if (spBox.offsetTop <= oBox.offsetHeight - spBox.offsetHeight) {
						if (bBtn) {
							bBtn = false;
							downY = touchs.pageY;
						}
						spBox.style.top = (touchs.pageY - downY) / 5 + (oBox.offsetHeight - spBox.offsetHeight) + 'px';
					}
					else {
						spBox.style.top = touchs.pageY - downY + downTop + 'px';
						//oldStartMove(spBox, { top: (touchs.pageY - downY + downTop) });
					}
					iT = -spBox.offsetTop / (contentOffsetH.offsetHeight - contentWindow.offsetHeight)*(scrollBtnBox.offsetHeight - scrollBtn.offsetHeight);
					if (iT < 0) {
						iT = 0;
					} else if (iT > scrollBtnBox.offsetHeight - scrollBtn.offsetHeight) {
						iT = scrollBtnBox.offsetHeight - scrollBtn.offsetHeight;
					}
					//scrollBtn.style.top = iT + 'px';
					myLab.oldStartMove(scrollBtn, { top: Math.floor(iT) });
					fn && fn();
					ev.preventDefault();
				};
				//endFn
				function endFn(ev) {
					var des = spBox.offsetTop;
					if (spBox.offsetTop >= 0) {
						des = 0;
					} else if (spBox.offsetTop <= oBox.offsetHeight - spBox.offsetHeight) {
						des = oBox.offsetHeight - spBox.offsetHeight;
					}
					myLab.startMove(spBox, { top: des }, 400, 'def');
					myLab.delEvent(contentOffsetH, midEvt , moveFn);
					myLab.delEvent(contentOffsetH, endEvt , endFn);
				};
		
				//主体拖拽bind
				myLab.bindEvent(contentOffsetH, startEvt , startFn);
				
				//阻止滚动条默认事件
				function prevD(ev){
					var ev = ev || event;
					if(ev.preventDefault){
						ev.preventDefault();
					}else{
						return false;
					}
					ev.cancelBubble = true;
				}
				
				/*var oS = $('.my_select');
				for(var i=0; i<oS.length; i++){
					bindEvent(contentOffsetH, "touchstart", prevD);
				}*/
				//myLab.bindEvent(contentOffsetH,startEvt, prevD);
		
				//滑到某一位置
				function scrollMoveTo(val) {
					myLab.addClass(contentOffsetH, 'ts3'); myLab.addClass(scrollBtn, 'ts3');
					person = -val / (contentOffsetH.offsetHeight - contentWindow.offsetHeight);
					iT = person * (scrollBtnBox.offsetHeight - scrollBtn.offsetHeight);
					scrollBtn.style.top = iT + 'px';
					
					setTimeout(function () {
						myLab.removeClass(contentOffsetH, 'ts3'); myLab.removeClass(scrollBtn, 'ts3');
						//contentOffsetH.style.top = val + 'px';
						myLab.oldStartMove(contentOffsetH, { top: val });
						fn && fn();
					}, 500);
		
				}
		
				return {
					resizeFn: resizeIt,
					scrollMoveFn: scrollMoveTo
				}
		
			}
		},
		
		/*屏幕方向检测  横屏 fn2  竖屏 fn1 */
		screenOrientation : function(fn1,fn2){
			
			//事件兼容
			var supportsOrientationChange = "onorientationchange" in window,
			orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
			
			// 监听事件  
			window.addEventListener(orientationEvent, function () {
				var ua = navigator.userAgent;
				//判断设备类型   
				if (ua.indexOf("iPad") > 0 || ua.indexOf("iPhone") > 0) {
					deviceType = "isIpad";
				} else if (ua.indexOf("Android") > 0) {
					deviceType = "isAndroid";
				} else {
					return;
				}
			
				// 判断横竖屏   
				if ("isIpad" === deviceType) {
					if (Math.abs(window.orientation) === 90) {
						//"iPad横屏";
						fn2 && fn2();
						return;
					} else {
						//"iPad竖屏";
						fn1 && fn1();
					}
				} else if ("isAndroid" === deviceType) {
					if (Math.abs(window.orientation) !== 90) {
						//"android竖屏";
						fn1 && fn1();
					} else {
						//"android横屏";
						fn2 && fn2();
						return;
					}
				}
			
			}, false);
		},
		
		/*  addMyShareSkill(json)
			opation{
				SetMenuId : 'shareMenuSkill',
				SetTitle : "大众进口汽车electric up!",
				SetContents : '车流喧嚣取代了鸟啼虫鸣，雾霾中的叹息遮蔽了阳光下的欢笑，对环境的抱怨成了生活主旋律，你是否希望城市多一些美好？你是否已经脑洞大开，按捺不住对城市的畅想？@大众进口汽车 electric up! 帮你实现！www.upfamily.cn为城市发声，更有限量星空投影灯/云朵花盆等你赢！',
				Seturl : 'http://www.upfamily.cn',
				SetPic : 'http://www.upfamily.cn/swf/images/s.jpg',
				SetAppKey : ''	
			}
			分享btn类名 -- 【 mySinaBtn , myDoubanBtn , myRenrenBtn , myTxwbBtn , myQzonebBtn , myWxBtn 】
		*/
		addMyShareSkill : function(opation){
			if(!myLab.isJson(opation)){
				return false;	
			}
			
			//-----------------------[ 整站 设置基本分享信息  start]
			var setMes = {
				SiteMenuId : opation.SetMenuId,
				SiteTitle : opation.SetTitle || document.title,
				SiteContents : opation.SetContents || document.title,
				Siteurl : opation.Seturl,
				SitePic : opation.SetPic,
				SiteAppKey : opation.SetAppKey
			}
			
			var _t = encodeURIComponent(setMes.SiteTitle);
			var _appkey = encodeURI(setMes.SiteAppKey);
			var _url = encodeURIComponent(setMes.Siteurl);
			var _site = encodeURIComponent(setMes.SiteContents);
			var _pic = encodeURI(setMes.SitePic);
			
			//---------------------设置新窗口的样式
			var newWindow = {
				width : 600, //新窗口的宽度
				height : 600, //新窗口的高度
				top : 75, //新窗口的left
				left : 20, //新窗口的top
				status : 'no', //窗口的信息
				scrollbars : 'no', //新窗口内是否允许出现滚动条
				resizable : 'yes' //新窗口是否可以调整大小
			}
			
			//-----------------------[ 整站 设置基本分享信息  end]
			
			//添加整站基本分享事件
			if(document.getElementById(setMes.SiteMenuId)){
				shareBtnBox = document.getElementById(setMes.SiteMenuId);
				var aA = shareBtnBox.getElementsByTagName('a');
				if(aA.length>0){
					for(var i=0; i<aA.length; i++){
						aA[i].onclick = function(){
							if(myLab.hasClass(this,'mySinaBtn')){
								P_share('sina');
							}else if(myLab.hasClass(this,'myDoubanBtn')){
								P_share('douban');	
							}else if(myLab.hasClass(this,'myRenrenBtn')){
								P_share('renren');	
							}else if(myLab.hasClass(this,'myTxwbBtn')){
								P_share('txwb');	
							}else if(myLab.hasClass(this,'myQzonebBtn')){
								P_share('q_zone');	
							}else if(myLab.hasClass(this,'myWxBtn')){
								
								var sh = window.open("http://www.jiathis.com/send/?webid=weixin&url=" + setMes.Siteurl + "&title="+encodeURIComponent(setMes.SiteContents));
								sh.focus()
								
							}
						}
					 }
				 }	
			}
			
			/*分享的平台*/
			function P_share(shareWhere){
				if(shareWhere == 'sina'){
					//分享新浪
					shareTSina();
				}else if(shareWhere == 'q_zone'){
					//分享QQ空间
					shareQzone();
				}else if(shareWhere == 'kaixin'){
					//分享开心网
					shareKx();
				}else if(shareWhere == 'txwb'){
					//分享到腾讯微博
					shareTxwb();
				}else if(shareWhere == 'renren'){
					//分享人人网
					shareRenren();
				}else if(shareWhere == 'douban'){
					//分享人人网
					shareDouBan();
				}
			}
			
			//新浪微博
			function shareTSina(){
				var wordLink = 'http://service.weibo.com/share/share.php?title='+ _site +'&url='+ _url +'&pic='+ _pic +'&appkey='+ _appkey;
				window.open( wordLink,'_blank','scrollbars='+newWindow.scrollbars+',width='+newWindow.width+',height='+newWindow.height+',left='+newWindow.left+',top='+newWindow.top+',status='+newWindow.status+',resizable='+newWindow.resizable);
			}
			
			//开心网
			function shareKx(){
			   var wordLink = 'http://www.kaixin001.com/repaste/bshare.php?rtitle='+ _t +'&rurl='+ _url +'&rcontent='+_site+'&pic='+ _pic;	
			   window.open( wordLink,'_blank','scrollbars='+newWindow.scrollbars+',width='+newWindow.width+',height='+newWindow.height+',left='+newWindow.left+',top='+newWindow.top+',status=no,resizable='+newWindow.resizable );
			}
			
			//人人网
			function shareRenren() {
				var wordLink = 'http://widget.renren.com/dialog/share?resourceUrl='+ _url +'&srcUrl='+ _url +'&title='+ _t +'&pic='+ _pic +'&description='+ _site;
				window.open(wordLink,'_blank','scrollbars='+newWindow.scrollbars+',width='+newWindow.width+',height='+newWindow.height+',left='+newWindow.left+',top='+newWindow.top+',status='+newWindow.status+',resizable='+newWindow.resizable);
			}
			
			//QQ空间
			function shareQzone(){
				//http//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=&title=&pics=&summary=	
				var wordLink = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ _url +'&title='+ _t +'&pic='+ _pic +'&summary='+_site;
				window.open(wordLink,'_blank','scrollbars='+newWindow.scrollbars+',width='+newWindow.width+',height='+newWindow.height+',left='+newWindow.left+',top='+newWindow.top+',status='+newWindow.status+',resizable='+newWindow.resizable);
			}
			
			
			//腾讯微博
			function shareTxwb() {
				var wordLink = 'http://v.t.qq.com/share/share.php?url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic + '&title=' + _site;
				window.open(wordLink,'_blank','scrollbars='+newWindow.scrollbars+',width='+newWindow.width+',height='+newWindow.height+',left='+newWindow.left+',top='+newWindow.top+',status='+newWindow.status+',resizable='+newWindow.resizable);
			}
			
			//豆瓣
			function shareDouBan(){
				var wordLink = 'http://www.douban.com/share/service?image='+ _pic +'&href='+ _url +'&name='+ _t +'&text='+_site;
				window.open(wordLink,'_blank','scrollbars='+newWindow.scrollbars+',width='+newWindow.width+',height='+newWindow.height+',left='+newWindow.left+',top='+newWindow.top+',status='+newWindow.status+',resizable='+newWindow.resizable);	
			}	
		},
		
		//自定义ready事件
		ready: function( f ){
			var ie = !!(window.attachEvent && !window.opera);
			var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525); 
			var fn = []; 
			var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); }; 
			var d = document; 
			 
			if (!ie && !wk && d.addEventListener) 
				return d.addEventListener('DOMContentLoaded', f, false); 
			if (fn.push(f) > 1) return; 
			if (ie) 
				(function () { 
					try { d.documentElement.doScroll('left'); run(); } 
					catch (err) { setTimeout(arguments.callee, 0); } 
				})(); 
			else if (wk) 
				var t = setInterval(function () { 
				if (/^(loaded|complete)$/.test(d.readyState)) 
				clearInterval(t), run(); 
				}, 0);
		}
		
	}
	window.myLab = myLab;
	
	//滚动到某个区域
	var scrollToTar = (function(){
		var tar = 0;
		var canScroll = 0;
		var iTimer = null;
		
		setInterval(function(){
			canScroll = myLab.getMax([myLab.viewH(),myLab.scrollH(),myLab.offsetH()]).val - myLab.viewH();
			if(tar>canScroll){ tar = canScroll;}	//目标位置大于页面可以滚动的上限
			//document.title  = getMax([viewH(),scrollH(),offsetH()]) +','+ viewH();
		},10)		
		
		function toTar(tar,fn,moveFn){
			tar = tar || 0;
			canScroll = myLab.getMax([myLab.viewH(),myLab.scrollH(),myLab.offsetH()]).val - myLab.viewH();		
			if(tar>canScroll){ tar = canScroll;}
			
			clearInterval(iTimer);
			var iSpeed = 0;
			var iCur = 0;
			iTimer = setInterval(function(){
				var iBtn = true;
				
				iCur = myLab.scrollT();
				iSpeed = (tar - iCur)/7;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur != tar){
					iBtn = false;
				}
				//运动中回调
				moveFn && moveFn((iCur + iSpeed));
				document.body.scrollTop = document.documentElement.scrollTop = iCur + iSpeed;
				
				if(iBtn){
					clearInterval(iTimer);
					fn && fn();
				}
			}, 30);
		}
		
		function toTop(fn,moveFn){
			tar = 0;
			toTar(tar,fn,moveFn);	
		}
		
		function toBtm(fn,moveFn){
			tar = canScroll;
			toTar(tar,fn,moveFn);	
		}
		
		return {
			toTop : toTop,
			toBtm : toBtm,
			toTar : toTar	
		}
	})();
	window.scrollToTar = scrollToTar;
	
	//浏览器版本
	var browerMaster = (function(){
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	
		//浏览器版本信息
		//Opera浏览器用的是Chrome的内核
		function fn(){
			if(Sys.ie){
				return 'IE: ' + Sys.ie;
			} 
			if(Sys.firefox){
				return  'Firefox: ' + Sys.firefox;
			} 
			if(Sys.chrome){
				return  'Chrome: ' + Sys.chrome;
			} 
			if(Sys.opera){
				return  'Opera: ' + Sys.opera;
			} 
			if(Sys.safari){
				return  'Safari: ' + Sys.safari;
			}
			if(ua.match(/trident/) && ua.match(/rv/) && ua.match(/11/)){
				return 'IE: ' + 11;
			}	
		}
		
		//浏览器类型( name : msie，firefox，opera，chrome，safari )  //浏览器版本号 (num)  //对比的关系 ( MoL : gt,gte,lt,lte,eq )
		function fn2(name,num,MoL){
			//比对版本
			if(isNaN(Number(num))){
				return false;	
			}else{
				var num = Number(num);	
			}
			//符号
			switch(MoL){
				case 'gt' : MoL = '>';
						  break;
				case 'gte' : MoL = '>=';
						   break;
				case 'lt' : MoL = '<';
						  break;
				case 'lte' : MoL = '<=';
						   break;
				case 'eq' : MoL = '==';	
						  break;		   		  		  		  	
			}
			//浏览器
			switch(name){
				case 'msie' : return eval(Number(parseInt(Sys.ie))+MoL+num) ? true : false;
							  break;
				case 'firefox' : return eval(Number(parseInt(Sys.firefox))+MoL+num) ? true : false;
							   break;
				case 'opera' :  return eval(Number(parseInt(Sys.chrome))+MoL+num) ? true : false;
							 break;
				case 'chrome' : return eval(Number(parseInt(Sys.chrome))+MoL+num) ? true : false;
							  break;
				case 'safari' : return eval(Number(parseInt(Sys.safari))+MoL+num) ? true : false;
							  break;		  		  	  	
			}	
		}	
		
		return {
			desMes : fn,
			than2 : fn2
		}	
	})();
	window.browerMaster = browerMaster;
	
})( window, document, undefined );

//----------------------【 原型拓展 】
//数组-删除
Array.prototype.remove = Array.prototype.remove || function (n){
	for(var i=0;i<this.length;i++)
	{
		if(this[i]==n)
		{
			this.splice(i, 1);
			i--;
		}
	}
};

/*
	myMarkBox  
	myMarkBox.inFn(obj); 
	myMarkBox.outFn(obj);
*/
var myMarkBox = (function(){
		
	var oMarkLevel = null;

	function inFn(obj){
		var oBox = obj || document.getElementsByTagName('body')[0];	
		oMarkLevel = document.createElement('div');
		oMarkLevel.id = 'myMarkBox';
		oMarkLevel.style.zIndex = 9999;
		//css(oMarkLevel,{position:'absolute',left:0,top:0,width:100+'%',height:getMax([viewH(),scrollH(),offsetH()]),overflow:'hidden',background:'#000',opacity:0});	
		myLab.css(oMarkLevel,{position:'fixed',left:0,top:0,width:100+'%',height:'100%',overflow:'hidden',background:'#000',opacity:0});			
		oBox.appendChild(oMarkLevel);
		setTimeout(function(){
			myLab.startMove(oMarkLevel,{opacity:50},500,'def');
		},0);
	}
	
	function outFn(obj){
		//console.log(1);
		var oBox = obj || document.getElementsByTagName('body')[0];	
		if(oMarkLevel != null){/* && oMarkLevel.offsetParent==oBox*/
			//startMove(oMarkLevel,{opacity:0},500,'def',function(){
				oBox.removeChild(oMarkLevel);
			//});
			oMarkLevel = null;	
		}
	}
	
	myLab.bindEvent(window,'resize',function(){
		if(oMarkLevel){
			//console.log('111');
			var resultH = 0;
			if(myLab.viewH()>myLab.offsetH()){
				resultH = myLab.getMax([myLab.viewH(),myLab.scrollH(),myLab.offsetH()]);
			}else{
				resultH = myLab.offsetH();	
			}
			oMarkLevel.style.height = resultH + 'px';	
		}	
	})
	
	return {
		inFn : inFn,
		outFn : outFn	
	}
	
})();



