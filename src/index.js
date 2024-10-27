import './styles.css'
import formModule from './form';

document.addEventListener('DOMContentLoaded', () => {
    const createTodoButton = document.querySelector('.create-todo');

    createTodoButton.addEventListener('click', () => {
        formModule.showForm();
    });
});
