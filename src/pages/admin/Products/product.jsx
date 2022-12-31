import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { addDocument } from "../../../services/services";
import { PRODUCT } from "../../../constantes/Const";

export default function Product() {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var tab = list;
    tab.push(data);
    setList(tab);
    const file = e.target[10].files[0]
    addDocument(PRODUCT, data, file);
  };
  console.log("renderrrrrrrrrrrrrr", list);
  return (
    <>
      <Typography variant="h4">Entrer vos produits</Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid xs={6} item>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Entrer le nom du produit
                </Typography>
                <TextField
                  type={"text"}
                  name="name"
                  placeholder="Entrer un titre"
                  fullWidth
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Entrer le prix
                </Typography>
                <TextField
                  type={"number"}
                  name="price"
                  placeholder="Entrer un prix correspondant"
                  fullWidth
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mode d'utilisation
            </Typography>
            <TextField
              type={"text"}
              name="utilisation"
              placeholder="Entrer le mode d'utilisation"
              fullWidth
              onChange={handleChange}
              multiline
              minRows={5}
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Qui peut l'utiliser?
            </Typography>
            <TextField
              type={"text"}
              name="who"
              placeholder="Qui peut l'utiliser?"
              fullWidth
              onChange={handleChange}
              multiline
              minRows={5}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une image correspondante
            </Typography>
            <TextField
              type="file"
              name="image"
              placeholder="Entrer une image"
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
    </>
  );
}
