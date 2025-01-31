import { db } from "./firebase.js";
import { collection, getDocs, Timestamp, addDoc, query, orderBy ,doc, deleteDoc ,updateDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 

const form = document.querySelector(".form");
const titleInput = document.querySelector(".title");
const descriptionInput = document.querySelector(".description");
const div = document.querySelector(".div");

const allTodo = [];

//  render todos ******
function renderTodos(todos) {
    // Clear the div before rendering
    div.innerHTML = '';
    todos.forEach(todo => {
        div.innerHTML += `<h1>${todo.title}</h1>
                          <p>${todo.description}</p>
                           <button class="delete-btn">Delete</button>
                           <button class="edit-btn">Edit</button>
                          `;
    });
}
//  render todos ******


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

// delete ****

// const dlttodo = document.querySelectorAll(".delete-btn");
// dlttodo.forEach((item) => {
//     item.addEventListener('click', async (event) => {
//         event.preventDefault();
//         console.log("delte");
//         await deleteDoc(doc(db, "cities", "DC"));
        
//     })
// })


// delete ****

// const edit = document.querySelectorAll("edit-btn");
//  edit.forEach(item => {
//     item.addEventListener("click" , async (event)=>{
// event.preventDefault();
//  console.log("edit");
//     })
// });

// Correctly select the edit buttons
const editButtons = document.querySelectorAll(".edit-btn"); // Use the correct class selector

editButtons.forEach(item => {
    item.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log("edit"); // This will log when the edit button is clicked
        // You can add your edit logic here
    });
});