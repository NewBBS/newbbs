define(function(require, exports, module) {
/* iStorage PUBLIC CLASS DEFINITION
 * 此模块没有采用chrome的存储方式
 * ====================== */
	module.exports = {
	    set : function(key, value){
			window.localStorage.setItem(key, JSON.stringify(value));
		},
		get : function(key){
			return JSON.parse(window.localStorage.getItem(key)); 
		},
		remove : function(key){
			window.localStorage.removeItem(key); 
		},
		clear : function(key){
			window.localStorage.clear(); 
		}
	};
})