// Service workers lack a reliable Clipboard API; copy inside the tab (like MV2 document.execCommand).
function copyViaInjectedScript(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    const parent = document.body || document.documentElement;
    parent.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    try {
        document.execCommand('copy');
    } finally {
        parent.removeChild(ta);
    }
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab?.id || !tab.url || tab.title === undefined) {
        return;
    }
    const link = tab.url + '[' + tab.title + '^]';

    chrome.scripting
        .executeScript({
            target: { tabId: tab.id },
            func: copyViaInjectedScript,
            args: [link],
        })
        .catch(() => {
            // Restricted pages (chrome://, Web Store, etc.): no DOM to inject into.
            if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(link).catch(() => {});
            }
        });
});
