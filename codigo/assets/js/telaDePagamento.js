document.addEventListener('DOMContentLoaded', function () {
  const concluirBtn = document.querySelector('.concluir');

  concluirBtn.addEventListener('click', function () {
      // Recuperar os valores dos campos de entrada
      const email = document.getElementById('email').value;
      const numero = document.getElementById('numero').value;
      const validade = document.getElementById('validade').value;
      const cvc = document.getElementById('cvc').value;
      const nome = document.getElementById('nome').value;

      fetch("http://localhost:3000/horarios", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          numero,
          validade,
          cvc,
          nome
        })
      })
      .then((res) => {
        // redirecionar para pagina de sucesso
        window.location.href = "/codigo/pages/extrato.html/"
      }).catch((err) => {
        alert(err)
      })
  });
});
