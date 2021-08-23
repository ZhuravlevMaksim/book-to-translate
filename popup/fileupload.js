const area = document.getElementById('area');

document.getElementById("input").addEventListener("change", async function (e) {

    const book = ePub(this.files[0]);

    const splitBook = []
    const spine = await book.loaded.spine;

    for (let item of spine.spineItems) {
        const content = await item.load(book.load.bind(book))
        const splitText = content.textContent.split(/(?!.”)(?<!Mr|Mrs|[\.\.])\./g)
        splitText.forEach((raw) => {
            const text = raw.replaceAll('\n', ' ')
            splitBook.push(text)
        })
    }

    console.log(splitBook)

    splitBook.forEach(e => {
        area.appendChild(document.createTextNode(e))
        area.appendChild(document.createElement('br'))
    })

}, false);

clearAll()
initialize()

function initialize() {
    var gettingAllStorageItems = browser.storage.local.get(null);
    gettingAllStorageItems.then((results) => {
        console.log(results)
    }, e => console.error(e));
}

function store(id, body) {
    browser.storage.local.set({[id]: body});
}

function clearAll() {
    browser.storage.local.clear();
}
