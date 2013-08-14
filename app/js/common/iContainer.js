define(function(require, exports, module) {
/* 
 * 帖子容器对象
 * ====================== */
 	var $ = require('jquery');
 	console.log($);
 	var ipost = require('iPost.js');

 	function container(id){
 		this.container = $(id);
 		this.list = this.container.children();
 	};

 	container.prototype.render = function(){
 		this.container.html(post.getAll());
 		this._init();
 	};
 	container.prototype._init = function(){	
 		//开始，暂停
 		this.container.on('click', '.btn-bd', function(){
 			var btn = $(this);
 			var id = '#' + btn.parent().attr('id');
 			var class = btn.attr(class);
 			//目前是运行状态，点击后需要暂停
 			if(class == 'begin'){
 				post.end(id);
 				//下面应该还有颜色提示
 				btn.attr('class', 'stop');
 			} else {
 				//开始监听帖子
 				post.begin(id);
 				btn.attr('class', 'begin');
 			}
 		})
 		//删除帖子
 		this.container.on('click', '.btn-del', function(){
 			var btn = $(this);
 			var id = '#' + btn.parent().attr('id'); //获取当前帖子的id
 			//在容器中删除帖子，并删除帖子的数据
 			$(id).remove();
 			post.delete(id);
 		})

 		return this;
 	};
 	//post是一个json对象
 	container.prototype.add = function(post){
 		var id = +(new Date());
 		var item = '<div class="task-item" id="' + id + '"><a href="' + post.url +'"><h4 class="item-title">'+ post.title +'</h4></a></div>';
      	this.container.append(item);
      	var post = new ipost(post.url, post.title, post.floor, post.tabid);
      	post.add(id);
 		return this;
 	};
	module.exports = container;
})