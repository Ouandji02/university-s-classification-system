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
import { UNIVERSITY } from "../../../constantes/Const";
import { db, storage } from "../../../Firebase";
import { addDocument, deleteDocument } from "../../../services/services";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function CreateUniversity() {
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const navigate = useNavigate()
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const getDocuments = getDocs(collection(db, UNIVERSITY), orderBy("created"))
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
    var file = e.target[17].files[0];
    addDocument(UNIVERSITY, data, file).then(res => navigate("/admin"));
  };

  console.log("renderrrrrrrrrrrrrrrrr", data);

  return (
    <>
      <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
        Entrons les informations de l'universite
      </Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer le nom de l'universite
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
            Region ou elle se situe
            </Typography>
            <TextField
              type={"text"}
              name="region"
              placeholder="Region ou elle se situe"
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
            Entrer la categorie
            </Typography>
            <TextField
              type={"text"}
              name="categorie"
              placeholder="Entrer la categorie"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Entrer la boite postale
            </Typography>
            <TextField
              type={"text"}
              name="bp"
              placeholder="Entrer la boite postale"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
            Entrer le nombre de prix nobel
            </Typography>
            <TextField
              type={"text"}
              name="nobel"
              placeholder="Entrer le nombre de prix nobel"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Email de l'universite
            </Typography>
            <TextField
              type={"text"}
              name="email"
              placeholder="Email universite"
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
            <Button type="submit" variant="contained" color="primary">
              Enregistrer
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
}
