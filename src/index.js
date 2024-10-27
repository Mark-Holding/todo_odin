import './styles.css'
import formModule from './form';
import displayModule from './display';


document.addEventListener('DOMContentLoaded', () => {
    const createTodoButton = document.querySelector('.create-todo');

    createTodoButton.addEventListener('click', () => {
        formModule.showForm();
    });

    // Display todos on initial load
    displayModule.displayTodos();
});
