function listenForClicks() {
    document.addEventListener("click", (e) => {
        console.log(e)
    })
}

browser.tabs.executeScript({file: "/index.js"}).then(listenForClicks);

browser.tabs.create({url: "/popup/fileupload.html"}).then(() => {
    browser.tabs.executeScript({
        code: `console.log('location:', window.location.href);`
    });
});
