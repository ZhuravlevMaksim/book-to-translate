const control = document.createElement("div")
const prev = document.createElement("button")
const page = document.createElement("input")
const next = document.createElement("button")

control.setAttribute("id", "book-control");

prev.setAttribute("id", "prev");
prev.innerText = "prev"

page.setAttribute("id", "page-number");
page.setAttribute("type", "number");

next.setAttribute("id", "next");
next.innerText = "next"

control.appendChild(prev)
control.appendChild(page)
control.appendChild(next)

control.style.cssText += 'color:red;background-color:yellow;width:200px;position:absolute;top:0;right:0;z-index:999';

const state = new Proxy({page: 0}, {
    set: function (target, key, value) {
        target[key] = value
        page.value = value

        const node = document.getElementsByTagName("textarea")[0]

        node.value = bookText[value]
        node.focus()

        return true;
    }
})

page.addEventListener('change', e => state.page = parseInt(e.target.value, 10))
prev.addEventListener('click', e => --state.page)
next.addEventListener('click', e => ++state.page)


let bookText = []

const books = browser.storage.local.get(null);
books.then((results) => {
    Object.keys(results).forEach((e, i) => {
        bookText = results[e]
    })
}, e => console.error(e));


document.getElementsByTagName("body")[0].appendChild(control)
