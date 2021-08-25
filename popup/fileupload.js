const area = document.getElementById('area');
const pageNumber = document.getElementById('page-number');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let active = null
let bookText = []

const books = browser.storage.local.get(null);
books.then((results) => {
    console.log('books', results)
    Object.keys(results).forEach((e, i) => {
        bookText = results[e]
        area.appendChild(document.createTextNode(e))
        area.appendChild(document.createElement('br'))
    })
}, e => console.error(e));

browser.tabs.query({currentWindow: true}).then((tabs) => {
    for (var tab of tabs) {
        if (tab.active) {
            active = tab
            console.log('active', tab)
        }
    }
})

function openTranslateTab(id) {
    browser.tabs.create({url: `https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${encodeURI(bookText[id])}&op=translate`});
}

const state = new Proxy({page: 0}, {
    set: function (target, key, value) {
        target[key] = value
        pageNumber.value = value
        openTranslateTab(value)
        return true;
    }
})

pageNumber.addEventListener('change', e => {
    state.page = parseInt(e.target.value, 10)
})
prev.addEventListener('click', e => console.log(bookText[--state.page]))
next.addEventListener('click', e => console.log(bookText[++state.page]))

document.getElementById("input").addEventListener("change", async function (e) {

    const book = ePub(this.files[0]);

    const splitBook = []
    const spine = await book.loaded.spine;

    for (let item of spine.spineItems) {
        const content = await item.load(book.load.bind(book))
        const splitText = content.textContent.split(/(?!”)(?<!Mr|Mrs|[ ])\./g)
        splitText.forEach((raw) => {
            const text = raw.replaceAll('\n', ' ')
            if (text.length > 1) {
                splitBook.push(text)
            }
        })
    }

    store(this.files[0].name, splitBook)

}, false);

function get(id) {
    return browser.storage.local.get(id);
}

function store(id, body) {
    browser.storage.local.set({[id]: body});
}

function clearAll() {
    browser.storage.local.clear();
}
