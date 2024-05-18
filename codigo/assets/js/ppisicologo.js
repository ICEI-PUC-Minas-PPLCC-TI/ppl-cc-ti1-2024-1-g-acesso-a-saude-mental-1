document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
});

document.getElementById('save-button').addEventListener('click', function() {
    saveProfile();
});

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
    const foto = document.getElementById('foto').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const fotoDataUrl = reader.result;

        const data = {
            nome: nome,
            biografia: biografia,
            localizacao: localizacao,
            especialidades: especialidades,
            foto: fotoDataUrl
        };

        localStorage.setItem('profileData', JSON.stringify(data));
        alert('Perfil atualizado com sucesso!');
    };

    if (foto) {
        reader.readAsDataURL(foto);
    } else {
        const data = {
            nome: nome,
            biografia: biografia,
            localizacao: localizacao,
            especialidades: especialidades,
            foto: document.getElementById('profile-pic').src
        };

        localStorage.setItem('profileData', JSON.stringify(data));
        alert('Perfil atualizado com sucesso!');
    }
}

function loadProfile() {
    const data = JSON.parse(localStorage.getItem('profileData'));
    if (data) {
        document.getElementById('nome').value = data.nome;
        document.getElementById('biografia').value = data.biografia;
        document.getElementById('localizacao').value = data.localizacao;
        document.getElementById('especialidades').value = data.especialidades;
        document.getElementById('profile-pic').src = data.foto;
    }
}
