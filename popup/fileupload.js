document.getElementById("input").addEventListener("change", function(e) {

    const book = ePub(this.files[0]);

    book.loaded.spine.then((spine) => {
        spine.each((item) => {
            item.load(book.load.bind(book)).then(({textContent}) => {
                console.log(textContent);
            });
        });
    });

}, false);


