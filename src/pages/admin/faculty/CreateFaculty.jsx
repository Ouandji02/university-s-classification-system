import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db, storage } from "../../../Firebase";
import { addDocument, addDocumentWithoutImage, deleteDocument } from "../../../services/services";
import { FACULTY } from "../../../constantes/Const";

export default function CreateFaculty() {
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
    console.log(data)
  };

  useEffect(() => {
    const getDocuments = getDocs(collection(db, FACULTY), orderBy("created"))
      .then((docs) => {
        var listItems = [];
        docs.forEach((doc) => {
          console.log(doc.data());
          listItems.push({ ...doc.data(), id: doc.id });
        });
        setItems(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log("hjgfghjklkjhgfddghjkl", items);
      })
      .catch((error) => {
        console.log("echoue");
      });
    return () => getDocuments;
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    var tab = items;
    tab.push(data);
    addDocumentWithoutImage(FACULTY, data).catch(error => alert("echouee"));
  };

  console.log("renderrrrrrrrrrrrrrrrrkk", data);

  return (
    <>
      <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
        Entrons les informations concernants la facultes
      </Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer le nom de la faculte
            </Typography>
            <TextField
              type={"text"}
              name="title"
              placeholder="Entrer le nom de l'universite"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Nombre de laboratoire
            </Typography>
            <TextField
              type={"text"}
              name="nbreLabo"
              placeholder="Nombre de laboratoire"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer le numero de phone
            </Typography>
            <TextField
              type={"text"}
              name="phone"
              placeholder="Entrer le numero de phone"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Email de la faculte
            </Typography>
            <TextField
              type={"text"}
              name="email"
              placeholder="Email faculte"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Description de l'universite
            </Typography>
            <TextField
              type={"text"}
              name="text"
              placeholder="Description de l'universite"
              fullWidth
              multiline
              rows={5}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
}
