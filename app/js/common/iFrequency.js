var Newbbs = Newbbs || {};

//此模块没有采用chrome的存储方式
define(function(require, exports, module) {
/* 
 * 页面刷新的频率，这个应该是主程序，因为刷新后要很多初始化操作
 * ====================== */
 	var connect = require('iConnect.js');
 	var c_t_b = new connect('hello');
 	var now = require('iGetNow.js');
	exports.frequency = function(content){
		c_t_b.post({'page': now.getNowPage, 'floor': now.getNowFloor })
		chrome.tabs.update();  //这个应该是后台来完成
	}
})