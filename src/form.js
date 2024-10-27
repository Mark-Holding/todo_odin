// form.js

import createTodo from './createTodo';
import storage from './storage';
import projectManager from './project';
import displayModule from './display';

const formModule = (() => {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.style.display = 'none'; // Initially hide the form

    let form;

    const renderForm = () => {
        formContainer.innerHTML = `
            <form id="todo-form">
                <label>Todo Title: <input type="text" id="todo-title" required></label>
                <label>Due Date: <input type="date" id="todo-due-date" required></label>
                <label>Urgent:
                    <input type="radio" name="urgent" value="true"> Yes
                    <input type="radio" name="urgent" value="false" checked> No
                </label>
                <label>Important:
                    <input type="radio" name="important" value="true"> Yes
                    <input type="radio" name="important" value="false" checked> No
                </label>
                <label>Todo Notes:
                    <textarea id="todo-notes"></textarea>
                </label>
                <label>Project Name:
                    <select id="project-name">
                        ${projectManager.getProjects().map(project => `<option value="${project}">${project}</option>`).join('')}
                    </select>
                </label>
                <button type="submit">Add Todo</button>
            </form>
        `;
        document.body.appendChild(formContainer);
        
        form = document.getElementById('todo-form');
        form.addEventListener('submit', handleFormSubmit);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const title = document.getElementById('todo-title').value;
        const dueDate = document.getElementById('todo-due-date').value;
        const isUrgent = document.querySelector('input[name="urgent"]:checked').value === 'true';
        const isImportant = document.querySelector('input[name="important"]:checked').value === 'true';
        const notes = document.getElementById('todo-notes').value;
        const projectName = document.getElementById('project-name').value;

        const newTodo = createTodo(title, dueDate, isUrgent, isImportant, notes, projectName);
        storage.addTodo(newTodo);

        formContainer.style.display = 'none'; // Hide form after submission
        form.reset();

        // Display todos after adding a new one
        displayModule.displayTodos();
    };

    const showForm = () => {
        formContainer.style.display = 'flex';
    };

    // Close the form when clicking outside of it
    formContainer.addEventListener('click', (event) => {
        if (event.target === formContainer) {
            formContainer.style.display = 'none';
        }
    });

    // Call renderForm immediately to initialize the form
    renderForm();

    return { showForm };
})();

export default formModule;
