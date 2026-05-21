// Firebase Imports

import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// DOM Elements

const applicationForm =
  document.getElementById("applicationForm");

const submitBtn =
  document.getElementById("submitBtn");

const successMessage =
  document.getElementById("successMessage");

const errorMessage =
  document.getElementById("errorMessage");


// Input Fields

const fullName =
  document.getElementById("fullName");

const email =
  document.getElementById("email");

const phone =
  document.getElementById("phone");

const position =
  document.getElementById("position");

const experience =
  document.getElementById("experience");

const reason =
  document.getElementById("reason");


// Error Elements

const nameError =
  document.getElementById("nameError");

const emailError =
  document.getElementById("emailError");

const phoneError =
  document.getElementById("phoneError");

const positionError =
  document.getElementById("positionError");

const experienceError =
  document.getElementById("experienceError");

const reasonError =
  document.getElementById("reasonError");


// Form Submit

applicationForm.addEventListener("submit", async (event)=>{

  event.preventDefault();

  clearErrors();

  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  let isValid = true;

  // Name Validation

  if(fullName.value.trim() === ""){

    nameError.innerText =
      "Name is required";

    isValid = false;
  }

  // Email Validation

  const emailPattern =
    /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if(email.value.trim() === ""){

    emailError.innerText =
      "Email is required";

    isValid = false;

  }
  else if(!emailPattern.test(email.value.trim())){

    emailError.innerText =
      "Please enter a valid email";

    isValid = false;
  }

  // Phone Validation

  if(phone.value.trim() === ""){

    phoneError.innerText =
      "Phone number is required";

    isValid = false;
  }

  // Position Validation

  if(position.value === ""){

    positionError.innerText =
      "Please select a position";

    isValid = false;
  }

  // Experience Validation

  if(experience.value === ""){

    experienceError.innerText =
      "Experience is required";

    isValid = false;
  }

  // Reason Validation

  if(reason.value.trim() === ""){

    reasonError.innerText =
      "Reason is required";

    isValid = false;

  }
  else if(reason.value.trim().length < 20){

    reasonError.innerText =
      "Minimum 20 characters required";

    isValid = false;
  }

  // Stop Submit If Invalid

  if(!isValid){
    return;
  }

  // Disable Button

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  try{

    // Save To Firestore

    await addDoc(
      collection(db, "applications"),
      {

        fullName: fullName.value.trim(),

        email: email.value.trim(),

        phone: phone.value.trim(),

        position: position.value,

        experience: experience.value,

        reason: reason.value.trim(),

    submittedAt: serverTimestamp()
      }
    );

    // Success Message

    successMessage.classList.remove("hidden");

    // Clear Form

    applicationForm.reset();

  }
  catch(error){

    errorMessage.classList.remove("hidden");

  }

  // Re-enable Button

  submitBtn.disabled = false;

  submitBtn.innerText =
    "Submit Application";

});


// Clear Errors Function

function clearErrors(){

  nameError.innerText = "";
  emailError.innerText = "";
  phoneError.innerText = "";
  positionError.innerText = "";
  experienceError.innerText = "";
  reasonError.innerText = "";

}