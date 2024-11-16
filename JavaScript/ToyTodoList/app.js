const inputField = document.getElementById("inputField");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const todoList = document.getElementById("todoList");

// 로컬 스토리지에 Todo 항목 저장
function saveTodos() {
  const todos = [];
  const todoItems = todoList.getElementsByTagName("li");
  for (let item of todoItems) {
    const text = item.getElementsByTagName("span")[0].textContent;
    const checked = item.getElementsByTagName("input")[0].checked;
    todos.push({ text, checked });
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 로컬 스토리지에서 Todo 항목 불러오기
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  for (let todo of todos) {
    const todoContent = createTodoItem(todo.text);
    todoContent.getElementsByTagName("input")[0].checked = todo.checked;
    todoList.appendChild(todoContent);
  }
}

// Todo 항목 생성
function createTodoItem(text) {
  const todoContent = document.createElement("li");
  const checkbox = document.createElement("input");
  const listItemText = document.createElement("span");
  const editBtn = document.createElement("button");

  checkbox.type = "checkbox";
  listItemText.textContent = text;
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  editBtn.addEventListener("click", editTodoItem);
  checkbox.addEventListener("change", saveTodos);

  todoContent.appendChild(checkbox);
  todoContent.appendChild(listItemText);
  todoContent.appendChild(editBtn);

  return todoContent;
}

// Todo 항목 추가
function addTodoItem() {
  const item = inputField.value.trim();
  if (item !== "") {
    const todoContent = createTodoItem(item);
    inputField.value = "";
    todoList.appendChild(todoContent);
    saveTodos();
  } else {
    alert("빈칸을 채워주세요");
  }
}

// Todo 항목 수정
function editTodoItem(event) {
  const listItem = event.target.parentElement;
  const listItemText = listItem.getElementsByTagName("span")[0];
  let text = prompt("수정할 내용을 입력해주세요", listItemText.textContent);
  if (text !== null && text.trim() !== "") {
    listItemText.textContent = text.trim();
    saveTodos();
  } else {
    alert("수정할 내용을 입력해주세요");
  }
}

// Todo 항목 삭제
function deleteTodoItems() {
  const todoContent = todoList.getElementsByTagName("li");
  for (let i = todoContent.length - 1; i >= 0; i--) {
    if (todoContent[i].getElementsByTagName("input")[0].checked) {
      todoList.removeChild(todoContent[i]);
    }
  }
  saveTodos();
}

// 이벤트 리스너 추가
addBtn.addEventListener("click", addTodoItem);
deleteBtn.addEventListener("click", deleteTodoItems);
window.addEventListener("load", loadTodos);
