const control = document.createElement("div")
const prev = document.createElement("button")
const page = document.createElement("input")
const next = document.createElement("button")
const dispatch = document.createElement("input")

control.setAttribute("id", "book-control");

prev.setAttribute("id", "prev");
prev.innerText = "prev"

page.setAttribute("id", "page-number");
page.setAttribute("type", "number");

next.setAttribute("id", "next");
next.innerText = "next"

dispatch.setAttribute("id", "dispatch")
dispatch.setAttribute("type", "checkbox")


control.appendChild(dispatch)
control.appendChild(prev)
control.appendChild(next)
control.appendChild(page)

prev.style.cssText += 'margin-left:5px';
page.style.cssText += 'width:60px;margin-left:5px';
control.style.cssText += 'position:fixed;display:flex;margin:1rem;bottom:0;right:0;z-index:999';

const state = new Proxy({page: 0}, {
    set: function (target, key, value) {
        target[key] = value
        page.value = value

        updateTranslateInput(bookText[value])

        browser.storage.local.set({'page': state.page});

        return true;
    }
})

page.addEventListener('change', e => state.page = parseInt(e.target.value, 10))
prev.addEventListener('click', e => --state.page)
next.addEventListener('click', e => ++state.page)
dispatch.addEventListener('change', e => updateTranslateInput(bookText[state.page]))

document.addEventListener("keydown", e => {
    if (e.key === 'ArrowLeft') {
        prev.click()
    }
    if (e.key === 'ArrowRight') {
        next.click()
    }
})

//todo: add book select with its own progress saved page
let bookText = []

const books = browser.storage.local.get(null);
books.then((results) => {
    Object.keys(results).filter(key => key !== 'page').forEach((key, i) => {
        bookText = results[key]
        browser.storage.local.get('page').then(({page}) => state.page = page)
        page.setAttribute("title", results[key].length);
    })
}, e => console.error(e));


document.getElementsByTagName("html")[0].appendChild(control)

function updateTranslateInput(text) {
    const node = document.getElementsByTagName("textarea")[0]

    if (text) {
        node.value = text
    }
    node.focus()

    if (dispatch.checked) {
        node.dispatchEvent(new Event('input', {
            view: window,
            bubbles: true,
            cancelable: true
        }))
    }
}

