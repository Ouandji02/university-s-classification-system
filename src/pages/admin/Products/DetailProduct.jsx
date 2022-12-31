import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { doc, getDoc } from "firebase/firestore/lite";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../../../components/ItemCard";
import ItemCardProduct from "../../../components/ItemCardProduct";
import { PRODUCT } from "../../../constantes/Const";
import { db } from "../../../Firebase";

export default function DetailProduct() {
  const [product, setProduct] = useState({
    image:"",
    name: "",
    price: "",
    utilisation:
      "",
    who: "",
  });
  const id = useParams().id;
  useEffect(() => {
    const getDocument = getDoc(doc(db, PRODUCT, id))
      .then((result) => {
        setProduct({ ...product, ...result.data() });
      })
      .catch((error) => alert("erreur de chargment"));
    return () => getDocument;
  }, []);
  console.log(
    "adsihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    product
  );
  return (
    <div>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4">Details product</Typography>
      </Box>
      <Box >
        <ItemCardProduct item={product} />
      </Box>
    </div>
  );
}
