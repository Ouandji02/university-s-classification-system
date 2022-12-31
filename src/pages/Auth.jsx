import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import img from "../assets/img/slide20.jpg";
import imgLogo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth/cordova";

export default function Auth() {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((previousState) => ({ ...previousState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((credential) => {
        console.log(credential.user.uid);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Box
        sx={{
          height: "650px",
          backgroundColor: "red",
          backgroundImage: `url(${img})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ height: "400px", maxWidth: "350px", p: 3 }} elevation={2}>
          <img src={imgLogo} alt="logo" />
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" align="center">
            Connectez-vous et consulter vos activites
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{ mt: 2, mb: 2 }}>
              <TextField
                placeholder="Entrer votre email"
                fullWidth
                name="email"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 3 }}>
              <TextField
                placeholder="Entrer votre mot de passe"
                name="password"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Button type="submit" variant="contained">
                Se connecter
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </div>
  );
}
