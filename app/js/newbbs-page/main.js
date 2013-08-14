define(function(require) {
  require('iPage.js');
  require('iTab.js');
  var storage = require('iStorage.js');
  // var iConnect = require('iConnect.js');
  // var connect = new iConnect('send');

  var iContainer = require('iContainer.js');
  var iFrequency = require('iFrequency.js');
  var bg = chrome.extension.getBackgroundPage();  //获取后台页面的window属性
  var container = new iContainer('#task-list');
  

  $(function () {
    /* newbbsPage */
    $('#newbbsPage').ipage();

    /* newbbsTab */
    $('#newbbsTab').tab();

    //页面初始化函数，从数据库获取帖子数
    // var keys = storage.getAllKey();
    // for(var i=0, len=keys.length;i<len; i++ ){
    //   if(!isNaN(keys[i])) {  //key为数字才是需要的帖子数据
    //     var value = storage.get(keys[i]);
    //     var item = '<div class="task-item"><a href="' + value.url +'"><h4 class="item-title">'+ value.title +'</h4></a></div>';
    //     $('.task-list').append(item);
    //   }
    // }
    container.render();


    // $('.task-list').on('click', '.task-item', function(tar1){
    //   if(tar1.target.id == ''){
        
    //   }
    // })

	  //点击添加监控后获取当前标签页的url和标题
    document.querySelector('.icon-plus').addEventListener('click', function() {
      chrome.tabs.getSelected(null,function(thisTab){
              $('#tie-url').val(thisTab.url);
              $('#tie-tabid').val(thisTab.id);
              $('#tie-title').val(thisTab.title.substring(8));
      });       
    });

    //在pop页面取消和开始对网页的监控
    // document.querySelector('#clearInterval').addEventListener('click', function() {
    //   var tid;
    //   var url
    //   tid = storage.get('http://bbs.oa.com/forum/7935/thread/view/235015');   
    //   bg.stop(tid);     
    // });

    //新增一个监控帖子的记录
    document.querySelector('#submit-addForm').addEventListener('click', function() {
    	container.add({
          url: $('#tie-url').val(),
          title: $('#tie-title').val(),
          floor: $('#tie-floor').val(),
          tabid: parseInt($('#tie-tabid').val())
      })

      //返回主页面并将新增的数据添加到主页面
      $('.icon-undo').trigger('click');

      //在后台将js注入到bbs页面
      //bg.recycle(post.tabid, post.url);   
    });

    //在pop页面里面要打开链接必须用下面的方式
    $('.task-list').on('click', '.task-item a', function(){
        chrome.tabs.create({'url': $(this).attr('href')});
    })

	//var bg = chrome.extension.getBackgroundPage();   //调用背景的函数库
	//chrome.extension.getViews(); 获取前台的页面的window 
  });

});