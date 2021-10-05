browser.tabs.onActivated.addListener(e => {
    browser.tabs.get(e.tabId, (tabInfo) => {
        if (tabInfo.url.startsWith('https://translate.google.com')) {
            console.log('google translate tab', tabInfo)
        }
    });
})
