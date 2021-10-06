document.addEventListener("click", (e) => {
    switch (e.target.id) {
        case 'add_book': {
            browser.tabs.create({url: "/fileupload/fileupload.html"}).then(() => {
                browser.tabs.executeScript({
                    code: `console.log('location:', window.location.href);`
                });
            });
            break
        }
        case 'open_google': {
            browser.tabs.create({url: "https://translate.google.com"})
            break
        }
        case 'open_yandex': {
            browser.tabs.create({url: "https://translate.yandex.uz"})
            break
        }
    }
})