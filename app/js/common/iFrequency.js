define(function(require, exports, module) {
/* 
 * 页面刷新的频率，这个应该是主程序，因为刷新后要很多初始化操作
 * ====================== */
	exports.getTime = function(floor, target_floor, tid){
		var time;
		if(floor < target_floor*0.5){
			tid && clearInterval(tid));
			time = 60 * 1000;
		} else if(floor < target_floor*0.8){
			time = 30 * 1000;
		} else if(floor < target_floor*0.9){
			time = 10 * 1000;
		} else {
			time = 1000;
		}
		return time;
	}
})