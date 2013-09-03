define(function(require, exports, module) {
/* 
 * 页面刷新的频率，这个应该是主程序，因为刷新后要很多初始化操作
 * ====================== */
	exports.getTime = function(floor, target_floor, tid){
		var time = 0;
		if(tid) { //只有当楼层等于一个点的时候才进行切换
			if(floor == Math.floor(target_floor*0.5)){
				time = 60 * 1000;
			} else if(floor == Math.floor(target_floor*0.8)){
				time = 30 * 1000;
			} else if(floor == Math.floor(target_floor*0.9)){
				time = 1000;
			}
		} else { //这是第一次获取time的值
			if(floor < target_floor*0.5){
				time = 60 * 1000;
			} else if(floor < target_floor*0.8){
				time = 30 * 1000;
			//} else if(floor < target_floor*0.9){
			} else {
				time = 1000;
			}
		}
		return time;
	}
})