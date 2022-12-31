import { addDoc, collection } from "firebase/firestore/lite";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import AppBarResponsive from "../../components/AppBar";
import { db } from "../../Firebase";
import CreateUniversity from "./University/CreateUniversity";

export default function Admin() {
  useEffect(() => {
    async function getNew(){
       const add = await addDoc(collection(db, "new"), {
      name: "Jessica",
    });
    }
   getNew()
  }, []);

  return (
    <Routes>
      <Route path="/admin/createuniversity" element={<CreateUniversity />} />
    </Routes>
  );
}
