window.addEventListener('load', () => {
    document.getElementById('newGame').addEventListener('click', () => {
       newGame();
    });
    let id = 0;

    // chrome's something something content policy disallows used of inline js, so we have to add event listeners
    // manually when loading the page
    while (document.getElementById('j' + id) !== null) {
        let localJoin = makeJoin(id);
        document.getElementById('j' + id).addEventListener('click', () => {
            localJoin();
        });
        id++;
    }
});

const newGame = () => {
    window.location = '/new';
};

const makeJoin = (id) => () => join(id);

const join = (id) => {
    window.location = `/game/${id}`;
};