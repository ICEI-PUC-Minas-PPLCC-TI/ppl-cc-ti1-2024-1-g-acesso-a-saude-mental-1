
const painelData = {
    nome: "Matheus Coutinho da Silva",
    cpf: "123456789",
    endereco: "Rua dos Bobos n 0",
    complemento: "Apartamento 602",
    email: "matheusziho@hotmail.com.br",
}

const finanData = {
    metpag: "Cartão de Crédito",
    ultcobr: [
        "150 reais",
        " 200 reais",
        " 200 reais",
    ],
    datultcobr: [
        "18/05",
        " 11/05",
        " 04/05",
    ],
}

const ultimsasecoes = {
    psicologo: [
        "Vania dos Santos",
        " Dagilza Pereira",
        " Dagilza Pereira"
    ]
}

localStorage.setItem('painelData', JSON.stringify(painelData));
localStorage.setItem('finanData', JSON.stringify(finanData));


var storedData = JSON.parse(localStorage.getItem('painelData'));


document.getElementById('nome').textContent = `Nome: ${storedData.nome}`;
document.getElementById('cpf').textContent = `CPF: ${storedData.cpf}`;
document.getElementById('endereco').textContent = `Endereço: ${storedData.endereco}`;
document.getElementById('complemento').textContent = `Complemento: ${storedData.complemento}`;
document.getElementById('email').textContent = `Email: ${storedData.email}`;
document.getElementById('metpag').textContent = `Método de Pagamento: ${finanData.metpag}`;
document.getElementById('ultcobr').textContent = `Últimas Cobranças: ${finanData.ultcobr}`;
document.getElementById('datultcobr').textContent = `Data das Últimas Cobranças: ${finanData.datultcobr}`;
document.getElementById('psicologo').textContent = `Suas ultimas seções foram com: ${ultimsasecoes.psicologo}`;
