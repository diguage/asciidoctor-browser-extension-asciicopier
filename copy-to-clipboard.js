// Default parameter: http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
// Copy to clipboard: http://stackoverflow.com/a/12693636/951836
// Copy to clipboard: http://stackoverflow.com/questions/36270886/event-clipboarddata-setdata-in-copy-event
function copyToClipboard(content, mimeType) {
    var mimeType = typeof mimeType !== 'undefined' ?  mimeType : 'text/plain';

    document.oncopy = function(event) {
        event.clipboardData.setData(mimeType, content);
        event.preventDefault();
    };
    document.execCommand("Copy", false, null);
}
