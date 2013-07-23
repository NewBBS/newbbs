var Newbbs = Newbbs || {};


Newbbs.tips = (function(notification){
	var notification_text = function(title, content){
		var noti = notification.createNotification('http://file11.mafengwo.net/M00/2F/E0/wKgBpU6nZwnCvONzAABVYpTfd6838.jpeg', title, content);
	        noti.onerror = function() {};
	        noti.onclose = function() {};
	        noti.onclick = function() {this.cancel();};
			noti.ondisplay = function() {};
	        //notification.replaceId = '消息1';
	        noti.show();
	};
	
	return {
		set : pop
	}
})(window.webkitNotifications)
