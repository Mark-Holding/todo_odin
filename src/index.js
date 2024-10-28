//index.js

import './styles.css'
import formModule from './form';
import displayModule from './display';
import projectManager from './projectManager.js';
import projectFormModal from './projectFormModal.js';
import storage from './storage'; // Ensure storage is imported

document.addEventListener('DOMContentLoaded', () => {
    const addProjectBtn = document.querySelector('.add-project');
    const projectList = document.querySelector('.project-list');
    const projectDropdown = document.getElementById('project-name');
    const createTodoButton = document.querySelector('.create-todo');

    createTodoButton.addEventListener('click', () => {
        formModule.showForm();
    });

    // Display todos on initial load
    displayModule.displayTodos(storage.getTodos());

    // Function to update the project list in the UI and add filtering functionality
    const updateProjectList = () => {
        const projects = projectManager.getProjects();
        projectList.innerHTML = ''; // Clear current project list

        projects.forEach(project => {
            // Create a list item for each project
            const projectItem = document.createElement('li');
             projectItem.textContent = project;
                projectItem.classList.add('project-filter'); // Optional: for styling

            // Add click event to filter todos by this project
            projectItem.addEventListener('click', () => {
                console.log("Filtering by project:", project); // Debugging line
                displayModule.displayTodos(storage.getTodos(), project); // Pass project as filter
            });

            projectList.appendChild(projectItem);
        });
    };


    // Function to update the project dropdown in the todo form
    const updateProjectDropdown = () => {
        const projects = projectManager.getProjects();
        projectDropdown.innerHTML = projects.map(project => `<option value="${project}">${project}</option>`).join('');
    };

    // Show the project form modal when the "+" button is clicked
    addProjectBtn.addEventListener('click', () => {
        projectFormModal.showProjectForm(() => {
            updateProjectList();
            updateProjectDropdown();
        });
    });

    //add event listeners for each filter option in the sidebar
    const filters = document.querySelectorAll('.filter-item'); // Assumes filters have this class
        filters.forEach(filter => {
         filter.addEventListener('click', () => {
        const filterType = filter.dataset.filter; // Set data-filter on each filter button
        displayModule.displayTodos(storage.getTodos(), filterType); // Pass the selected filter type to displayTodos
    });
});

    // Initialize project list and dropdown on page load
    updateProjectList();
    updateProjectDropdown();
});
