define(function(require) {

  require('iPage.js');
  require('iTab.js');
  var notification = require('iNotification.js');

  $(function () {
    /* newbbsPage */
    $('#newbbsPage').ipage();

    /* newbbsTab */
    $('#newbbsTab').tab();

    var obj = {img : 'a.jpg', title : '弹出', content : '你好'}
    notification.show_normal_Notification(obj);
    //notification.show_html_Notification('http://www.baidu.com/');


	// var opt = {
	//   type: "list",
	//   title: "主要标题",
	//   message: "要显示的主要消息",
	//   iconUrl: "jp-logo.png",
	//   items: [{ title: "Item1", message: "这是项目一。"},
	//           { title: "Item2", message: "这是项目二。"},
	//           { title: "Item3", message: "这是项目三。"}]
	// }
 //    chrome.notifications.create('1', opt, function(){});
  });

});