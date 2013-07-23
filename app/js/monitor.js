var Newbbs = Newbbs || {};

//此模块没有采用chrome的存储方式
Newbbs.monitor = (function(storage){
	var monitor_page = function(last_page){
		window.location.reload();
		var page = parseInt(last_page.innerHTML);
		return page;
	};
	this.frequency = 10000;
	setTimeout(monitor_page, frequency);
	return {
		monitor_page : monitor_page
	}
})()