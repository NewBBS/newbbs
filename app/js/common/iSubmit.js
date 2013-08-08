define(function(require, exports, module) {
/* 
 * 发表帖子 
 * ====================== */
	exports.submit = function(content){
		//将输入框里面注入内容
		document.querySelector("iframe")[0].contentDocument.document.querySelector("div")[0].innerHTML = content;
		//点击发表回复按钮
		document.querySelector('#submit_button').click();
	}
})