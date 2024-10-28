// projectFormModal.js

import projectManager from './projectManager.js';

const projectFormModal = (() => {
    const showProjectForm = (onProjectAdd) => {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form id="project-form">
                <label for="project-name-input">Project Name:</label>
                <input type="text" id="project-name-input" required>
                <button type="submit">Add Project</button>
                <button type="button" id="cancel-project">Cancel</button>
            </form>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        // Handle form submission
        const projectForm = document.getElementById('project-form');
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = document.getElementById('project-name-input').value.trim();
            if (projectName) {
                projectManager.addProject(projectName);
                onProjectAdd(); // callback to update UI in the main app
                closeModal();
            }
        });

        // Close modal on cancel
        document.getElementById('cancel-project').addEventListener('click', closeModal);
    };

    const closeModal = () => {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) document.body.removeChild(modalOverlay);
    };

    return { showProjectForm };
})();

export default projectFormModal;
