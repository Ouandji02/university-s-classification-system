import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FILIARY, UNIVERSITY } from "../../../constantes/Const";
import { db } from "../../../Firebase";

export default function ListFiliary() {
  const options = {
    filterType: "checkbox",
    onRowClick: (rowData, e) => {
      console.log("reussi", rowData);
    },
  };
  const columns = [
    {
      name: "name",
      label: "Nom",
    },
    {
      name: "article",
      label: "article",
    },
    {
      name: "tr",
      label: "Taux reussite",
    },
    {
      name: "nbreEtudiant",
      label: "Etudiants",
    },
    {
      name: "prix",
      label: "Nombre prix",
    },
    {
      name: "phone",
      label: "phone",
    },
    {
      name: "email",
      label: "Email",
    },
  ];

  const [tableData, settableData] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    const getDocuments = getDocs(collection(db, FILIARY), orderBy("created"))
      .then((docs) => {
        var listItems = [];
        docs.forEach((doc) => {
          listItems.push({
            ID: doc.id,
            name: doc.data().title,
            article: doc.data().nbreArticle,
            tr: doc.data().tauxReussite,
            nbreEtudiants: doc.data().nbreEtudiant,
            phone: doc.data().phone,
            email: doc.data().email,
          });
        });
        console.log("sadkjfffffffffffffffffff", listItems);
        settableData(listItems);
      })
      .catch((error) => {
        console.log("echoue");
      });
    return () => getDocuments;
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={() => navigate(`/admin/createfiliary/${id}`)}
        >
          Créer une nouvelle filiere
        </Button>
      </Box>
      <MUIDataTable
        title="Liste des universites"
        columns={columns}
        data={tableData}
        options={options}
      />
    </>
  );
}
