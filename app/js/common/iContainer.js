define(function(require, exports, module) {
/* 
 * 帖子容器对象
 * ====================== */
 	var ipost = require('iPost');
 	var ilist = require('iList');

 	function container(id){
 		this.wrapper = $(id);
 		//this.list = this.wrapper.children();
 	};

 	container.prototype.render = function(){
 		this.wrapper.html(ipost.getAll());
 		this._init();
 	};
 	container.prototype._init = function(){	
 		//开始，暂停
 		this.wrapper.on('click', '.play-btn', function(){
 			var btn = $(this);
 			var list = btn.parent().parent().parent();
 			var id = list.attr('id');
 			var className = btn.attr('class');
 			//目前是运行状态，点击后需要暂停
 			if(className.indexOf('stop') == -1){
 				ipost.end(id);
 				//下面应该还有颜色提示
 				list.css('backgroundColor', '#F00');
 				btn.addClass('stop');
 			} else {
 				//开始监听帖子
 				ipost.begin(id);
 				btn.removeClass('stop');
 				list.css('backgroundColor', '#FFF');
 			}
 		})
 		//删除帖子
 		this.wrapper.on('click', '.delete-btn', function(){
 			var btn = $(this);
 			var id = btn.parent().parent().parent().attr('id'); //获取当前帖子的id
 			//在容器中删除帖子，并删除帖子的数据
 			$('#' + id).remove();
 			ipost.delete(id);
 		})

 		//在pop页面里面要打开链接必须用下面的方式
	    this.wrapper.on('click', '.task-item a', function(){
	        chrome.tabs.create({'url': $(this).attr('href')});
	    })

 		return this;
 	};
 	//新建一个帖子对象，post是一个json对象
 	container.prototype.add = function(post){
 		var id = +(new Date());  //利用时间戳来作为id
 		var item = ilist.html(id, post);
      	this.wrapper.append(item);
      	var post = new ipost(post.url, post.title, post.floor, post.distance, post.tabid, post.status);
      	post.add(id);  //添加到数据库，并启动监听
 		return this;
 	};

	module.exports = container;
})