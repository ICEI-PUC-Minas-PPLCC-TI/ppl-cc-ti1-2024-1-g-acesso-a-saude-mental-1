// Função para ser chamada quando o formulário de login for submetido
function loginUsuario(event) {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    // Captura os valores dos campos do formulário de login
    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;
    var cfp = document.getElementById('cfp').value;

    // Faz a requisição GET para o servidor JSON para obter todos os usuários
    fetch('http://localhost:3000/loginpsicologo')
        .then(response => response.json())
        .then(data => {
            // Verifica se o usuário existe com os dados fornecidos
            var usuario = data.find(user => user.email === email && user.senha === senha && user.cfp === cfp);
            if (usuario) {
                alert('Login realizado com sucesso!');
                // Redireciona para a página home-psicologo.html
                window.location.href = '/codigo/pages/home-psicologo/home-psicologo.html';
            } else {
                alert('Email, senha ou CFP incorretos. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
            alert('Erro ao fazer login. Por favor, tente novamente.');
        });

    // Limpa os campos do formulário de login após tentativa de login
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('cfp').value = '';
}

// Adiciona o event listener para o botão de login
document.getElementById('loginForm').addEventListener('submit', loginUsuario);
