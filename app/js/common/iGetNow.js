define(function(require, exports, module) {
/* 
 * 获取当前最新页的楼层数和页数
 * ====================== */
	exports.getNowFloor = function(){
		return document.querySelector('#reply-count').innerHTML;  //当前的楼层数
	}
	exports.getNowPage = function(){
		var page_obj = document.querySelector('.pages > a:nth-last-child(2)') || document.querySelector('.pages > span:nth-last-child(2)');
		return parseInt(page_obj.innerHTML);
	}
})