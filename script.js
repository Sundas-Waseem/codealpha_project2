document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseIdInput = document.getElementById('expense-id');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expensesList = document.getElementById('expenses-list');
    const totalExpenseSpan = document.getElementById('total-expense');
    const addButton = document.getElementById('add-btn');
    const updateButton = document.getElementById('update-btn');

    // Load expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expensesList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name}: $${expense.amount}
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>`;
            expensesList.appendChild(li);
        });
        updateTotalExpense();
    };

    const addExpense = (name, amount) => {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    const updateExpense = (index, name, amount) => {
        expenses[index] = { name, amount };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    const updateTotalExpense = () => {
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        totalExpenseSpan.textContent = total.toFixed(2);
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = expenseNameInput.value;
        const amount = expenseAmountInput.value;
        const id = expenseIdInput.value;

        if (id === '') {
            addExpense(name, amount);
        } else {
            updateExpense(id, name, amount);
            expenseIdInput.value = '';
            addButton.style.display = 'inline';
            updateButton.style.display = 'none';
        }

        form.reset();
    });

    expensesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const index = event.target.dataset.index;
            const expense = expenses[index];
            expenseIdInput.value = index;
            expenseNameInput.value = expense.name;
            expenseAmountInput.value = expense.amount;
            addButton.style.display = 'none';
            updateButton.style.display = 'inline';
        } else if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            deleteExpense(index);
        }
    });

    updateButton.addEventListener('click', () => {
        const name = expenseNameInput.value;
        const amount = expenseAmountInput.value;
        const index = expenseIdInput.value;
        updateExpense(index, name, amount);
        form.reset();
        expenseIdInput.value = '';
        addButton.style.display = 'inline';
        updateButton.style.display = 'none';
    });

    renderExpenses();
});
