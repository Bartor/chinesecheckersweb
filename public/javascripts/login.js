window.addEventListener('load', event => {
    document.getElementById('login').addEventListener('submit', event => {
        event.preventDefault();
        login();
        return false;
    });
});

const login = () => {
    document.getElementById('nick').disabled = true;
    document.getElementById('submit').disabled = true;

    document.getElementById('submit').value = 'Wait...';

    let xhr = new XMLHttpRequest();
    let data = {nickname: document.getElementById('nick').value};

    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.cookie = `nickname=${data.nickname}`;
            document.cookie = `token=${xhr.responseText}`;

            window.location.replace('/lobbies');
        }
    }

    xhr.send(JSON.stringify(data));
}