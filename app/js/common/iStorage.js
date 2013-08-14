define(function(require, exports, module) {
/* 
 * 此模块没有采用chrome的存储方式，数据是存储在插件的控制面板里面的
 * ====================== */
	module.exports = {
		length : window.localStorage.length,  //这玩意在初始化就生成了，貌似没有什么用
	    set : function(key, value){
			window.localStorage.setItem(key, JSON.stringify(value));
		},
		get : function(key){
			return JSON.parse(window.localStorage.getItem(key)); 
		},
		getAllKey : function(){
			var keys = [];
			for (var i=0, len = this.length; i  <  len; i++){
			    var key = window.localStorage.key(i);
			    keys.push(key);
			}
			return keys; 
		},
		getKeyByValue : function(value){ //value是obj,key,value
			for (var i=0, len = window.localStorage.length; i  <  len; i++){
			    var key = window.localStorage.key(i);
			    if(this.get(key)[value[0]] == value[1]){
			    	return key;
			    }
			}
		},
		remove : function(key){
			window.localStorage.removeItem(key); 
		},
		clear : function(key){
			window.localStorage.clear(); 
		}
	};
})