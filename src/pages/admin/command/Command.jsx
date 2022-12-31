import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UNIVERSITY } from "../../../constantes/Const";
import { db } from "../../../Firebase";

export default function Command() {
  const naviagate = useNavigate()
  const options = {
    filterType: 'checkbox',
    onRowClick : (rowData,e)=>{
      naviagate(`/admin/faculty/${rowData[4]}`)
    }
  };
  const columns = [
    {
      name: "name",
      label: "Nom",
    },
    {
      name : "region",
      label : "Region"
    },
    {
      name : "phone",
      label : "phone"
    },
    {
      name : "email",
      label : "Email"
    },
    {
      name : "id",
      label : "id"
    },
  ];
  
  const [tableData, settableData] = useState([]);

  useEffect(() => {
    const getDocuments = getDocs(collection(db, UNIVERSITY), orderBy("created"))
      .then((docs) => {
        var listItems = [];
        docs.forEach((doc) => {
          listItems.push({ 
            id: doc.id,
            name : doc.data().title,
            region : doc.data().region,
            phone : doc.data().phone,
            email : doc.data().email 
          });
        });
        console.log("sadkjfffffffffffffffffff",listItems)
        settableData(listItems)
      })
      .catch((error) => {
        console.log("echoue");
      });
    return () => getDocuments;
  }, []);

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
