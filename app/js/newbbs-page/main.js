define(function(require) {

  require('iPage.js');
  require('iTab.js');

  $(function () {
    /* newbbsPage */
    $('#newbbsPage').ipage();

    /* newbbsTab */
    $('#newbbsTab').tab();

    $('#getPostBtn').on('click', function () {
      console.log('14')
      chrome.tabs.executeScript(null, {file: "loadPost.js"});
      // chrome.tabs.executeScript(null, {code: "alert('16')"});
    });

  });

});