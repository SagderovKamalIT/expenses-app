const expenses = [];

const LIMIT = 10000;

// Node позволяет понять, что это часть html-кода
const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

limitNode.innerText = LIMIT;

buttonNode.addEventListener('click', function() {
    // 1. Получаем значение из поля ввода
    // ! - тоже самое, что ничего нет в строке
    if (!inputNode.value) {
        return;
    }
    console.log(inputNode.value);
    //функция parseInt - позволяет преобразовать строки в числа
    const expense = parseInt(inputNode.value);

    //позволяет сбросить данные в поле ввода
    inputNode.value = '';


    // 2.Сохраняем значения трат в список
    expenses.push(expense);

    // 3. Выведем новый список трат
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li>${element} руб.</li>`;
    });

   
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

    // 4.считаем сумму и выводи ее
    let sum = 0;
    expenses.forEach(element => {
        sum += element;
    });

    console.log(sum);

    sumNode.innerText = sum;

    // 5. Сравнение с лимитом и вывод статуса
    if (sum <= LIMIT) {
        statusNode.innerText = 'все хорошо';
    } else {
        statusNode.innerText = 'все плохо';
        statusNode.classList.add('status-red');
    }
});

