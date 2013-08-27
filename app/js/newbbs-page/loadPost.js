console.log('join success')
var siteUrl = location.origin
  , msgExt = chrome.extension.connect({name: "postPage"})

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    switch(msg.action){
      case 'getPostList':
        var postTitle = getPostTitle()
        console.log(postTitle)
        msgExt.postMessage({action: 'getPostList', data: postTitle});
        break;
      case 'getPost':
        window.onload = function () {
          var postContent = getPost();
          msgExt.postMessage({action: 'getPost', data: postContent});
        }
        break;
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

function getPost(filter) {
  var jqFilter = filter || '.postmessage .t_msgfont span'
    , targetHtml = document.querySelector(jqFilter)

  return targetHtml;
}