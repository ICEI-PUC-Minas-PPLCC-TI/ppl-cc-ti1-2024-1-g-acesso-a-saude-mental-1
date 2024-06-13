const defaultFormData = {
    userEmail: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardholderName: "",
    paymentAmount: ""
};

document.getElementById('paymentForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const formData = {
    userEmail: form.querySelector('input[type="text"]').value,
    cardNumber: form.querySelector('input[placeholder="1234-1234-1234-1234"]').value,
    cardExpiry: form.querySelector('input[placeholder="12/23"]').value,
    cardCvc: form.querySelector('input[placeholder="CVC"]').value,
    cardholderName: form.querySelector('input[placeholder="Nome no cartão"]').value,
    paymentAmount: form.querySelector('input[name="ação"]').value,
  };

 
  console.log(JSON.stringify(formData)); 
});