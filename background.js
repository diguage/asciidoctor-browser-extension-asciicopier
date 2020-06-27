// Follow: https://developer.chrome.com/extensions/examples/api/browserAction/make_page_red/background.js
chrome.browserAction.onClicked.addListener(function(tab) {
    var link = tab.url + '[' + tab.title + '^]';
    console.log(link);
    copyToClipboard(link);
})
