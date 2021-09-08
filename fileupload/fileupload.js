document.getElementById("input").addEventListener("change", async function (e) {

    const book = ePub(this.files[0]);

    const splitBook = []
    const spine = await book.loaded.spine;

    for (let item of spine.spineItems) {
        const content = await item.load(book.load.bind(book))
        const splitText = content.textContent
            .replaceAll('\n', '')
            .split(/(?<!Mr|Mrs| )(?!’)\./g)
        splitText.forEach((raw) => {
            const text = raw
                // .replaceAll('\n', '')
                // .replaceAll(/[‘’]/g, "'")
            if (text.length > 1) {
                splitBook.push(text.trim() + '.')
            }
        })
    }

    browser.storage.local.clear();
    browser.storage.local.set({[this.files[0].name]: splitBook});

    alert('done')

}, false);

function get(id) {
    return browser.storage.local.get(id);
}

function clearAll() {
    browser.storage.local.clear();
}