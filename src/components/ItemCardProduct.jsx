import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";

export default function ItemCardProduct({ item }) {
  return (
    <Grid item lg={8}>
      <Card sx={{ maxWidth: 1000, display: "flex", flexDirection: "row" }}>
        <CardMedia
          component="img"
          height={"450"}
          image={item.image}
          alt="green iguana"
        />
        <CardContent sx={{ width: 800 }}>
          <Typography
            variant="h5"
            gutterBottom
            noWrap
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>{item.name}</Box>
            <Box sx={{ textAlign: "end" }} x={{ mb: 2, mt: 2 }}>
              {item.price}FCFA
            </Box>
          </Typography>
          <Divider textAlign="center" sx={{ mb: 2, mt: 2, fontSize: "10px" }}>
            Utilisation
          </Divider>
          <Typography variant="body2" color={"text.secondary"}>
            {item.utilisation}
          </Typography>
          <Divider textAlign="center" sx={{ mb: 2, mt: 2, fontSize: "10px" }}>
            Qui peut utiliser?
          </Divider>
          <Typography variant="body2" color={"text.secondary"}>
            {item.who}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
