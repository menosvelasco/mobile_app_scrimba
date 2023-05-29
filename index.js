const inputEl = document.getElementById('input-el');
const buttonEl = document.getElementById('button-el');

buttonEl.addEventListener('click', function () {
  let inputFieldValue = inputEl.value;

  console.log(inputFieldValue);
});
