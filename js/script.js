const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const feedbackMsg = document.getElementById("feedback-msg");

const filterBtn = document.getElementById("filter-btn");
const resetFilterBtn = document.getElementById("reset-filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Add Task
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    showMessage("Task and date must be filled in", "error");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${task}</td>
    <td>${formatDate(date)}</td>
    <td><span>Belum</span></td>
    <td><button class="btn-delete">🗑️</button></td>
  `;

  todoList.appendChild(row);
  todoInput.value = "";
  dateInput.value = "";
  showMessage("Task added successfully", "success");

  const noTask = document.querySelector(".no-task");
  if (noTask) noTask.remove();
});

// delete one task
todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    const row = e.target.closest("tr");
    row.remove();
    showMessage("Task is deleted", "success");

    if (todoList.rows.length === 0) {
      todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    }
  }
});

// Delete All
deleteAllBtn.addEventListener("click", function () {
  todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
  showMessage("All tasks are deleted", "success");
});

// Filter 
filterBtn.addEventListener("click", function () {
  const today = new Date().toISOString().split("T")[0];

  const rows = todoList.querySelectorAll("tr");
  rows.forEach(row => {
    const dateCell = row.cells[1];
    if (!dateCell) return;
    const taskDate = new Date(dateCell.textContent.trim()).toISOString().split("T")[0];

    if (taskDate !== today) {
      row.style.display = "none";
    } else {
      row.style.display = "";
    }
  });

  showMessage("Displays today's tasks", "success");
});

// Reset Filter
resetFilterBtn.addEventListener("click", function () {
  const rows = todoList.querySelectorAll("tr");
  rows.forEach(row => {
    row.style.display = "";
  });

  showMessage("Displays all tasks", "success");
});

// Helper
function showMessage(msg, type) {
  feedbackMsg.textContent = msg;
  feedbackMsg.style.color = type === "success" ? "#a9a9e6ff" : "#ff5252";
  feedbackMsg.classList.remove("hidden");

  setTimeout(() => {
    feedbackMsg.classList.add("hidden");
  }, 2000);
}

function formatDate(raw) {
  const date = new Date(raw);
  return date.toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" });
}

