browser.browserAction.onClicked.addListener(e => {
    browser.tabs.create({url: "/fileupload/fileupload.html"}).then(() => {
        browser.tabs.executeScript({
            code: `console.log('location:', window.location.href);`
        });
    });
});

browser.tabs.onActivated.addListener(e => {
    browser.tabs.get(e.tabId, (tabInfo) => {
        if (tabInfo.url.startsWith('https://translate.google.com')) {
            console.log('google translate tab', tabInfo)
        }
    });
})
