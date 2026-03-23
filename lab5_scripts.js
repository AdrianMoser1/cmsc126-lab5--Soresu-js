//empty array to store student objects
let studentList = [];

// show current date and time in the specific format
function time_now() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    const dateString = `Today is ${monthName} ${date}, ${year}, ${dayName}.`;
    const timeString = `The current time is ${hours}:${minutes} ${ampm}.`;
    
    // have a div with id="display-date" in HTML ples
    document.getElementById("display-date").innerText = `${dateString}\n${timeString}`;
}

//Generate Unique Student Number (2024 + 5 digits)
function generateUniqueStudent Number() {
    let isUnique = false;
    let newID = "";

    while (!isUnique) {
        const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generates 5 digits
        newID = "2024" + randomDigits;
        
        // Check if this ID already exists in the studentList array
        isUnique = !studentList.some(student => student.studentNumber === newID);
    }
    return newID;
}

// Form Validation Function
function validateForm(name, age, email) {
    // Name: > 5 chars and contains one whitespace
    const nameRegex = /^[^\s]+\s[^\s]+$/; 
    if (name.length <= 5 || !nameRegex.test(name)) {
        alert("Error: Name must be > 5 characters and contain exactly one space between names.");
        return false;
    }

    // Age: Number only, > 18 and < 99
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum <= 18 || ageNum >= 99) {
        alert("Error: Age must be a number between 19 and 98.");
        return false;
    }

    // Email: ends with @up.edu.ph
    if (!email.endsWith("@up.edu.ph")) {
        alert("Error: Email must end with @up.edu.ph");
        return false;
    }

    return true;
}

//Add Student Function (Called on Submit)
function add_student(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById("student-name").value;
    const age = document.getElementById("student-age").value;
    const email = document.getElementById("student-email").value;
    const course = document.getElementById("student-course").value;

    if (validateForm(name, age, email)) {
        const newStudent = {
            studentNumber: generateUniqueStudentNumber(),
            name: name,
            age: parseInt(age),
            email: email,
            course: course
        };

        studentList.push(newStudent);
        alert(`Student Added! ID: ${newStudent.studentNumber}`);
        document.getElementById("student-form").reset(); // Clear the form
    }
}

//Search Student Function
function find_student() {
    const searchID = document.getElementById("search-id").value;
    const found = studentList.find(s => s.studentNumber === searchID);
    const displayArea = document.getElementById("search-result");

    if (found) {
        displayArea.innerHTML = `
            <strong>Record Found:</strong><br>
            ID: ${found.studentNumber}<br>
            Name: ${found.name}<br>
            Age: ${found.age}<br>
            Email: ${found.email}<br>
            Course: ${found.course}
        `;
    } else {
        displayArea.innerText = "Student record does not exist";
    }
}

//Display All Students Function
function display_list() {
    const listArea = document.getElementById("all-students-list");
    
    if (studentList.length === 0) {
        listArea.innerText = "The list is currently empty.";
        return;
    }

    let htmlContent = "<h3>Current Students:</h3><ul>";
    studentList.forEach(student => {
        htmlContent += `<li>ID: ${student.studentNumber} | Name: ${student.name} | Course: ${student.course}</li>`;
    });
    htmlContent += "</ul>";
    
    listArea.innerHTML = htmlContent;
}
