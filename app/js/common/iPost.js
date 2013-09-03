define(function(require, exports, module) {
/*
 * 帖子对象
 * ====================== */
 	var storage = require('iStorage');
 	var ilist = require('iList');
 	var bg = chrome.extension.getBackgroundPage();

 	function Post(url, title, floor, distance, tabid, status){
 		this.url  = url || '';
 		this.title = title || '';
 		this.floor = floor || '';
 		this.distance = distance || '';
 		this.tabid = tabid || '';
 		this.status = status || '';
 	};
 	Post.prototype.add = function(id){
 		storage.set(id, this);
 		chrome.tabs.executeScript(this.tabid, {file: "js/common/inject.js"});
 		//bg.recycle(this.tabid, this.url);
 	};
 	Post.begin = function(id){
 		var tie = storage.get(id);
 		if(tie.tabid) {
 			tie.status = 1;
 			storage.set(id, tie);
 			storage.set(tie.url, 0);
 			chrome.tabs.executeScript(tie.tabid, {file: "js/common/inject.js"});
 		} else {
 			chrome.tabs.create({url: tie.url}, function(tab){
 				tie.tabid = tab.id;
 				tie.status = 1;
 				storage.set(id, tie);
 				storage.set(tie.url, 0);
 				chrome.tabs.executeScript(tab.id, {file: "js/common/inject.js"});
 			})
 		}	
 		//bg.recycle(tie.tabid, tie.url);
 	};
 	Post.end = function(id){
 		var tie = storage.get(id);
 		tie.status = 0;
 		storage.set(id, tie);
 		var tid = storage.get(tie.url);
 		bg.stop(tid);
 	};
 	Post.delete = function(id){
 		var tie = storage.get(id);
 		Post.end(id); //如果在运行需要暂停时间函数
 		storage.remove(tie.url);
 		storage.remove(storage.getKeyByValue(['url', tie.url]));
 	}
 	//获取数据库中所有的帖子数据
 	Post.getAll = function(){
 		var keys = storage.getAllKey();
 		var html = '';
	    for(var i=0, len=keys.length;i<len; i++ ){
	      if(!isNaN(keys[i])) {  //key为数字才是需要的帖子数据
	        var post = storage.get(keys[i]);
	        html += ilist.html(keys[i], post); //从模板里面取回html
	      }
	    }
	    return html;
 	};
 	//检查当前监测的帖子是否已经被关闭，如果已经关闭就重新打开，是通过tabid的值来控制
 	Post.openCloseWin = function(key){
 		  var tie = storage.get(key);
	      if(!tie.tabid) {
	        chrome.tabs.create({url: tie.url}, function(tab){
	          tie.tabid = tab.id;
	          storage.set(id, tie);
	          storage.set(tie.url, 0);
	          chrome.tabs.executeScript(tab.id, {file: "js/common/inject.js"});
	        })
	      }
 	}
	module.exports = Post;
})