let LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status-red';
const STORAGE_LABEL_LIMIT = 'limit';
const STORAGE_LABEL_EXPENSES = 'expenses';
const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed';

// HTML константы, ссылки на HTML 
const bodyNode = document.querySelector('body');
const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const clearButtonNode = document.querySelector('.js-clear__button');
const changeLimitBtnNode = document.querySelector('.js-change-limit__btn');
const categorySelectedNode = document.querySelector('.js-category__selected');


// popup константы
const popupNode = document.querySelector('.js-popup');
const popupContentNode = document.querySelector('.js-popup__content');
const popupInputNode = document.querySelector('.js-popup-input');
const popupBtnNode = document.querySelector('.js-popup-button ');
const popupCloseBtnNode = document.querySelector('.js-popup__close-btn');



const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
const expensesFromStorage = JSON.parse(expensesFromStorageString);
let expenses = [];
init(expenses);
//проверка, что объект expensesFromStorage является массивом
if (Array.isArray(expensesFromStorage)) {
  expenses = expensesFromStorage;
}
render(expenses);


buttonNode.addEventListener('click', function(){
 // 1. Получаем значение из поля ввода
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    const category = getSelectedCategory();

    if (!category) {
      alert('Выбирете категорию!');
      return;
    }

    trackExpense(expense, category);

    render(expenses);


});



function togglePopup() {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}




function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
}

function initLimit() {
  const limitFromStorage =  parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT));
  if (!limitFromStorage) {
    return;
  }
  limitNode.innerText = limitFromStorage;
}

initLimit();

function trackExpense(expense, category) {
    expenses.push({amount: expense, category: category});

    saveExpensesToStorage();

}

function saveExpensesToStorage() {
  // JSON.stringify - метод, который позволяет преобразовать число в строку
  const expensesString = JSON.stringify(expenses);
  localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}

function getExpenseFromUser() {
    // 1. Получаем значение из поля ввода

  if (!inputNode.value) {
    alert('Введите сумму!');
    return null;
  }
  const expense = parseInt(inputNode.value);
  clearInput();

  return expense;

}

function changeLimitFromUser() {
  const newLimitValue = parseInt(popupInputNode.value);
  clearInput();
  
  if (!newLimitValue) {
    alert('Введите новый лимит!');
    return;
  }

  LIMIT = newLimitValue;
  limitNode.innerText = newLimitValue;
 
  // STORAGE_LABEL_LIMIT - первое значение - это ключ для LocalStorage
  localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue);
  togglePopup();
  render(expenses);
  }




function clearInput() {
    inputNode.value = '';
}

  // 4.Считаем сумму и выводим ее
  function calculateExpenses(expenses) {
    let sum = 0;
    expenses.forEach(expense => {
      sum += expense.amount;
    });

    return sum;
}

function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function getSelectedCategory() {
  if (categorySelectedNode.value === 'Категория') {
    return null;
  }
  return categorySelectedNode.value;
  }
  

  // 3.Выводим новый список трат
function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(expense => {
      expensesListHTML += `<li>${expense.category} - ${expense.amount} ${CURRENCY}</li>`;
    });
  
    
  
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
      // 4.Считаем сумму и выводим ее
sumNode.innerText = sum;
}


  

function renderStatus(sum) {
    // 5.Сравнение с лимитом и вывод статуса 
if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
} else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} ${CURRENCY})`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
}
}

function clearButtonHandler() {
  expenses.length = 0;
  saveExpensesToStorage();
   init(expenses);
  render(expenses);
}


clearButtonNode.addEventListener('click', clearButtonHandler);
popupBtnNode.addEventListener('click', changeLimitFromUser)
changeLimitBtnNode .addEventListener('click', togglePopup);
popupCloseBtnNode.addEventListener('click', togglePopup);

