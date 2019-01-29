window.addEventListener('load', (event) => {
    registerFields();
    data = document.getElementById('data').dataset;

    document.getElementById('nextTurn').addEventListener('click', nextTurn);
});

let data;
let selected = null;

function nextTurn() {
    //todo communicate with websockets

    if (selected) {
        selected.classList.remove('selected');
        selected = null;
    }

    data.turn = 1*data.turn + 1 > 6 ? "1" : (1*data.turn + 1)+'';
    document.getElementById('turn').textContent = `current turn: ${data.turn}`;
    if (data.limit === '1') data.player = data.turn;
}

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
}

function move(column, row) {
    let field = document.querySelector(`[data-column="${column}"][data-row="${row}"]`);
    if (field === null) {
        return;
    }

    if (field.dataset.player === '0' && qualifyMovement({row: selected.dataset.row, column: selected.dataset.column}, {row: row, column: column})) {
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

function qualifyMovement(start, end) {
    //movement in the same row
    if (start.row === end.row) {
        if (Math.abs(start.column - end.column) === 1) {
            return true;
        } else {
            //jumping over in a row
            if (Math.abs(start.column - end.column) === 2) {
                let between = document.querySelector(`[data-row="${start.row}"][data-column="${start.column - (start.column - end.column > 0 ? 1 : -1)}"]`);
                //jump only possible if the field isn't empty
                return between.dataset.player !== '0';
            } else {
                return false;
            }
        }
    //movement to the other row
    } else if (Math.abs(start.row - end.row) === 1) {
        //different behaviour for odd and even rows
        if (start.row % 2 === 1) {
            return start.column === end.column || 1*start.column == 1*end.column - 1;
        } else {
            return start.column === end.column || 1*start.column == 1*end.column + 1;
        }
    //jumping over someone vertically
    } else if (Math.abs(start.row - end.row) === 2) {
        //todo fix this and make this work somehow
        return true;
        /*
        console.log(start, end);
        if (start.row % 2 === 1) {
            if (1*start.row < 1*end.row) {
                //odd, down, lower column
                if (start.column - 1 == end.column) {
                    let between = document.querySelector(`[data-row="${1*start.row + 1}"][data-column="${end.column}"]`);
                    console.log(`[data-row="${start.row + 1}"][data-column="${end.column}"]`);
                    return between.dataset.player !== '0';
                //odd, down, bigger column
                } else if (1*start.column + 1 == end.column) {
                    let between = document.querySelector(`[data-row="${1*start.row + 1}"][data-column="${start.column}"]`);
                    console.log(`[data-row="${start.row + 1}"][data-column="${start.column}"]`);
                    return between.dataset.player !== '0';
                } else {
                    return false;
                }
            } else {
                //odd, up, lower column
                if (start.column == end.column - 1) {
                    let between = document.querySelector(`[data-row="${start.row - 1}"][data-column="${start.column}"]`);
                    return between.dataset.player !== '0';
                //odd, up, bigger column
                } else if (start.column == 1*end.column + 1) {
                    let between = document.querySelector(`[data-row="${start.row - 1}"][data-column="${end.column}"]`);
                    return between.dataset.player !== '0';
                } else {
                    return false;
                }
            }
        } else {
            if (1*start.row < 1*end.row) {
                //even, down, lower column
                if (start.column - 1 == end.column) {
                    let between = document.querySelector(`[data-row="${1*start.row + 1}"][data-column="${end.column}"]`);
                    return between.dataset.player !== '0';
                //even, down, bigger column
                } else if (1*start.column + 1 == 1*end.column) {
                    let between = document.querySelector(`[data-row="${1*start.row + 1}"][data-column="${start.column}"]`);
                    return between.dataset.player !== '0';
                } else {
                    return false;
                }
            } else {
                //even, up, lower column
                if (start.column == end.column - 1) {
                    let between = document.querySelector(`[data-row="${start.row - 1}"][data-column="${end.column}"]`);
                    return between.dataset.player !== '0';
                //even, up, bigger column
                } else if (start.column == 1*end.column + 1) {
                    let between = document.querySelector(`[data-row="${start.row - 1}"][data-column="${start.column}"]`);
                    return between.dataset.player !== '0';
                } else {
                    return false;
                }
            }
        }*/
    } else {
        return false;
    }
}
