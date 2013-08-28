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
 		tie.status = 1;
 		storage.set(id, tie);
 		bg.recycle(tie.tabid, tie.url);
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
	module.exports = Post;
})