window.addEventListener('load', () => {
    document.getElementById('newGame').addEventListener('click', () => {
       newGame();
    });
    let id = 0;

    // chrome's something something content policy disallows used of inline js, so we have to add event listeners
    // manually when loading the page
    while (document.getElementById('j' + id) !== null) {
        document.getElementById('j' + id).addEventListener('click', function(event) {
            join(this.id.substr(1));
        });
        id++;
    }
});

const newGame = () => {
    window.location = '/new';
};

const join = (id) => {
    window.location = `/game/${id}`;
};