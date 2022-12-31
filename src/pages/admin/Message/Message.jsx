import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import ItemCard from "../../../components/ItemCard";
import { addDocument } from "../../../services/services";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import { useEffect } from "react";
import { db } from "../../../Firebase";
import { MESSAGE } from "../../../constantes/Const";

export default function Message() {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    const getDocuments = getDocs(collection(db, MESSAGE), orderBy("created"))
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
    e.preventDefault();
    var tab = list;
    tab.push(data);
    setList(tab);
    var file = e.target[5].files[0];
    addDocument(MESSAGE, data, file);
  };
  return (
    <>
      <Typography variant="h4">Entrer les differents messages</Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une ville
            </Typography>
            <TextField
              type={"text"}
              name="title"
              placeholder="Entrer une ville"
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une image correspondante
            </Typography>
            <TextField
              type="file"
              name="text"
              placeholder="Entrer un titre"
              fullWidth
              onChange={handleChange}
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
                  deleteDocument(MESSAGE, element.id);
                }}
              />
            ))}
          </Grid>
        </Box>
      ) : null}
    </>
  );
}
