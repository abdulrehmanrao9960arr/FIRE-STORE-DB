// import { db } from "./firebase.js";
// import { collection, doc, updateDoc, getDocs, Timestamp, addDoc, query, orderBy ,doc, deleteDoc ,updateDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 

// // await deleteDoc(doc(db, "cities", "DC"));
// const titleInput = document.querySelector(".title");
// const descriptionInput = document.querySelector(".description");
// const div = document.querySelector(".div");
// const form = document.querySelector(".form"); // Ensure you select the form element

// const allTodo = [];

// // Render todos ******
// function renderTodos(todos) {
//     // Clear the div before rendering
//     div.innerHTML = '';
//     todos.forEach(todo => {
//         div.innerHTML += `<h1>${todo.title}</h1>
//                           <p>${todo.description}</p>
//                            <button class="delete-btn" data-id="${todo.id}">Delete</button>
//                            <button class="edit-btn" data-id="${todo.id}">Edit</button>
//                           `;
//     });
// }
// // Render todos ******

// // Form *****
// form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const titleValue = titleInput.value;
//     const descriptionValue = descriptionInput.value;

//     try {
//         // Add the document to Firestore
//         const docRef = await addDoc(collection(db, "Todos"), {
//             title: titleValue,
//             description: descriptionValue,
//             dateExample: Timestamp.fromDate(new Date()),
//         });
//         console.log("Document written with ID: ", docRef.id);

//         // Clear input fields
//         titleInput.value = '';
//         descriptionInput.value = '';

//         // Fetch and render todos again
//         await getTodos();
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// });
// // Form *****

// // Get old todos and render them
// async function getTodos() {
//     const querySnapshot = await getDocs(query(collection(db, "Todos"), orderBy("dateExample", "desc")));
//     allTodo.length = 0; // Clear the array before pushing new data
//     querySnapshot.forEach((doc) => {
//         const data = doc.data(); // Get the document data
//         allTodo.push({ ...data, id: doc.id }); // Push the todo object with its ID
//         console.log(`${doc.id} => ${data}`); // Log the document ID and data
//     });

//     // Render the todos
//     renderTodos(allTodo);
// }

// // Initial fetch of todos
// getTodos();

// // Delete ****
// async function deleteTodo(id) {
//     await deleteDoc(doc(db, "Todos", id));
//     await getTodos(); // Refresh the list after deletion
// }

// // Add event listeners for delete buttons
// div.addEventListener("click", async (event) => {
//     if (event.target.classList.contains("delete-btn")) {
//         const todoId = event.target.dataset.id; // Get the ID from the button's data attribute
//         await deleteTodo(todoId);
//     }
// });

// // Edit ****
// async function editTodo(id, title, description) {
//     title = prompt("enter title"); // Populate the title input
//     description=prompt("enter desc") ; // Populate the description input

//     // Update the form submission to handle editing
//     form.onsubmit = async (event) => {
//         event.preventDefault();
//         await updateDoc(doc(db, "Todos", id), {
//             title: titleInput.value,
//             description: descriptionInput.value,
//         });
//         titleInput.value = '';
//         descriptionInput.value = '';
//         await getTodos(); // Refresh the list after editing
//     };
// }

// // Add event listeners for edit buttons
// div.addEventListener("click", async (event) => {
//     if (event.target.classList.contains("edit-btn")) {
//         const todoId = event.target.dataset.id; // Get the ID from the button's data attribute
//         const todo = allTodo.find(t => t.id === todoId); // Find the todo object
//         await editTodo(todoId, todo.title, todo.description);
//     }
// });

// const washingtonRef = doc(db, "cities", "DC");

// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });





















import { db } from "./firebase.js";
import { collection, doc, updateDoc, getDocs, Timestamp, addDoc, query, orderBy, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 

const titleInput = document.querySelector(".title");
const descriptionInput = document.querySelector(".description");
const div = document.querySelector(".div");
const form = document.querySelector(".form"); // Ensure you select the form element

const allTodo = [];

// Render todos ******
function renderTodos(todos) {
    // Clear the div before rendering
    div.innerHTML = '';
    todos.forEach(todo => {
        div.innerHTML += `<h1>${todo.title}</h1>
                          <p>${todo.description}</p>
                           <button class="delete-btn" data-id="${todo.id}">Delete</button>
                           <button class="edit-btn" data-id="${todo.id}">Edit</button>
                          `;
    });
}
// Render todos ******

// Form *****
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titleValue = titleInput.value;
    const descriptionValue = descriptionInput.value;

    try {
        // Add the document to Firestore
        const docRef = await addDoc(collection(db, "Todos"), {
            title: titleValue,
            description: descriptionValue,
            dateExample: Timestamp.fromDate(new Date()),
        });
        console.log("Document written with ID: ", docRef.id);

        // Clear input fields
        titleInput.value = '';
        descriptionInput.value = '';

        // Fetch and render todos again
        await getTodos();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});
// Form *****

// Get old todos and render them
async function getTodos() {
    const querySnapshot = await getDocs(query(collection(db, "Todos"), orderBy("dateExample", "desc")));
    allTodo.length = 0; // Clear the array before pushing new data
    querySnapshot.forEach((doc) => {
        const data = doc.data(); // Get the document data
        allTodo.push({ ...data, id: doc.id }); // Push the todo object with its ID
        console.log(`${doc.id} => ${data}`); // Log the document ID and data
    });

    // Render the todos
    renderTodos(allTodo);
}

// Initial fetch of todos
getTodos();

// Delete ****
async function deleteTodo(id) {
    await deleteDoc(doc(db, "Todos", id));
    await getTodos(); // Refresh the list after deletion
}

// Add event listeners for delete buttons
div.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const todoId = event.target.dataset.id; // Get the ID from the button's data attribute
        await deleteTodo(todoId);
    }
});

// Edit ****
async function editTodo(id) {
    const todo = allTodo.find(t => t.id === id); // Find the todo object

    // Use prompt to get new title and description
    const newTitle = prompt("Enter new title:", todo.title);
    const newDescription = prompt("Enter new description:", todo.description);

    if (newTitle !== null && newDescription !== null) {
        // Update the document in Firestore
        await updateDoc(doc(db, "Todos", id), {
            title: newTitle,
            description: newDescription,
        });
        await getTodos(); // Refresh the list after editing
    }
}

// Add event listeners for edit buttons
div.addEventListener("click", async (event) => {
    if (event.target.classList.contains("edit-btn")) {
        const todoId = event.target.dataset.id; // Get the ID from the button's data attribute
        await editTodo(todoId);
    }
}); 