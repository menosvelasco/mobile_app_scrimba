import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
});

onValue(shoppingListInDBase, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    emptyInputField();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];

      displayShoppingList(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = 'No items here... yet';
  }
});

function emptyInputField() {
  inputEl.value = '';
}

function emptyShoppingList() {
  shoppingListEl.innerHTML = '';
}

function displayShoppingList(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let createListEl = document.createElement('li');

  createListEl.textContent = itemValue;

  createListEl.addEventListener('click', function () {
    let locationItemIdDatabase = ref(database, `shoppingList/${itemId}`);

    remove(locationItemIdDatabase);
  });

  shoppingListEl.append(createListEl);
}
