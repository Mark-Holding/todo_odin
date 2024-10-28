//display.js

import storage from './storage';
import { isToday, isWithinInterval, addDays, startOfDay } from 'date-fns';

const displayModule = (() => {
    const categories = {
        "do": document.getElementById('do'),
        "delegate": document.getElementById('delegate'),
        "delete": document.getElementById('delete'),
        "schedule": document.getElementById('schedule'),
    };

    const detailsContainer = document.querySelector('.todo-details');
    const markCompleteButton = document.querySelector('.mark-complete'); // Select the button once
    let selectedTodo = null; // Keep track of the currently selected todo

    // Function to display all todos
    const displayTodos = (todos, filter = 'All') => {
        // Instead of clearing `.todo-section`, clear each `.todo-list`
    document.querySelectorAll('.todo-list').forEach(list => {
        list.innerHTML = ''; // Clear only todo items, not the structure
    });
    
        todos.forEach(todo => {
            let shouldDisplay = false;
    
            if (filter === 'All') {
                shouldDisplay = true;
            } else if (filter === 'Today') {
                shouldDisplay = isToday(new Date(todo.dueDate));
            } else if (filter === 'Next 7 Days') {
                shouldDisplay = isWithinInterval(new Date(todo.dueDate), {
                    start: startOfDay(new Date()), // Sets start to the beginning of today
                    end: addDays(startOfDay(new Date()), 6) // Includes today + 6 more days
                });
            } else if (filter === 'Completed') {
                shouldDisplay = todo.isComplete;
            } else if (filter === todo.projectName) {
                shouldDisplay = true; // Project-specific filter
            }
    
            // Display incomplete todos by default if no filter is applied
            if (shouldDisplay && (filter === 'Completed' || !todo.isComplete)) {
                const todoElement = createTodoElement(todo);
                const targetCategory = determineCategory(todo);
    
                if (targetCategory) {
                    console.log("Appending todo to target category:", targetCategory); // Debugging line
                    targetCategory.querySelector('.todo-list').appendChild(todoElement);
                }
            }
        });
    };

    // Function to create an element for each todo
    const createTodoElement = (todo) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <p>${todo.title}</p>
            <p class="due-date">${todo.dueDate}</p>
        `;

        todoItem.addEventListener('click', () => {
            displayTodoDetails(todo);
        });

        return todoItem;
    };

    // Function to display todo details in the details section
    const displayTodoDetails = (todo) => {
        selectedTodo = todo; // Set the currently selected todo
        detailsContainer.innerHTML = `
            <h2>${todo.title}</h2><br>
            <p>${todo.notes}</p>
        `;


    };

    const markTodoComplete = () => {
        if (selectedTodo) {
            selectedTodo.isComplete = true; // Mark as complete

            // Update local storage with the updated todo list
            const todos = storage.getTodos().map(todo => 
                todo.title === selectedTodo.title && todo.dueDate === selectedTodo.dueDate ? selectedTodo : todo
            );
            storage.saveTodos(todos);

            // Clear the details section and refresh the displayed todos
            detailsContainer.innerHTML = '';
            displayTodos(storage.getTodos());
        }
    };



    // Function to determine the category based on isUrgent and isImportant
    const determineCategory = (todo) => {
        if (todo.isUrgent && todo.isImportant) return categories["do"];
        if (todo.isUrgent && !todo.isImportant) return categories["delegate"];
        if (!todo.isUrgent && !todo.isImportant) return categories["delete"];
        if (!todo.isUrgent && todo.isImportant) return categories["schedule"];
    };

     // Add event listener to the "Mark Complete" button on page load
     markCompleteButton.addEventListener('click', markTodoComplete);

    return { displayTodos };
})();

export default displayModule;
