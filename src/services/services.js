import { addDoc, collection, deleteDoc, doc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../Firebase";

export const addDocument = async (collectionName, data, file) => {
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log("error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        data.image = downloadUrl;
        addDoc(collection(db, collectionName), data);
        console.log(downloadUrl);
      });
    }
  );
};

export const addDocumentWithoutImage = async (collectionName, data) => {
  addDoc(collection(db, collectionName), data).then((res) =>
    console.log("reussi").catch((err) => console.log("echouee"))
  );
};

export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id))
    .then((response) => alert("Suppression reussi"))
    .catch((error) => alert("echec lors de la suppression"));
};
