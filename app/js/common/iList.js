define(function(require, exports, module) {
/* 
 * 每一列帖子的html模板
 * ====================== */
 	// id: 数据库里面存的key值
 	// post：帖子的对象
 	exports.html = function(id, post){
 		var playBtnStatus = ''
      	  , itemStatus = ''
 		if(!post.status){
	      playBtnStatus = ' stop';
	    }else{
	      itemStatus = ' task-run'
	    }
	 		return '<div class="task-item'+itemStatus+'" id="' + id + '"><a href="' + post.url +'"><h4 class="item-title">'+ post.title +'</h4></a><div class="edit-btn"><i class="icon-pencil"></i></div><div class="item-bar"><ul class="item-menu"><li class="set-btn play-btn' + playBtnStatus + '" title=""><i class="icon-play"></i></li><li class="set-btn star-btn"><i class="icon-star"></i></li><li class="set-btn delete-btn"><i class="icon-trashcan"></i></li></ul></div></div>';
	 	}
})