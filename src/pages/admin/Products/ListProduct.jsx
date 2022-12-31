import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT } from "../../../constantes/Const";
import { db } from "../../../Firebase";

export default function ListProduct() {
  const navigate = useNavigate();
  const options = {
    filterType: "checkbox",
    onRowClick: (rowData, e) => {
      navigate(`/admin/detailproduct/${rowData[0]}`);
    },
  };
  const [list, setList] = useState([]);
  useEffect(() => {
    const getDocuments = getDocs(collection(db, PRODUCT), orderBy("created"))
      .then((docs) => {
        setList(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(list);
      })
      .catch((error) => {
        console.log("echoue");
      });
    return () => getDocuments;
  }, []);
  const columns = [
    {
      name: "id",
      label: "Identifiant",
    },
    {
      name: "name",
      label: "name",
    },
    {
      name: "price",
      label: "prix",
    },
  ];

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/createproduct")}
        >
          Créer un nouveau produit
        </Button>
      </Box>
      <MUIDataTable
        title="Liste des commandes"
        columns={columns}
        data={list}
        options={options}
      />
    </div>
  );
}
