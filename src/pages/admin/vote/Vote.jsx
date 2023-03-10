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
  const [reload, setRelaod] = useState(false);
  console.log("jdksghhkjlksdjjhjsjkklsdhkj", user);
  const options = {
    filterType: "checkbox",
    onRowClick: async (rowData, e) => {},
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
      name: "vote",
      label: "vote",
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
    const getDocuments = getDocs(collection(db, UNIVERSITY), orderBy("vote","desc"))
      .then((docs) => {
        var listItems = [];
        docs.forEach((doc) => {
          listItems.push({
            id: doc.id,
            name: doc.data().title,
            region: doc.data().region,
            phone: doc.data().phone,
            email: doc.data().email,
            vote: doc.data().vote,
            actions: (
              <Button
                variant="contained"
                disabled={user.voter ? true : false}
                onClick={ () => {
                 updateDoc(doc(db, UNIVERSITY, doc.id), {
                    vote: 1
                  })
                    .then((res) =>
                      updateDoc(doc(db, "user", user.uid), {
                        voter: true,
                      })
                      .then((res) => {alert("Vous avez vot??")})
                        .catch((err) =>
                          alert("le vote n'a pas ??t?? pris en compte")
                        )
                    )
                    .catch((err) => alert("une erreur est survenue"));
                }}
              >
                Voter
              </Button>
            ),
          });
        });
        console.log("sadkjfffffffffffffffffff", listItems);
        settableData(listItems);
      })
      .catch((error) => {
        console.log("echoue");
      });
    return () => getDocuments;
  }, [reload]);

  return (
    <>
      <div>
        <h1>Choisir votre universite pour voter</h1>
        {user.voter ? (
          <Button variant="outlined" color="error">
            Vous avez deja vote
          </Button>
        ) : null}
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
