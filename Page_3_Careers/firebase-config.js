import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyCwXYpF3D4oZtxS0OeTVKlTu6HcN9WvMVM",
  authDomain: "spicejunction-e4c71.firebaseapp.com",
  projectId: "spicejunction-e4c71",
  storageBucket: "spicejunction-e4c71.firebasestorage.app",
  messagingSenderId: "499670132576",
  appId: "1:499670132576:web:87171bf0c8ad4ea72a2005",
  measurementId: "G-5N77Y0HCWS"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
