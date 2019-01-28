window.addEventListener('load', (event) => {
    registerFields();
    data = document.getElementById('data').dataset;
});

let data;
let selected = null;

function registerFields() {
    for (let child of document.getElementById('board').children) {
        for (let c of child.children) {
            c.addEventListener('click', function(event) {
                if (data.player === data.turn) {
                    if (this.dataset.player === data.player) {
                        if (selected === null) {
                            select(this.dataset.column, this.dataset.row);
                        } else {
                            unselect();
                            select(this.dataset.column, this.dataset.row);
                        }
                    } else if (selected !== null) {
                        move(this.dataset.column, this.dataset.row);
                    }
                }
            });
        }
    }
}

function unselect() {
    selected.classList.remove('selected');
    selected = null;
}

function select(column, row) {
    let field = document.querySelector(`[data-column="${column}"][data-row="${row}"]`);
    if (field === null) {
        return;
    }

    selected = field;
    field.classList.add('selected');

    console.log(`Moving ${column} ${row}`);
}

function move(column, row) {
    let field = document.querySelector(`[data-column="${column}"][data-row="${row}"]`);
    if (field === null) {
        return;
    }

    if (field.dataset.player === '0') {
        field.classList.remove('color0');
        field.classList.add(`color${data.player}`);
        field.setAttribute('data-player', data.player);

        selected.classList.remove('selected');
        selected.setAttribute('data-player', '0');
        selected.classList.remove(`color${data.player}`);
        selected.classList.add('color0');

        selected = null;
    }
}