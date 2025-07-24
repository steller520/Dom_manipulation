// Student data management with localStorage 

// Save student data to localStorage
function saveStudent(student) {
  const students = getStudents();
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
}

// Get all students from localStorage
function getStudents() {
  const students = localStorage.getItem('students');
  return students ? JSON.parse(students) : [];
}

// Update a specific student
function updateStudent(index, updatedStudent) {
  const students = getStudents();
  students[index] = updatedStudent;
  localStorage.setItem('students', JSON.stringify(students));
}

// Delete a student
function deleteStudent(index) {
  const students = getStudents();
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
}

// Clear all students
function clearAllStudents() {
  localStorage.removeItem('students');
}

// Get form elements by ID (matching my HTML)
const form = document.querySelector('.registration-form');
const submitButton = document.querySelector('.submit-button');

// Prevent form default submission and handle it manually
form?.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page refresh
  handleSubmit();
});

function handleSubmit() {
  // Get values using IDs from my HTML
  const name = document.getElementById('name')?.value.trim();
  const studentId = document.getElementById('id')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const contactNumber = document.getElementById('contact')?.value.trim();

  if (name && studentId && email && contactNumber) {
    const student = { name, studentId, email, contactNumber };
    
    // Save to localStorage
    saveStudent(student);
    
    // Update UI
    displayStudents();
    
    // Clear form
    clearForm();
    
    console.log('Student saved to localStorage:', student);
    alert('Student registered successfully!');
  } else {
    alert('Please fill in all fields.');
  }
}

// Display students from localStorage in your existing table
function displayStudents() {
  const students = getStudents();
  const tbody = document.getElementById('student-list-entries');
  
  if (tbody) {
    tbody.innerHTML = ''; // Clear existing rows
    
    students.forEach((student, index) => {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td class="border-2 p-2">${student.name}</td>
        <td class="border-2 p-2">${student.studentId}</td>
        <td class="border-2 p-2">${student.email}</td>
        <td class="border-2 p-2">${student.contactNumber}</td>
        <td class="border-2 p-2">
          <button onclick="editStudent(${index})" class="bg-blue-500 text-white px-2 py-1 rounded">
            <i class="fas fa-edit"></i> Edit
          </button>
        </td>
        <td class="border-2 p-2">
          <button onclick="deleteStudentFromList(${index})" class="bg-red-500 text-white px-2 py-1 rounded">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
    });
  }
}

// Delete student from list
function deleteStudentFromList(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    deleteStudent(index);
    displayStudents();
    alert('Student deleted successfully!');
  }
}

// Edit student function (bonus feature)
function editStudent(index) {
  const students = getStudents();
  const student = students[index];
  
  if (student) {
    // Fill form with existing data
    document.getElementById('name').value = student.name;
    document.getElementById('id').value = student.studentId;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contactNumber;
    
    // Remove the student from list (they'll re-add with updated info)
    deleteStudent(index);
    displayStudents();
    
    alert('Student data loaded for editing. Make changes and click Register.');
  }
}

// Clear form inputs
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('id').value = '';
  document.getElementById('email').value = '';
  document.getElementById('contact').value = '';
}

// Load students when page loads
document.addEventListener('DOMContentLoaded', function() {
  displayStudents();
  console.log('Page loaded. Existing students:', getStudents());
});

// Add clear all students button functionality (optional)
function addClearAllButton() {
  const section = document.querySelector('.display-section');
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear All Students';
  clearButton.className = 'bg-red-600 text-white px-4 py-2 rounded mt-4';
  clearButton.onclick = function() {
    if (confirm('Are you sure you want to delete all students?')) {
      clearAllStudents();
      displayStudents();
      alert('All students cleared!');
    }
  };
  section?.appendChild(clearButton);
}

// Call this to add the clear button
addClearAllButton();

// Additional localStorage utilities
const localStorageUtils = {
  // Check if localStorage is available
  isAvailable: function() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  },
  
  // Get item with default value
  getItem: function(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch(e) {
      console.error('Error parsing localStorage item:', e);
      return defaultValue;
    }
  },
  
  // Set item safely
  setItem: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch(e) {
      console.error('Error setting localStorage item:', e);
      return false;
    }
  },
  
  // Remove item
  removeItem: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch(e) {
      console.error('Error removing localStorage item:', e);
      return false;
    }
  },
  
  // Clear all localStorage
  clear: function() {
    try {
      localStorage.clear();
      return true;
    } catch(e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  }
};