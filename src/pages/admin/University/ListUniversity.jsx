import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UNIVERSITY } from "../../../constantes/Const";
import { db } from "../../../Firebase";
import { deleteDocument } from "../../../services/services";

export default function ListUniversity() {
  const naviagate = useNavigate();
  const [tableData, settableData] = useState([]);

  const options = {
    filterType: "checkbox",
    onRowClick: (rowData, e) => {
      naviagate(`/admin/faculty/${rowData[4]}`);
    },
    onRowsDelete: (rowsDelete, data) => {
      data.map(row => {
       deleteDocument(UNIVERSITY, row[4])
        .then((res) => {
          settableData([])
          alert("suprimer")
        })
        .catch((err) => "l'universite n'a pas ete supprime"); 
      })
    },
  };
  const columns = [
    {
      name: "name",
      label: "Nom",
    },
    {
      name: "region",
      label: "Region",
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
    {
      name: "logo",
      label: "logo",
    },
  ];


  useEffect(() => {
    const getDocuments = getDocs(collection(db, UNIVERSITY), orderBy("created"))
      .then((docs) => {
        var listItems = [];
        docs.forEach((doc) => {
          listItems.push({
            id: doc.id,
            name: doc.data().title,
            region: doc.data().region,
            phone: doc.data().phone,
            email: doc.data().email,
            logo: <img src={doc.data().image} height={40} width={40} />,
          });
        });
        console.log("sadkjfffffffffffffffffff", listItems);
        settableData(listItems);
      })
      .catch((error) => {
        console.log("echoue");
      });
    return () => getDocuments;
  }, [tableData]);

  return (
    <>
      <MUIDataTable
        title="Liste des universites"
        columns={columns}
        data={tableData}
        options={options}
      />
    </>
  );
}
