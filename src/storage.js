const STORAGE_KEY = 'todos';

const storage = {
    saveTodos(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    },

    getTodos() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    },

    addTodo(todo) {
        const todos = this.getTodos();
        todos.push(todo);
        this.saveTodos(todos);
    },
};

export default storage;
