document.addEventListener('DOMContentLoaded', function () {
  const concluirBtn = document.querySelector('.concluir');

  concluirBtn.addEventListener('click', function () {
      // Recuperar os valores dos campos de entrada
      const email = document.getElementById('email').value;
      const numero = document.getElementById('numero').value;
      const validade = document.getElementById('validade').value;
      const cvc = document.getElementById('cvc').value;
      const nome = document.getElementById('nome').value;

      fetch("https://778b3d17-899f-478a-bc1a-fb48f02dff8b-00-10mayq3qxg10t.kirk.replit.dev/pagamento", {
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

// const defaultFormData = {
//     userEmail: "",
//     cardNumber: "",
//     cardExpiry: "",
//     cardCvc: "",
//     cardholderName: "",
// };

// document.getElementById('paymentForm');

// form.addEventListener('submit', (event) => {
//   event.preventDefault(); 

//   const formData = {
//     userEmail: form.querySelector('input[type="text"]').value,
//     cardNumber: form.querySelector('input[placeholder="1234-1234-1234-1234"]').value,
//     cardExpiry: form.querySelector('input[placeholder="12/23"]').value,
//     cardCvc: form.querySelector('input[placeholder="CVC"]').value,
//     cardholderName: form.querySelector('input[placeholder="Nome no cartão"]').value,
//     paymentAmount: form.querySelector('input[name="ação"]').value,
//   };

 
//   console.log(JSON.stringify(formData)); 
// });