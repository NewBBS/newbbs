define(function(require) {
  require('iPage');
  require('iTab');

  var iContainer = require('iContainer');
  var iFrequency = require('iFrequency');
  var container = new iContainer('#task-list');
  

  $(function () {
    /* newbbsPage */
    $('#newbbsPage').ipage();

    /* newbbsTab */
    $('#newbbsTab').tab();

    container.render();

	  //点击添加监控后获取当前标签页的url和标题
    document.querySelector('.icon-plus').addEventListener('click', function() {
      chrome.tabs.getSelected(null,function(thisTab){
              $('#tie-url').val(thisTab.url);
              $('#tie-tabid').val(thisTab.id);
              $('#tie-title').val(thisTab.title.substring(8));
      });       
    });

    //点击完成新增一个监控帖子的记录
    document.querySelector('#submit-addForm').addEventListener('click', function() {
    	container.add({
          url: $('#tie-url').val(),
          title: $('#tie-title').val(),
          floor: $('#tie-floor').val(),
          tabid: parseInt($('#tie-tabid').val()),
          status: 1
      })
      //返回主页面并将新增的数据添加到主页面
      $('.icon-undo').trigger('click');
    });
  });

});