import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import ItemCard from "../../../components/ItemCard";
import { addDocument } from "../../../services/services";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import { useEffect } from "react";
import { db } from "../../../Firebase";
import { END_SECTION } from "../../../constantes/Const";

export default function EndSection() {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    const getDocuments = getDocs(
      collection(db, END_SECTION),
      orderBy("created")
    )
      .then((docs) => {
        var listlist = [];
        setList(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(list);
      })
      .catch((error) => {
        console.log("echoue");
      });
    return () => getDocuments;
  }, []);
  const onSubmit = (e) => {
    console.log("sdl;kjhgfkjdsl");
    e.preventDefault();
    var tab = list;
    tab.push(data);
    setList(tab);
    addDocument(END_SECTION, data);
  };
  return (
    <>
      <Typography variant="h4">
        Entrons les elements de la derniere section
      </Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer un titre titre
            </Typography>
            <TextField
              type={"text"}
              name="title"
              placeholder="Entrer un titre"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer un texte correspondant
            </Typography>
            <TextField
              type={"text"}
              name="text"
              placeholder="Entrer un texte correspondant"
              fullWidth
              onChange={handleChange}
              multiline
              rows={5}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button type="submit" variant="contained">
              Enregistrer
            </Button>
          </Box>
        </form>
      </Card>
      {list.length != 0 ? (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" component={"div"} sx={{ mb: 3 }}>
            Liste des messages
          </Typography>
          <Grid container spacing={2}>
            {list.map((element, key) => (
              <ItemCard
                item={element}
                key={key}
                onClick={() => {
                  deleteDocument(END_SECTION, element.id);
                }}
              />
            ))}
          </Grid>
        </Box>
      ) : null}
    </>
  );
}
