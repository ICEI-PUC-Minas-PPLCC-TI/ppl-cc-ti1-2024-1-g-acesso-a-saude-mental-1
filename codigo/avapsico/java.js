const psicoData = {
    nome: "Vania Aparecida",
    photo: "assets/default-avatar.png",
}

localStorage.setItem('psicoData', JSON.stringify(psicoData));
var storedData = JSON.parse(localStorage.getItem('psicoData'));
document.getElementById('psiconome').textContent = `Nome: ${storedData.nome}`;