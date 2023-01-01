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
import ItemCard from "../../../components/ItemCard";
import { BANNER } from "../../../constantes/Const";
import { db, storage } from "../../../Firebase";
import { addDocument, addDocumentWithoutImage, deleteDocument } from "../../../services/services";

export default function CreateCritere() {
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const getDocuments = getDocs(collection(db, "critere"), orderBy("created"))
      .then((docs) => {
        var listItems = [];
        docs.forEach((doc) => {
          console.log(doc.data());
          listItems.push({ ...doc.data(), id: doc.id });
        });
        setItems(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    addDocumentWithoutImage("critere", data);
  };

  console.log("renderrrrrrrrrrrrrrrrr", items);

  return (
    <>
      <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
        Entrons les informations de la filiere
      </Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer les differents criteres de recherche
            </Typography>
            <TextField
              type={"text"}
              name="title"
              placeholder="Entrer le nom du critere"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{mt:2}}>
          <TextField
              type={"text"}
              name="function"
              placeholder="Entrer la fonction du critere"
              fullWidth
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
      {items.length != 0 ? (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" component={"div"} sx={{ mb: 3 }}>
            Liste des criteres
          </Typography>
          <Grid container spacing={2}>
            {items.map((element, key) => (
              <ItemCard
                item={element}
                key={key}
                onClick={() => {
                  deleteDocument(BANNER, element.id);
                }}
              />
            ))}
          </Grid>
        </Box>
      ) : null}
    </>
  );
}
