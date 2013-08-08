define(function(require) {

  require('iPage.js');
  require('iTab.js');
  var storage = require('iStorage.js');
  var notification = require('iNotification.js');

  $(function () {
    /* newbbsPage */
    $('#newbbsPage').ipage();

    /* newbbsTab */
    $('#newbbsTab').tab();

    // var obj = {img : 'a.jpg', title : '弹出', content : '你好'}
    // notification.show_normal_Notification(obj);

    // document.querySelector('.item-title').addEventListener('click', function() {
    //   chrome.tabs.executeScript(null,{file: "js/common/inject.js"});
    // });

    document.querySelector('.icon-plus').addEventListener('click', function() {
      chrome.tabs.getSelected(null,function(thisTab){
              $('#tie-url').val(thisTab.url);
              $('#tie-title').val(thisTab.title.substring(8));
      });        
    });
    //storage.clear();
    document.querySelector('#submit-addForm').addEventListener('click', function() {
      var num;
      if(storage.get('num')){
        num = storage.get('num') + 1;
      } else {
        num = 1;
      }
        storage.set('url'+num, $('#tie-url').val());
        storage.set('title'+num, $('#tie-title').val());
        storage.set('floor'+num, $('#tie-floor').val());
        storage.set('num', num);
        $('.icon-undo').trigger('click');
        var item = '<div class="task-item"><a href="' + $('#tie-url').val() +'"><h4 class="item-title">'+ $('#tie-title').val() +'</h4></a></div>';
        $('.task-list').append(item)
    });

    //在pop页面里面要打开链接必须用下面的方式
    $('.task-list').on('click', '.task-item a', function(){
        chrome.tabs.create({'url': $(this).attr('href')});
    })
    
    for(var i=0, num=storage.get('num');i<num; i++ ){
      var item = '<div class="task-item"><a href="' + storage.get('url'+(i+1)) +'"><h4 class="item-title">'+ storage.get('title'+(i+1)) +'</h4></a></div>';
      $('.task-list').append(item);
    }
    // chrome.tabs.update(null, {url: 'http://bbs.oa.com/forum/7939/thread/view/234702?page=96'}, function(tab){
    //   console.log(tab)
    // })

  });

});