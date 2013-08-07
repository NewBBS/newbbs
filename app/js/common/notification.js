define(function(require, exports, module) {
/* iNotification PUBLIC CLASS DEFINITION
 * 调用桌面提示的方法
 * ====================== */
	exports = function (obj) {
	    var myNotifications = window.webkitNotifications;
	    if(myNotifications.checkPermission() === 1) {
	        myNotifications.requestPermission();
	    } else if (myNotifications.checkPermission() === 0) {
	        var notification = myNotifications.createNotification(obj.img, obj.title, obj.content);
	        notification.onerror = function() {};
	        notification.onclose = function() {};
	        notification.onclick = function() {this.cancel();};
			notification.ondisplay = function() {};
	        //notification.replaceId = '消息1';
	        notification.show();
	    } else {
	        //貌似如果用户拒绝了无法在从新请求
	        //myNotifications.requestPermission(popNotifications);
	        
	    }
	};
})
