const expenses = [];

// Node позволяет понять, что это часть html-кода
const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');

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
        expensesListHTML += `<li>${element}</li>`;
    });

   
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
});

