const dadosPagamento = {
    valor: "R$ 250,00",
    numeroCartao: "**** **** **** 1234",
    endereco: "Rua Exemplo, 123, Bairro, Cidade - Estado",
    nomeCartao: "Fulano de Tal",
    data: "16/06/2024",
    complemento: "Apto 45"
};

document.getElementById('valor').textContent = dadosPagamento.valor;
document.getElementById('numero-cartao').textContent = dadosPagamento.numeroCartao;
document.getElementById('endereco').textContent = dadosPagamento.endereco;
document.getElementById('nome-cartao').textContent = dadosPagamento.nomeCartao;
document.getElementById('data').textContent = dadosPagamento.data;
document.getElementById('complemento').textContent = dadosPagamento.complemento;
