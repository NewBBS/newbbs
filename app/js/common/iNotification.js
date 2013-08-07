define(function(require, exports, module) {
/* iNotification PUBLIC CLASS DEFINITION
 * 调用桌面提示的方法
 * iconURL, title, body
 * ====================== */
	exports.show_normal_Notification = function (obj) {
	    var notification = window.webkitNotifications.createNotification(obj.img, obj.title, obj.content);
        notification.onerror = function() {};
        notification.onclose = function() {};
        notification.onshow = function() {};
        notification.onclick = function() {this.cancel();};
		notification.ondisplay = function() {};
        //notification.replaceId = '消息1';
        notification.show();
	};
	exports.show_html_Notification = function (url) {
	    var notification = window.webkitNotifications.createHTMLNotification(url);
        notification.onerror = function() {};
        notification.onclose = function() {};
        notification.onshow = function() {};
        notification.onclick = function() {this.cancel();};
		notification.ondisplay = function() {};
        //notification.replaceId = '消息1';
        notification.show();
	};
})
