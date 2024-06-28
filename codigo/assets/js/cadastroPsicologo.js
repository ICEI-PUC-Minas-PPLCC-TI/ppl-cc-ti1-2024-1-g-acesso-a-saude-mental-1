    // Função para ser chamada quando o formulário de cadastro for submetido
function cadastrarUsuario(event) {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    // Captura os valores dos campos do formulário
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cfp = document.getElementById('cfp').value;
    var cpf = document.getElementById('cpf').value;
    var endereco = document.getElementById('endereco').value;
    var complemento = document.getElementById('complemento').value;

    // Cria um objeto com os dados do usuário
    var usuario = {
        nome: nome,
        email: email,
        senha: senha,
        cfp: cfp,
        cpf: cpf,
        endereco: endereco,
        complemento: complemento
    };

    // Faz a requisição POST para o servidor JSON
    fetch('http://localhost:3000/loginpsicologo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta do servidor:', data);
        alert('Cadastro realizado com sucesso!');
        // Limpa os campos do formulário após o cadastro
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('senha').value = '';
        document.getElementById('cfp').value = '';
        document.getElementById('cpf').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('complemento').value = '';

        window.location.href = '/codigo/pages/home-psicologo/loginPsicologo.html';
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
    });
}

// Função para ser chamada quando o formulário de login for submetido
function loginUsuario(event) {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    // Captura os valores dos campos do formulário de login
    var emailLogin = document.getElementById('emailLogin').value;
    var senhaLogin = document.getElementById('senhaLogin').value;

    // Faz a requisição POST para o servidor JSON
    fetch('http://localhost:3000/loginpsicologo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailLogin,
            senha: senhaLogin
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        // alert('Login realizado com sucesso!');
        // Aqui você pode redirecionar o usuário para a página de perfil ou outra página desejada
        window.location.href = '/codigo/pages/home-psicologo/home-psicologo.html';
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Email ou senha incorretos. Por favor, tente novamente.');
    });

    // Limpa os campos do formulário de login após tentativa de login
    document.getElementById('emailLogin').value = '';
    document.getElementById('senhaLogin').value = '';
}

// Adiciona os event listeners para os botões de cadastrar e login
document.getElementById('cadastroForm').addEventListener('submit', cadastrarUsuario);
document.getElementById('loginForm').addEventListener('submit', loginUsuario);