const s_name = document.querySelector(".s-name");
const s_id = document.querySelector(".s-id");
const s_class = document.querySelector(".s-class");
const s_roll = document.querySelector(".s-rollNO");
const myDiv = document.querySelector(".new-div-class");
const add_btn = document.querySelector(".add-btn");

// Load saved students
(function loadSavedStudents() {
  const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
  savedStudents.forEach(student => {
    createStudentElement(student);
  });
})();

function createStudentElement(student) {
  const tododiv = document.createElement("div");
  const ulItem = document.createElement("ul");
  
  tododiv.classList.add("students-details-data");

  // Create list items
  ['name', 'id', 'class', 'rollNO'].forEach(field => {
    const li = document.createElement("li");
    li.textContent = student[field];
    ulItem.appendChild(li);
  });

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.classList.add("dlt-btn-class");

  // Add edit button
  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtn.classList.add("edit-btn-class");

  const liActions = document.createElement("li");
  liActions.appendChild(deleteBtn);
  liActions.appendChild(editBtn);
  ulItem.appendChild(liActions);

  tododiv.appendChild(ulItem);
  myDiv.appendChild(tododiv);
}

function updateLocalStorage() {
  const allStudents = [];
  document.querySelectorAll('.students-details-data').forEach(div => {
    const items = div.querySelectorAll('li');
    allStudents.push({
      name: items[0].textContent,
      id: items[1].textContent,
      class: items[2].textContent,
      rollNO: items[3].textContent
    });
  });
  localStorage.setItem('students', JSON.stringify(allStudents));
}

add_btn.addEventListener("click", function addItem() {
  if (!s_name.value || !s_id.value || !s_class.value || !s_roll.value) {
    alert("Please fill all fields!");
    return;
  }

  const student = {
    name: s_name.value,
    id: s_id.value,
    class: s_class.value,
    rollNO: s_roll.value
  };

  if (add_btn.textContent === "Update") {
    add_btn.textContent = "Add";
    delete add_btn.dataset.editingId;
  }

  createStudentElement(student);
  updateLocalStorage();

  s_name.value = '';
  s_id.value = '';
  s_class.value = '';
  s_roll.value = '';
});

myDiv.addEventListener("click", function handleItemActions(e) {
  const item = e.target;
  
  // Delete functionality
  const deleteBtn = item.closest(".dlt-btn-class");
  if (deleteBtn) {
    deleteBtn.closest(".students-details-data").remove();
    updateLocalStorage();
    return;
  }
  
  // Edit functionality
  const editBtn = item.closest(".edit-btn-class");
  if (editBtn) {
    const studentEntry = editBtn.closest(".students-details-data");
    const items = studentEntry.querySelectorAll('li');
    
    s_name.value = items[0].textContent;
    s_id.value = items[1].textContent;
    s_class.value = items[2].textContent;
    s_roll.value = items[3].textContent;
    
    studentEntry.remove();
    updateLocalStorage();
    
    add_btn.textContent = "Update";
    add_btn.dataset.editingId = items[1].textContent;
  }
});