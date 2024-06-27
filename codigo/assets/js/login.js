document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (email === '' || password === '') {
        message.textContent = 'Preencha os campos de email e senha.';
        return;
    }

    fetch('http://127.0.0.1:5500/HTML/Login/login.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                message.textContent = 'Logado com sucesso!';
                message.style.color = 'green';
                setTimeout(() => {
                    if (user.accountType === 1) {
                        window.location.href = 'logged1.html';
                    } else if (user.accountType === 2) {
                        window.location.href = 'logged2.html';
                    }
                }, 1000);
            } else {
                message.textContent = 'Email ou senha inválidos.';
                message.style.color = 'red';
            }
        })
        .catch(error => {
            message.textContent = 'Um erro ocorreu, por favor tente novamente mais tarde.';
            console.error('Error fetching the JSON file:', error);
        });
});
