const inputField = document.getElementById("inputField");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const todoList = document.getElementById("todoList");

// MARK: Add Button Event

function addToItem() {
  const todoContent = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const item = inputField.value;
  if (item !== "") {
    todoContent.appendChild(checkbox);
    todoContent.appendChild(document.createTextNode(item));
    inputField.value = "";
    todoList.appendChild(todoContent);
  } else {
    alert("빈칸을 채워주세요");
  }
}

function deleteToItem() {
  const todoContent = todoList.getElementsByTagName("li");
  for (let i = todoContent.length - 1; i >= 0; i--) {
    if (todoContent[i].getElementsByTagName("input")[0].checked) {
      todoList.removeChild(todoContent[i]);
    }
  }
}

// MARK: Delete Button Event
// deleteBtn.addEventListener("click", () => {
//   const todoContent = todoList.getElementsByTagName("li");
//   for (let i = 0; i < todoContent.length; i++) {
//     if (todoContent[i].getElementsByTagName("input").checked) {
//       todoList.removeChild(todoContent[i]);
//     }
//   }
// });

addBtn.addEventListener("click", addToItem);
deleteBtn.addEventListener("click", deleteToItem);
