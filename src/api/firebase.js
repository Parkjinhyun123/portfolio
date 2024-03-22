import { uploadString } from "firebase/storage";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  docId,
  deleteDoc,
  updateDoc,
  query,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm0Lpmq4vBcSUtKU6Q4arM8MkxD-5ciGk",
  authDomain: "jh-portfolio-c5c35.firebaseapp.com",
  projectId: "jh-portfolio-c5c35",
  storageBucket: "jh-portfolio-c5c35.appspot.com",
  messagingSenderId: "786400273554",
  appId: "1:786400273554:web:9dd17fc09bd62de527b24b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getProjects = async () => {
  const projectsCol = collection(db, "Project");
  const projectSnapshot = await getDocs(projectsCol);
  const projectList = projectSnapshot.docs.map((doc) => doc.data());
  return projectList;
};

export {
  db,
  getDocs,
  getDoc,
  collection,
  setDoc,
  addDoc,
  doc,
  docId,
  deleteDoc,
  updateDoc,
  query,
  getProjects,
};
