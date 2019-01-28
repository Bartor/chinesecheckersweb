window.addEventListener('load', (event) => {
    document.getElementById('newGame').addEventListener('click', (event) => {
       newGame();
    });
});

const newGame = () => {
    window.location.replace('/new');
}