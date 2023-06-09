import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://mobile-app-database-6a9a3-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDBase = ref(database, 'shoppingList');

const inputEl = document.getElementById('input-el');
const buttonEl = document.getElementById('button-el');
const shoppingListEl = document.getElementById('shopping-list');

buttonEl.addEventListener('click', function () {
  let inputFieldValue = inputEl.value;

  push(shoppingListInDBase, inputFieldValue);

  emptyInputField();

  displayShoppingList(inputFieldValue);
});

onValue(shoppingListInDBase, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());

  for (let i = 0; i < itemsArray.length; i++) {
    displayShoppingList(itemsArray[i]);
  }

  console.log(itemsArray);
});

function emptyInputField() {
  inputEl.value = '';
}

function displayShoppingList(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
