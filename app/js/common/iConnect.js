//保持和后台的通信连接，获取当前最新的页码数
define(function(require, exports, module) {
/* 
 * 建立和后台保持长连接
 * ====================== */
 	function Connect(name){
 		this.port = chrome.extension.connect({name: name});
 	}
 	Connect.prototype.post(msg){
 		this.port.postMessage(msg);
 	}
 	Connect.prototype.onPost(fn){  //fn的参数是msg
 		this.port.onMessage.addListener(fn);
 	}
	module.exports = Connect;
})