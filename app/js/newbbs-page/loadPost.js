console.log('join success')
var siteUrl = location.origin
  , postTitle
  , msgExt = chrome.extension.connect({name: "postPage"})

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    switch(msg.action){
      case 'getPostList':
        postTitle = getPostTitle()
        console.log(postTitle)
        msgExt.postMessage({action: 'getPostList', data: postTitle});
        break;
      case 'getPost':
        
      default:
        break;
    }
  });
});


function getPostTitle() {
  var targetAry = []
    , tbody = document.querySelectorAll('.mainbox tbody')
  for (var i = 0; i < tbody.length; i++) {
    var postItem = {}
    if(tbody[i].id.indexOf('normalthread') != -1){
      var curA = tbody[i].querySelector('.tsubject a');
      postItem.title = curA.innerText;
      postItem.url = curA.href;
      targetAry.push(postItem);
    }
  }
  return targetAry;
}