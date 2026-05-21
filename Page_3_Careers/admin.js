// Firebase Imports

import { auth, db } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection,
  getDocs,
  query,
  orderBy
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// --------------------------------------------------
// TEST ADMIN CREDENTIALS
// Email: admin@spicejunction.com
// Password: admin123
// --------------------------------------------------


// DOM Elements

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginError = document.getElementById("loginError");

const loginBox = document.getElementById("loginBox");
const dashboard = document.getElementById("dashboard");

const logoutBtn = document.getElementById("logoutBtn");

const applicationsTable = document.getElementById("applicationsTable");

const loadingText = document.getElementById("loadingText");

const emptyText = document.getElementById("emptyText");

const tableContainer = document.getElementById("tableContainer");


// Login Function

loginForm.addEventListener("submit", async (event)=>{

  event.preventDefault();

  loginError.innerText = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try{

    await signInWithEmailAndPassword(auth, email, password);

  }
  catch(error){

    loginError.innerText =
      "Invalid email or password";

  }

});


// Auth State Check

onAuthStateChanged(auth, (user)=>{

  if(user){

    loginBox.classList.add("hidden");

    dashboard.classList.remove("hidden");

    loadApplications();

  }
  else{

    loginBox.classList.remove("hidden");

    dashboard.classList.add("hidden");

  }

});


// Load Applications

async function loadApplications(){

  loadingText.classList.remove("hidden");

  tableContainer.classList.add("hidden");

  emptyText.classList.add("hidden");

  applicationsTable.innerHTML = "";

  try{

    // Fetch Applications Sorted By Latest

    const applicationsRef =
      collection(db, "applications");

    const q = query(
      applicationsRef,
      orderBy("submittedAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    loadingText.classList.add("hidden");

    // Empty State

    if(querySnapshot.empty){

      emptyText.classList.remove("hidden");

      return;

    }

    tableContainer.classList.remove("hidden");

    let serialNumber = 1;

    querySnapshot.forEach((doc)=>{

      const data = doc.data();

      const row = document.createElement("tr");

      row.innerHTML = `

        <td>${serialNumber}</td>

        <td>${data.fullName}</td>

        <td>${data.email}</td>

        <td>${data.phone}</td>

        <td>${data.position}</td>

        <td>${data.experience}</td>

        <td>${data.reason}</td>

       <td>
  ${
    data.submittedAt
    ? new Date(
        data.submittedAt.seconds * 1000
      ).toLocaleString()
    : "N/A"
  }
</td>

      `;

      applicationsTable.appendChild(row);

      serialNumber++;

    });

  }
  catch(error){

    loadingText.innerText =
      "Failed to load applications.";

  }

}


// Logout

logoutBtn.addEventListener("click", async ()=>{

  await signOut(auth);

});