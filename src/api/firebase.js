import { listAll } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

const getProjects = async () => {
  const projectsCol = collection(db, "Project");
  const projectSnapshot = await getDocs(projectsCol);
  const projectList = projectSnapshot.docs.map((doc) => doc.data());
  return projectList;
};

const getImageUrls = async (folderPath) => {
  const listRef = ref(storage, folderPath);
  try {
    const result = await listAll(listRef);
    const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
    const urls = await Promise.all(urlPromises);
    return urls;
  } catch (error) {
    console.error("Error fetching image URLs: ", error);
    return [];
  }
};

export {
  db,
  getDocs,
  getDoc,
  collection,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  getProjects,
  getImageUrls,
};
