//注入到页面的js代码

console.log('a')
// var port = chrome.extension.connect({name: "send"});
// //后面一个是在帖子的最后一页的时候，倒数第二个元素是span，所以要处理
// var page_obj = document.querySelector('.pages > a:nth-last-child(2)') || document.querySelector('.pages > span:nth-last-child(2)');
// var page = parseInt(page_obj.innerHTML);

// var floor = parseInt(document.querySelector('#reply-count').innerHTML);
// port.postMessage({'page': page, 'floor': floor});