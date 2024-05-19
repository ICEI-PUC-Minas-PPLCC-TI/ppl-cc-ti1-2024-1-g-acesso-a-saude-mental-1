document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
});

document.getElementById('save-button').addEventListener('click', function() {
    saveProfile();
});
// Menu hamburguer js
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    
}
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
//END HAMBURGUER

//EDICAO DOS CAMPOS DO BODY
function editField(fieldId) {
    const field = document.getElementById(fieldId);
    field.disabled = false;
    field.focus();
    if (fieldId === 'foto') {
        field.click();
    }
}

function saveProfile() {
    const nome = document.getElementById('nome').value;
    const biografia = document.getElementById('biografia').value;
    const localizacao = document.getElementById('localizacao').value;
    const especialidades = document.getElementById('especialidades').value;
    const contatos = document.getElementById('contatos').value;
    const foto = document.getElementById('foto').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const fotoDataUrl = reader.result;

        const data = { //CONST DATA REGISTRO (SERA ALTERADO POR ARQUIVO .JSON SEPARADO NA INTEGRACAO DAS PAGINAS)
            nome: nome,
            biografia: biografia,
            localizacao: localizacao,
            especialidades: especialidades,
            contatos: contatos,
            foto: fotoDataUrl
        };

        localStorage.setItem('profileData', JSON.stringify(data)); //LOCAL STORAGE (ALTERAR ENTREGA FINAL)
        alert('Perfil atualizado com sucesso!');
        location.reload();
    };

    if (foto) {
        reader.readAsDataURL(foto);
    } else {
        const data = { ////CONST DATA REGISTRO (SERA ALTERADO POR ARQUIVO .JSON SEPARADO NA INTEGRACAO DAS PAGINAS)
            nome: nome,
            biografia: biografia,
            localizacao: localizacao,
            especialidades: especialidades,
            contatos: contatos,
            foto: document.getElementById('profile-pic').src
        };

        localStorage.setItem('profileData', JSON.stringify(data)); //LOCAL STORAGE
        alert('Perfil atualizado com sucesso!');
    }
}

function loadProfile() { //CARREGA AS PAGINAS DO LOCAL STORAGE
    const data = JSON.parse(localStorage.getItem('profileData')); // CONTEUDO PODE SER DELETADOS AO LIMPAR LOCAL STORAGE DO NAVEGADOR
    if (data) {
        document.getElementById('nome').value = data.nome;
        document.getElementById('biografia').value = data.biografia;
        document.getElementById('localizacao').value = data.localizacao;
        document.getElementById('especialidades').value = data.especialidades;
        document.getElementById('contatos').value = data.contatos;
        document.getElementById('profile-pic').src = data.foto;
    }
}
