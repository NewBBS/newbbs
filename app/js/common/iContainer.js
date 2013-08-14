define(function(require, exports, module) {
/* 
 * 帖子容器对象
 * ====================== */
 	var $ = require('jquery');
 	console.log($);
 	var ipost = require('iPost');

 	function container(id){
 		this.wrapper = $(id);
 		//this.list = this.wrapper.children();
 	};

 	container.prototype.render = function(){
 		this.wrapper.html(post.getAll());
 		this._init();
 	};
 	container.prototype._init = function(){	
 		//开始，暂停
 		this.wrapper.on('click', '.play-btn', function(){
 			var btn = $(this);
 			var id = '#' + btn.parent().attr('id');
 			var className = btn.attr('class');
 			//目前是运行状态，点击后需要暂停
 			if(className.indexOf('stop') != -1){
 				post.end(id);
 				//下面应该还有颜色提示
 				btn.addClass('stop');
 			} else {
 				//开始监听帖子
 				post.begin(id);
 				btn.removeClass('stop');
 			}
 		})
 		//删除帖子
 		this.wrapper.on('click', '.delete-btn', function(){
 			var btn = $(this);
 			var id = '#' + btn.parent().attr('id'); //获取当前帖子的id
 			//在容器中删除帖子，并删除帖子的数据
 			$(id).remove();
 			post.delete(id);
 		})

 		//在pop页面里面要打开链接必须用下面的方式
	    this.wrapper.on('click', '.task-item a', function(){
	        chrome.tabs.create({'url': $(this).attr('href')});
	    })

 		return this;
 	};
 	//post是一个json对象
 	container.prototype.add = function(post){
 		var id = +(new Date());
 		var item = '<div class="task-item" id="' + id + '"><a href="' + post.url +'"><h4 class="item-title">'+ post.title +'</h4></a><div class="edit-btn"><i class="icon-pencil"></i></div><div class="item-bar"><ul class="item-menu"><li class="set-btn" title=""><i class="icon-play"></i></li><li class="set-btn"><i class="icon-star"></i></li><li class="set-btn"><i class="icon-trashcan"></i></li></ul></div></div>';
      	this.wrapper.append(item);
      	var post = new ipost(post.url, post.title, post.floor, post.tabid);
      	post.add(id);
 		return this;
 	};

	module.exports = container;
})