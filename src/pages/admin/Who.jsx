import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { addDocument } from "../../services/services";
import { collection, getDocs, orderBy } from "firebase/firestore/lite";
import { useEffect } from "react";
import { db } from "../../Firebase";
import { WHO } from "../../constantes/Const";

export default function Who() {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
    addDocument(WHO, data);
  };
  useEffect(() => {
    const getDocuments = getDocs(collection(db, WHO), orderBy("created"))
      .then((docs) => {
        var listlist = [];
        docs.forEach((doc) => {
          console.log(doc.data());
          listlist.push(doc.data());
        });
        setList(docs.docs.map((doc) => doc.data()));
        console.log(list);
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
    var file = e.target[5].files[0];
  };

  console.log(data);
  return (
    <>
      <Typography variant="h4">Entrer les elements du volet mission</Typography>
      <Card sx={{ p: 3, mt: 2, mb: 4 }}>
        <form>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer un titre titre
            </Typography>
            <TextField
              type={"text"}
              name="titleMission"
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
              name="textMission"
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
              name="enumerationMission1"
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
              name="enumerationMission2"
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
              name="enumerationMission3"
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
              name="enumerationMission4"
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
              name="imageMission1"
              placeholder="Entrer un titre"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="contained">Enregistrer</Button>
          </Box>
        </form>
      </Card>
      <Typography variant="h4">Entrer les elements du volet valeurs</Typography>
      <Card sx={{ p: 3, mt: 2, mb: 4 }}>
        <form>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer un titre titre
            </Typography>
            <TextField
              type={"text"}
              name="titleValue"
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
              name="textValue"
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
              name="enumerationValue1"
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
              name="enumerationValue2"
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
              name="enumerationValue3"
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
              name="enumerationValue4"
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
              name="imageValue"
              placeholder="Entrer un titre"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="contained">Enregistrer</Button>
          </Box>
        </form>
      </Card>
      <Typography variant="h4">
        Entrer les elements du volet objectif
      </Typography>
      <Card sx={{ p: 3, mt: 2, mb: 4 }}>
        <form>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer un titre titre
            </Typography>
            <TextField
              type={"text"}
              name="titleObjectif"
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
              name="textObjectif"
              placeholder="Entrer un texte correspondant"
              fullWidth
              onChange={handleChange}
              multiline
              rows={5}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer une enumeration correspondant
            </Typography>
            <TextField
              type={"text"}
              name="enumerationObjectif1"
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
              name="imageObjectif1"
              placeholder="Entrer un titre"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="contained">Enregistrer</Button>
          </Box>
        </form>
      </Card>
      <Typography variant="h4">Entrer les elements du volet service</Typography>
      <Card sx={{ p: 3, mt: 2, mb: 4 }}>
        <form>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Entrer un titre titre
            </Typography>
            <TextField
              type={"text"}
              name="titleService"
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
              name="textService"
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
              name="enumerationService1"
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
              name="enumerationService2"
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
              name="enumerationService3"
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
              name="enumerationService4"
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
              name="imageService"
              placeholder="Entrer un titre"
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="contained">Enregistrer</Button>
          </Box>
        </form>
      </Card>
    </>
  );
}
