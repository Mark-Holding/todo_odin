const PROJECT_STORAGE_KEY = 'projects';

const projectManager = (() => {
    const getProjects = () => {
        return JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY)) || [];
    };

    const addProject = (projectName) => {
        const projects = getProjects();
        if (!projects.includes(projectName)) {
            projects.push(projectName);
            localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
        }
    };

    return { getProjects, addProject };
})();

export default projectManager;
