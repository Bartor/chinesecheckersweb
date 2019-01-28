window.addEventListener('load', (event) => {
    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();
        newGame();
    });
});

const newGame = () => {
    let button = document.getElementById('button');
    button.value = 'wait...';

    let error = document.getElementById('error');
    error.textContent = '';

    let limitField = document.getElementById('limit');
    let nameField = document.getElementById('name');

    let limit = new Number(limitField.value).valueOf();
    let name = nameField.value;

    if (typeof name !== 'string' || (typeof limit !== 'number' && !Number.isNaN(limit))) {
        error.textContent = 'Wrong input type';
        button.value = 'create';
        return;
    }

    if (limit !== 1 && limit !== 2 && limit !== 4 && limit !== 6) {
        error.textContent = 'Limit must be 1, 2, 4 or 6';
        button.value = 'create';
        return;
    }

    button.disabled = true;

    limitField.disabled = true;
    nameField.disabled = true;

    let data = {limit: limit, name: name};

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                window.location = `/game/${xhr.responseText}`;
            } else if (xhr.status === 401) {
                error.textContent = 'Your token is invalid, please login again';
                button.value = 'create';
            } else if (xhr.status === 500) {
                error.textContent = 'Internal server error';
                button.value = 'create';

                button.disabled = false;

                limitField.disabled = false;
                nameField.disabled = false;
            }
        }
    }

    xhr.send(JSON.stringify(data));
}