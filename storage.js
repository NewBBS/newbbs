var Newbbs = Newbbs || {};

//此模块没有采用chrome的存储方式
Newbbs.storage = (function(storage){
	var set = function(key, value){
		storage.setItem(key, JSON.stringify(value));
	};
	var get = function(key){
		return JSON.parse(storage.getItem(key)); 
	};
	var remove = function(key){
		storage.removeItem(key); 
	};
	var clear = function(key){
		storage.clear(); 
	};

	return {
		set : set,
		get : get,
		remove : remove,
		clear : clear
	}
})(window.localStorage)