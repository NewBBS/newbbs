define(function(require, exports, module) {
/* 
 * 后台运行的代码
 * ====================== */	
 	var storage = require('iStorage.js');
 	var notification = require('iNotification.js');
 	//刷新页面并向新页面注入代码
	function injectPage(tabid, url){
		chrome.tabs.update(tabid, {url: url}, function(tab){
			chrome.tabs.executeScript(tab.id, {file: "js/common/inject.js"});
		}); 
	}

	//storage.clear();
	//每隔一段时间执行注入代码，这样把函数变成全局的就能够在前台调用了
	recycle = function(tabid, url){
		var tid;
		tid = setInterval(function(){
			injectPage(tabid, url)
		}, 1000);
		window.localStorage.setItem(url, tid);
	}

	//停止自动刷新注入
	stop = function(tid){
		clearInterval(tid);
	}

	//跟注入的页面进行通讯
	chrome.extension.onConnect.addListener(function(port) {
      port.onMessage.addListener(function(msg) {
        var key = storage.getKeyByValue(['url', port.sender.url])
        var target_floor = storage.get(key).floor;  //获取用户输入的目标楼层
        var u_distance = 1;   //用户输入的在目标帖子的误差范围
        num = 2*u_distance;
        var m_distance = u_distance + 1;
	    if(msg.floor > target_floor-m_distance && msg.floor < target_floor+m_distance) {
	     	//停止刷新，开始提交
	     	clearInterval(storage.get(port.sender.url));
	     	chrome.tabs.onUpdated.addListener(submit);  //监听注入页面的刷新事件
	     	chrome.tabs.update(port.sender.tab.id, {url: 'http://bbs.oa.com/forum/7935/thread/view/235015'});
	     	//chrome.tabs.executeScript(port.sender.tab.id, {file: "js/common/submit.js"});
	    }
      })
    })

	//在注入页面的刷新之后再注入提交代码
    function submit(id){
    	// if(!(--num)){
    	// 	chrome.tabs.onUpdated.removeListener(submit);  //取消更新监听事件，当发帖数达到的时候
    	// 	var obj = {img : 'a.jpg', title : '弹出', content : '你好'}
    	// 	notification.show_normal_Notification(obj);
    	// }
    	chrome.tabs.update(id, {url: 'http://bbs.oa.com/forum/7935/thread/view/235015'}); 
 		//chrome.tabs.executeScript(id, {file: "js/common/submit.js"});
 	}

// var views = chrome.extension.getViews({type:"popup"});  获取不到前台的数据
// alert(views)

})