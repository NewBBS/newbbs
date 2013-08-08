define(function(require) {

  require('iPage.js');
  require('iTab.js');
  var storage = require('iStorage.js');
  var notification = require('iNotification.js');
  // var iConnect = require('iConnect.js');
  // var connect = new iConnect('send');

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

    document.querySelector('.icon-plus').addEventListener('click', function() {
      chrome.tabs.getSelected(null,function(thisTab){
              $('#tie-url').val(thisTab.url);
              $('#tie-title').val(thisTab.title.substring(8));
      });        
    });
    storage.clear();
    document.querySelector('#submit-addForm').addEventListener('click', function() {
        storage.set(+(new Date()), {'url': $('#tie-url').val(), 'title': $('#tie-title').val(), 'floor': $('#tie-floor').val()});
        $('.icon-undo').trigger('click');
        var item = '<div class="task-item"><a href="' + $('#tie-url').val() +'"><h4 class="item-title">'+ $('#tie-title').val() +'</h4></a></div>';
        $('.task-list').append(item);

        chrome.tabs.executeScript(null,{file: "js/common/inject.js"});
    });

    // storage.set('obj1', {'url': '1.html', 'title': 'aaa'});
    // console.log(storage.get('obj1'))
    //在pop页面里面要打开链接必须用下面的方式
    $('.task-list').on('click', '.task-item a', function(){
        chrome.tabs.create({'url': $(this).attr('href')});
    })
    
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

  });

});