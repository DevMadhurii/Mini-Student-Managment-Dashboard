let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addOrUpdateStudent() {
  let name = document.getElementById("name").value;
  let course = document.getElementById("course").value;
  let status = document.getElementById("status").value;
  let editIndex = document.getElementById("editIndex").value;

  if (name === "" || course === "" || status === "") {
    alert("Fill all fields");
    return;
  }

  let student = { name, course, status };

  if (editIndex === "") {
    students.push(student);
  } else {
    students[editIndex] = student;
    document.getElementById("editIndex").value = "";
  }

  saveData();
  clearInputs();
  renderTable();
}

function renderTable() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  students.forEach((s, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.course}</td>
        <td>${s.status}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  renderTable();
}

function editStudent(index) {
  document.getElementById("name").value = students[index].name;
  document.getElementById("course").value = students[index].course;
  document.getElementById("status").value = students[index].status;
  document.getElementById("editIndex").value = index;
}

function searchStudent() {
  let value = document.getElementById("search").value.toLowerCase();
  let rows = document.querySelectorAll("#tableBody tr");

  rows.forEach(row => {
    let name = row.children[0].innerText.toLowerCase();
    row.style.display = name.includes(value) ? "" : "none";
  });
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("course").value = "";
  document.getElementById("status").value = "";
}

renderTable();

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  let btn = document.getElementById("darkBtn");

  if (document.body.classList.contains("dark")) {
    btn.innerText = "☀️ Light Mode";
  } else {
    btn.innerText = "🌙 Dark Mode";
  }
}