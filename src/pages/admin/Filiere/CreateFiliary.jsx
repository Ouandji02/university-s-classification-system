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
import { db, storage } from "../../../Firebase";
import { addDocument, addDocumentWithoutImage, deleteDocument } from "../../../services/services";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FILIARY } from "../../../constantes/Const";
import { useParams } from "react-router-dom";

export default function CreateFiliary() {
  const id = useParams().id;
  const [data, setData] = useState({idFaculty: id});
  const [items, setItems] = useState([]);
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var tab = items;
    tab.push(data);
    addDocumentWithoutImage(FILIARY, data);
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
              Entrer le nom de la filiere
            </Typography>
            <TextField
              type={"text"}
              name="title"
              placeholder="Entrer le nom de la filiere"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Nombre d'article
            </Typography>
            <TextField
              type={"text"}
              name="nbreArticle"
              placeholder="Nombre d'article"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Taux de reussite
            </Typography>
            <TextField
              type={"text"}
              name="tauxReussite"
              placeholder="Taux de reussite"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Entrer la categorie
            </Typography>
            <TextField
              type={"text"}
              name="nbreEtudiant"
              placeholder="Nombre d'etudiant"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Nombre de prix
            </Typography>
            <TextField
              type={"text"}
              name="nbrePrix"
              placeholder="Nombre de prix"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Email de la filiere
            </Typography>
            <TextField
              type={"text"}
              name="email"
              placeholder="Email de la filiere"
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
