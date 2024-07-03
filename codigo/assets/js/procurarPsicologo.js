document.addEventListener('DOMContentLoaded', () => {
    fetch('/codigo/assets/json/psicologos.json')
        .then(response => response.json())
        .then(psicologos => {
            const cardsContainer = document.getElementById('cards-container');
            psicologos.forEach(psicologo => {
                const cardHTML = `
                    <div class="card">
                        <img src="${psicologo.imagem}" id="imagempsico"alt="">
                        <div class="card-content">
                            <h2 id="psicologotext1">${psicologo.nome}</h2>
                            <p id="psicologotext2">${psicologo.especialidade}</p>
                            <p id="psicologotext2">${psicologo.descricao}</p>
                            <p id="psicologotext2"><a href="agendaPaciente.html">Marcar consulta</a></p>
                        </div>
                    </div>
                `;
                cardsContainer.innerHTML += cardHTML;
            });
        })
        .catch(error => console.error('Erro ao carregar psicólogos:', error));
});