import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FACULTY, UNIVERSITY } from "../../../constantes/Const";
import { db } from "../../../Firebase";

export default function ListFaculty() {
  const navigate = useNavigate();
  const options = {
    filterType: "checkbox",
    onRowClick: (rowData, e) => {
      navigate(`/admin/filiary/${rowData[4]}`);
    },
  };
  const columns = [
    {
      name: "name",
      label: "Nom",
    },
    {
      name: "nbreLabo",
      label: "Labo",
    },
    {
      name: "phone",
      label: "phone",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "id",
      label: "id",
    },
  ];

  const [tableData, settableData] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    const getDocuments = getDocs(collection(db, FACULTY), orderBy("created"))
      .then((docs) => {
        var listItems = [];
        docs.forEach((doc) => {
          if (doc.data().idUniversity === id)
            listItems.push({
              id: doc.id,
              name: doc.data().title,
              nbreLabo: doc.data().nbreLabo,
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
          onClick={() => navigate(`/admin/createfaculty/${id}`)}
        >
          Créer une nouvelle faculte
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
