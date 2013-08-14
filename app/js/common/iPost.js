define(function(require, exports, module) {
/* 
 * 帖子对象
 * ====================== */
 	var storage = require('iStorage');
 	var bg = chrome.extension.getBackgroundPage();

 	function Post(url, title, floor, tabid, container){
 		this.url  = url || '';
 		this.title = title || '';
 		this.floor = floor || '';
 		this.tabid = tabid || '';
 	};
 	Post.prototype.setUrl = function(url){
 		this.url = url;
 	};
 	Post.prototype.setTitle = function(title){
 		this.title = title;
 	};
 	Post.prototype.setFloor = function(floor){
 		this.floor = floor;
 	};
 	Post.prototype.setFloor = function(floor){
 		this.floor = floor;
 	};
 	Post.prototype.add = function(id){
 		storage.set(id, this);
 		//bg.recycle(this.tabid, this.url); 
 		console.log('ok')
 	};
 	Post.prototype.begin = function(id){
 		var tie = storage.get(id);
 		bg.recycle(tie.tabid, tie.url);
 	};
 	Post.prototype.end = function(id){
 		var tie = storage.get(id);
 		var tid = storage.get(tie.url);
 		bg.stop(tid);
 	};
 	Post.prototype.delete = function(id){
 		var tie = storage.get(id);
 		this.end(id); //如果在运行需要暂停时间函数
 		storage.remove(tie.url);
 		console.log(storage.getKeyByValue(['url', tie.url]));
 		storage.remove(storage.getKeyByValue(['url', tie.url]));
 	}
 	Post.prototype.getAll = function(){
 		var keys = storage.getAllKey();
 		var html = '';
	    for(var i=0, len=keys.length;i<len; i++ ){
	      if(!isNaN(keys[i])) {  //key为数字才是需要的帖子数据
	        var value = storage.get(keys[i]);
	        var item = '<div class="task-item"><a href="' + value.url +'"><h4 class="item-title">'+ value.title +'</h4></a></div>';
	        html += item;
	      }
	    }
	    return html;
 	};
	module.exports = Post;
})