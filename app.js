import { db } from "./firebase.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 

const form = document.querySelector(".form");
const title = document.querySelector(".title");
const description = document.querySelector(".description");
const div = document.querySelector(".div");

form.addEventListener("submit" ,async (event)=>{
event.preventDefault();
console.log(title.value);
console.log(description.value);
div.innerHTML += `<h1>${title.value}</h1><br>
  <p>${description.value}</p> `
try {
  const docRef = await addDoc(collection(db, "Todos"), {
    title:title.value,
    description:description.value
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

})


// async function getTodos(){
//     const querySnapshot = await getDocs(collection(db, "Todos"));
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     div.innerHTML +=`${doc.title} , ${doc.description}`  
//     });
// }

async function getTodos() {
    const querySnapshot = await getDocs(collection(db, "Todos"));
    querySnapshot.forEach((doc) => {
        const data = doc.data(); // Get the document data
        console.log(`${doc.id} => ${data}`); // Log the document ID and data
        div.innerHTML += `<h1>${data.title}</h1> <p>${data.description}</p>`; // Access title and description
    });
}
getTodos()
