const API_URL = "http://localhost:8080/todos";

// DOM Elements
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const emptyState = document.getElementById("emptyState");

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    
    // Allow Enter key to add todo
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });
});

/**
 * Load all todos from the backend
 */
async function loadTodos() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const todos = await response.json();
        
        // Clear the list
        todoList.innerHTML = "";
        
        // Update counter
        updateTodoCount(todos.length);
        
        // Show/hide empty state
        if (todos.length === 0) {
            emptyState.style.display = "block";
            todoList.style.display = "none";
        } else {
            emptyState.style.display = "none";
            todoList.style.display = "flex";
        }
        
        // Render todos
        todos.forEach((todo, index) => {
            renderTodoItem(todo, index);
        });

    } catch (error) {
        console.error("Error loading todos:", error);
        showError("Failed to load tasks. Please check your connection.");
    }
}

/**
 * Render a single todo item
 */
function renderTodoItem(todo, index) {
    const li = document.createElement("li");
    li.className = "todo";
    li.style.animationDelay = `${index * 0.05}s`;
    
    li.innerHTML = `
        <span>${escapeHtml(todo.task)}</span>
        <button
            class="delete-btn"
            onclick="deleteTodo(${todo.id})"
            title="Delete this task"
        >
            🗑️ Delete
        </button>
    `;
    
    todoList.appendChild(li);
}

/**
 * Add a new todo
 */
async function addTodo() {
    const task = taskInput.value.trim();
    
    // Validation
    if (task === "") {
        showError("Please enter a task!");
        taskInput.focus();
        return;
    }

    if (task.length > 500) {
        showError("Task is too long (max 500 characters)");
        return;
    }

    // Disable button and show loading state
    const addButton = document.querySelector(".btn-add");
    const originalText = addButton.innerHTML;
    addButton.disabled = true;
    addButton.innerHTML = '<span class="btn-icon">⏳</span>';

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task: task })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        // Success feedback
        showSuccess("Task added successfully!");
        taskInput.value = "";
        taskInput.focus();
        
        // Reload todos
        await loadTodos();

    } catch (error) {
        console.error("Error adding todo:", error);
        showError("Failed to add task. Please try again.");
    } finally {
        // Re-enable button
        addButton.disabled = false;
        addButton.innerHTML = originalText;
    }
}

/**
 * Delete a todo
 */
async function deleteTodo(id) {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        showSuccess("Task deleted!");
        await loadTodos();

    } catch (error) {
        console.error("Error deleting todo:", error);
        showError("Failed to delete task. Please try again.");
    }
}

/**
 * Update the todo counter
 */
function updateTodoCount(count) {
    todoCount.textContent = count;
    todoCount.style.animation = "none";
    setTimeout(() => {
        todoCount.style.animation = "fadeIn 0.3s ease-out";
    }, 10);
}

/**
 * Escape HTML special characters for security
 */
function escapeHtml(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Show error message
 */
function showError(message) {
    const notification = createNotification(message, "error");
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3500);
}

/**
 * Show success message
 */
function showSuccess(message) {
    const notification = createNotification(message, "success");
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2500);
}

/**
 * Create a notification element
 */
function createNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const styles = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 14px 20px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        ${type === "success" ? "background: #48bb78; color: white;" : "background: #f56565; color: white;"}
    `;
    
    notification.setAttribute("style", styles);
    
    return notification;
}

// Add animation for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);