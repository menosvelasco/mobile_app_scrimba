import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
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

  inputEl.value = '';

  shoppingListEl.innerHTML += `<li>${inputFieldValue}</li>`;
});
