function listenForClicks() {
    document.addEventListener("click", (e) => {
        browser.tabs.create({url: "/popup/fileupload.html"}).then(() => {
            browser.tabs.executeScript({
                code: `console.log('location:', window.location.href);`
            });
        });
    })
}

browser.tabs.executeScript({file: "/index.js"}).then(listenForClicks);

