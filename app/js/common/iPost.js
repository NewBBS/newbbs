define(function(require, exports, module) {
/* 
 * 帖子对象
 * ====================== */
 	function Post(url, title, floor, tabid){
 		this.url  = url || '';
 		this.title = title || '';
 		this.floor = floor || '';
 		this.tabid = tabid || '';
 	}
 	Post.prototype.setUrl = function(url){
 		this.url = url;
 	}
 	Post.prototype.setTitle = function(title){
 		this.title = title;
 	}
 	Post.prototype.setFloor = function(floor){
 		this.floor = floor;
 	}
	module.exports = Post;
})