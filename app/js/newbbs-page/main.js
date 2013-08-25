define(function(require) {
  require('iPage');
  require('iTab');

  var iContainer = require('iContainer');
  var iFrequency = require('iFrequency');
  var container = new iContainer('#task-list');
  

  $(function () {
    //$('body').hide().show(10);//兼容Chrome29渲染bug
    /* newbbsPage */
    $('#newbbsPage').ipage();

    /* newbbsTab */
    $('#newbbsTab').tab();

   //  container.render();

	  // //点击添加监控后获取当前标签页的url和标题
   //  document.querySelector('.icon-plus').addEventListener('click', function() {
   //    chrome.tabs.getSelected(null,function(thisTab){
   //            $('#tie-url').val(thisTab.url);
   //            $('#tie-tabid').val(thisTab.id);
   //            $('#tie-title').val(thisTab.title.substring(8));
   //    });
   //  });

   //  //点击完成新增一个监控帖子的记录
   //  document.querySelector('#submit-addForm').addEventListener('click', function() {
   //  	container.add({
   //        url: $('#tie-url').val(),
   //        title: $('#tie-title').val(),
   //        floor: $('#tie-floor').val(),
   //        tabid: parseInt($('#tie-tabid').val()),
   //        status: 1
   //    })
   //    //返回主页面并将新增的数据添加到主页面
   //    $('.icon-undo').trigger('click');
   //  });

    //reader
    chrome.tabs.executeScript(null, {file: "./js/newbbs-page/loadPost.js"});

    //建立与页面content script的通讯接口
    var pageExt
    chrome.tabs.getSelected(null, function(tab) {
      //console.log(tab.id)
      pageExt = chrome.tabs.connect(tab.id, {name: 'postPage'});
    });

    chrome.extension.onConnect.addListener(function(port) {
      //console.assert(port.action == "loadPost");
      port.onMessage.addListener(function(msg) {
        if (msg.action == "getPostList"){
          //console.log('msg good')
          var itemsHtml = '';
          for(var curItem = 0; curItem < 10; curItem++){
            console.log(curItem)
            itemsHtml += '<div class="task-item"><a href="'+msg.data[curItem].url+'"><h4 class="item-title">' +msg.data[curItem].title+ '</h4></a></div>'
          }
          //console.log(itemsHtml)
          $('#tab-reader .luckyBox-main .task-list').html(itemsHtml);
        }
      });
    });

    $('#getPostBtn').on('click', function () {
      pageExt.postMessage({action: 'getPostList'});
    });

    $('#tab-reader .luckyBox-main').on('click', '.task-item > a', function () {
      var curPostUrl = $(this).attr('href');
      chrome.tabs.create({url}, function callback)
      pageExt.postMessage({action: 'getPost', posturl: curPostUrl});
    });

  });//end jQuery
});