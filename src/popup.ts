import * as $ from 'jquery';

class Data {
  constructor(public content: any, public mimeType = 'text/plain') {
  }

  // Default parameter: http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
  // Copy to clipboard: http://stackoverflow.com/a/12693636/951836
  // Copy to clipboard: http://stackoverflow.com/questions/36270886/event-clipboarddata-setdata-in-copy-event
  copyToClipboard() {
    const mimeType = this.mimeType;
    const content = this.content;
    document.oncopy = function (event) {
      event.clipboardData.setData(mimeType, content);
      event.preventDefault();
    };
    document.execCommand("Copy", false, null);
  }
}

// Default parameter: http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
// Copy to clipboard: http://stackoverflow.com/a/12693636/951836
// Copy to clipboard: http://stackoverflow.com/questions/36270886/event-clipboarddata-setdata-in-copy-event
function copyToClipboard(content: any, mimeType = 'text/plain') {
  document.oncopy = function (event) {
    event.clipboardData.setData(mimeType, content);
    event.preventDefault();
  };
  document.execCommand("Copy", false, null);
}

function cleanBadge() {
  setInterval(function () {
    chrome.browserAction.setBadgeText({text: ''});
  }, 5 * 1000);
}

$(function () {
  $('#currentTabLink').on("click", function () {
    chrome.browserAction.setBadgeText({text: '1'});

    chrome.browserAction.onClicked.addListener(function (tab) {

      chrome.browserAction.setBadgeText({text: '2'});

      var link = tab.url + '[' + tab.title + ']';
      copyToClipboard(link);
    });

    cleanBadge();

    // window.close();
  });


  // chrome.browserAction.setBadgeText({text: count.toString()});
  //
  // $('#countUp').click(() => {
  //   chrome.browserAction.setBadgeText({text: (++count).toString()});
  // });
  //
  // $('#changeBackground').click(() => {
  //   const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  //   chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {
  //         color: color
  //       },
  //       function (msg) {
  //         console.log("result message:", msg);
  //       });
  //   });
  // });
});
