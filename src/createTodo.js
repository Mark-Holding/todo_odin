//createTodos.js

import { format } from 'date-fns';

const createTodo = (title, dueDate, isUrgent, isImportant, notes, projectName) => {
    // Using the date-fns library to format the due date
    const formattedDate = format(new Date(dueDate), 'yyyy-MM-dd');

    // Factory function for creating a new todo item
    return {
        title,
        dueDate: formattedDate,
        isUrgent,
        isImportant,
        notes,
        projectName,
        isComplete: false, // Initially set to false for incomplete
        toggleComplete() {
            this.isComplete = !this.isComplete;
        },
        updateDetails({ title, dueDate, isUrgent, isImportant, notes, projectName }) {
            this.title = title || this.title;
            this.dueDate = dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : this.dueDate;
            this.isUrgent = isUrgent !== undefined ? isUrgent : this.isUrgent;
            this.isImportant = isImportant !== undefined ? isImportant : this.isImportant;
            this.notes = notes || this.notes;
            this.projectName = projectName || this.projectName;
        }
    };
};

export default createTodo;
