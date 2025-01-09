const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status-red';


// Node позволяет понять, что это часть html-кода
const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = [];

init(expenses);




buttonNode.addEventListener('click', function() {

    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    trackExpense(expense);

    render(expenses);
  
});


function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses) ;
}

function trackExpense(expense) {
    expenses.push(expense);
}

function getExpenseFromUser() {
    // 1. Получаем значение из поля ввода
    // ! - тоже самое, что ничего нет в строке
    if (!inputNode.value) {
        return null;
    }

    console.log(inputNode.value);
    //функция parseInt - позволяет преобразовать строки в числа
    const expense = parseInt(inputNode.value);

     clearInput();

    return expense;
}

function clearInput() {
 //позволяет сбросить данные в поле ввода
 inputNode.value = '';
}

function calculateExpenses(expenses) {
   //считаем сумму и выводи ее
   let sum = 0;
   expenses.forEach(element => {
       sum += element;
   });


   return sum;
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}



function renderHistory(expenses) {
// 3. Выведем новый список трат
let expensesListHTML = '';

expenses.forEach(element => {
    expensesListHTML += `<li>${element} ${CURRENCY}.</li>`;
});


historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
       // 4.считаем сумму и выводи ее

       sumNode.innerText = sum;
}

function renderStatus(sum) {

   // 5. Сравнение с лимитом и вывод статуса
   if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
} else {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
}
}
