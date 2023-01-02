import { Chip } from "@mui/material";
import { Box } from "@mui/material";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UNIVERSITY } from "../../../constantes/Const";
import { db } from "../../../Firebase";

export default function Classification() {
  const naviagate = useNavigate();
  const options = {
    filterType: "checkbox",
    onRowClick: (rowData, e) => {
      naviagate(`/admin/faculty/${rowData[4]}`);
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

  const [tableData, settableData] = useState([]);
  const [chipsClicked, setChipsClicked] = useState(0);
  const [chipsSelected, setChipsSelected] = useState("vote");

  useEffect(() => {
    const getDocuments = getDocs(
      collection(db, UNIVERSITY),
      orderBy("title", "desc")
    )
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
  }, [chipsSelected]);

  const chips = [
    {
      name: "tout",
      fonction: "tout",
    },
    {
      name: "Taux de reussite",
      fonction: "tauxReussite",
    },
    {
      name: "Renomme",
      fonction: "renomme",
    },
    {
      name: "Labo",
      fonction: "nbreLabo",
    },
  ];

  return (
    <>
      <div>
        <h1>Classement</h1>
        <Box sx={{ my: 2 }}>
          Critere :
          <Box sx={{ display: "flex" }}>
            {chips.map((item, index) => (
              <Chip
                label={item.name}
                variant={chipsClicked === index ? "contained" : "outlined"}
                sx={{ mx: 2 }}
                onClick={() => {
                  setChipsClicked(index);
                  setChipsSelected(item.fonction)
                }}
              />
            ))}
          </Box>
        </Box>
      </div>
      <MUIDataTable
        title="Liste des universites"
        columns={columns}
        data={tableData.sort((a,b) => (a[chipsSelected] > b[chipsSelected]) ? 1 : ((b[chipsSelected] > a[chipsSelected]) ? -1 : 0))
        }
        options={options}
      />
    </>
  );
}
