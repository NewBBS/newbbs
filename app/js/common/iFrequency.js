define(function(require, exports, module) {
/* 
 * 页面刷新的频率，这个应该是主程序，因为刷新后要很多初始化操作
 * ====================== */
	exports.frequency = function(fn){
		setTimeout(fn, 1000);
	}
})