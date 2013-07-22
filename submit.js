var Newbbs = Newbbs || {};

//此模块没有采用chrome的存储方式
Newbbs.submit = (function(storage){
	var sub = function(content_area, content, btn_submit){
		content_area.innerHTML = content;
		btn_submit.click();
	};

	return {
		sub : sub
	}
})()