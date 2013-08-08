function injectPage(){
	chrome.tabs.update(post.tabid, {}, function(tab){
		chrome.tabs.executeScript(tab.id, {file: "js/common/inject.js"});
	}); 
}

setInterval(injectPage, 1000);