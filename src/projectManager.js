// projectManager.js

const projectManager = (() => {
    const STORAGE_KEY = 'projects';

    const getProjects = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const addProject = (projectName) => {
        const projects = getProjects();
        if (!projects.includes(projectName)) {
            projects.push(projectName);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        }
    };

    return { getProjects, addProject };
})();

export default projectManager;
