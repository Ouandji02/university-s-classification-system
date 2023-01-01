import { Button } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  updateDoc,
} from "firebase/firestore/lite";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UNIVERSITY } from "../../../constantes/Const";
import { useFirebaseAuthContext } from "../../../context/AuthContext";
import { db } from "../../../Firebase";

const Vote = () => {
  const naviagate = useNavigate();
  const user = useFirebaseAuthContext();
  console.log("jdksghhkjlksdjjhjsjkklsdhkj", user);
  const options = {
    filterType: "checkbox",
    onRowClick: async (rowData, e) => {
      if (user.vote === true)
        await updateDoc(doc(db, UNIVERSITY, rowData[4]), {
          vote: 1,
        }).then((res) =>
          updateDoc(doc(db, "user", user.uid), {
            voter: true,
          })
        );
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
      name: "actions",
      label: "actions",
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
            name: doc.data().title,
            region: doc.data().region,
            phone: doc.data().phone,
            email: doc.data().email,
            actions: <Button variant="contained" disabled >Voter</Button>,
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
      <div>
        <h1>Choisir votre universite pour voter</h1>
      </div>
      <MUIDataTable
        title="Liste des universites"
        columns={columns}
        data={tableData}
        options={options}
      />
    </>
  );
};

export default Vote;
