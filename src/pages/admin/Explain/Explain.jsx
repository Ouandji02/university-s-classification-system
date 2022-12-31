import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import ItemCardExplain from "../../../components/ItemCardExplain";
import { addDocument } from "../../../services/services";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import { useEffect } from "react";
import { db } from "../../../Firebase";
import { EXPLAIN } from "../../../constantes/Const";

export default function Explain() {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    const getDocuments = getDocs(collection(db, EXPLAIN), orderBy("created"))
      .then((docs) => {
        var listlist = [];
        docs.forEach((doc) => {
          console.log(doc.data());
          listlist.push(doc.data());
        });
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
    const file = e.target[17].files[0];
    addDocument(EXPLAIN, data, file);
    console.log(e.target.name);
  };
  return (
    <>
      <Typography variant="h4">
        Entrons les elements de la partie explication
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une premiere enumeration correspondant
            </Typography>
            <TextField
              type={"text"}
              name="enumeration1"
              placeholder="Entrer une enumeration correspondant"
              fullWidth
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une deuxieme enumeration correspondant
            </Typography>
            <TextField
              type={"text"}
              name="enumeration2"
              placeholder="Entrer une enumeration correspondant"
              fullWidth
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une troisieme enumeration correspondant
            </Typography>
            <TextField
              type={"text"}
              name="enumeration3"
              placeholder="Entrer une enumeration correspondant"
              fullWidth
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une quatrieme enumeration correspondant
            </Typography>
            <TextField
              type={"text"}
              name="enumeration4"
              placeholder="Entrer une enumeration correspondant"
              fullWidth
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une image correspondante
            </Typography>
            <TextField
              type="file"
              name="image"
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
            Liste des elements
          </Typography>
          <Grid container spacing={2}>
            {list.map((element, key) => (
              <ItemCardExplain
                key={key}
                item={element}
                onClick={() => {
                  deleteDocument(EXPLAIN, element.id);
                }}
              />
            ))}
          </Grid>
        </Box>
      ) : null}
    </>
  );
}
