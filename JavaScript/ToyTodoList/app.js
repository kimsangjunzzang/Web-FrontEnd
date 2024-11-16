const inputField = document.getElementById("inputField");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const todoList = document.getElementById("todoList");

function createTodoItem(text) {
  const todoContent = document.createElement("li");
  const checkbox = document.createElement("input");
  const listItemText = document.createElement("span");
  checkbox.type = "checkbox";
  listItemText.textContent = text;

  todoContent.appendChild(checkbox);
  todoContent.appendChild(listItemText);

  return todoContent;
}

function addTodoItem() {
  const item = inputField.value.trim();
  if (item !== "") {
    const todoContent = createTodoItem(item);
    inputField.value = "";
    todoList.appendChild(todoContent);
  } else {
    alert("빈칸을 채워주세요");
  }
}

function deleteTodoItems() {
  const todoContent = todoList.getElementsByTagName("li");
  for (let i = todoContent.length - 1; i >= 0; i--) {
    if (todoContent[i].getElementsByTagName("input")[0].checked) {
      todoList.removeChild(todoContent[i]);
    }
  }
}

addBtn.addEventListener("click", addTodoItem);
deleteBtn.addEventListener("click", deleteTodoItems);

// MARK: Delete Button Event
// deleteBtn.addEventListener("click", () => {
//   const todoContent = todoList.getElementsByTagName("li");
//   for (let i = 0; i < todoContent.length; i++) {
//     if (todoContent[i].getElementsByTagName("input").checked) {
//       todoList.removeChild(todoContent[i]);
//     }
//   }
// });
