define(function(require) {

  require('iPage.js');
  require('iTab.js');
  var storage = require('iStorage.js');
  var notification = require('iNotification.js');
  // var iConnect = require('iConnect.js');
  // var connect = new iConnect('send');

  var iPost = require('iPost.js');
  var iFrequency = require('iFrequency.js');
  var post;
  

  $(function () {
    /* newbbsPage */
    $('#newbbsPage').ipage();

    /* newbbsTab */
    $('#newbbsTab').tab();

    // var obj = {img : 'a.jpg', title : '弹出', content : '你好'}
    // notification.show_normal_Notification(obj);

    // document.querySelector('.icon-plus').addEventListener('click', function() {
    //   chrome.tabs.executeScript(null,{file: "js/common/inject.js"});
    // });


	//获取当前标签页的url和标题
    document.querySelector('.icon-plus').addEventListener('click', function() {
      chrome.tabs.getSelected(null,function(thisTab){
              $('#tie-url').val(thisTab.url);
              $('#tie-tabid').val(thisTab.id);
              $('#tie-title').val(thisTab.title.substring(8));
      });        
    });
    storage.clear();

    //新增一个监控帖子的记录
    document.querySelector('#submit-addForm').addEventListener('click', function() {
    	post = new iPost($('#tie-url').val(), $('#tie-title').val(), $('#tie-floor').val(), parseInt($('#tie-tabid').val()));
    	//将数据存到本地
        //storage.set(+(new Date()), {'url': $('#tie-url').val(), 'title': $('#tie-title').val(), 'floor': $('#tie-floor').val()});
        storage.set(+(new Date()), post);
        //返回主页面并将新增的数据添加到主页面
        $('.icon-undo').trigger('click');
        var item = '<div class="task-item"><a href="' + post.url +'"><h4 class="item-title">'+ post.title +'</h4></a></div>';
        $('.task-list').append(item);
        //将js注入到bbs页面
        chrome.tabs.executeScript(post.tabid, {file: "js/common/inject.js"});
        //iFrequency.frequency(injectPage);
        
    });

    //在pop页面里面要打开链接必须用下面的方式
    $('.task-list').on('click', '.task-item a', function(){
        chrome.tabs.create({'url': $(this).attr('href')});
    })
    
    //页面初始化函数，从数据库获取帖子数
	var keys = storage.getAllKey();
    for(var i=0, len=keys.length;i<len; i++ ){
      var value = storage.get(keys[i]);
      var item = '<div class="task-item"><a href="' + value.url +'"><h4 class="item-title">'+ value.title +'</h4></a></div>';
      $('.task-list').append(item);
    }
    

    // connect.onPost(function(msg){
    //   console.log(msg.floor);
    //   console.log(msg.page);
    // })


    chrome.extension.onConnect.addListener(function(port) {
      port.onMessage.addListener(function(msg) {
        console.log(msg)
      })
    })

    // chrome.tabs.update(null, {url: 'http://bbs.oa.com/forum/7939/thread/view/234702?page=96'}, function(tab){
    //   console.log(tab)
    // })

	//var bg = chrome.extension.getBackgroundPage();   //调用背景的函数库
	//chrome.extension.getViews(); 获取前台的页面的window 

	
	

  });

});