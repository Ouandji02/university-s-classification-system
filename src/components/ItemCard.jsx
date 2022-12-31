import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";

export default function ItemCard({ item, onClick }) {
  return (
    <Grid item xs={4}>
      <Card key={item.title} sx={{ maxWidth: 345 }}>
        {item.image == null ? null : (
          <CardMedia
            component="img"
            height={"140"}
            image={item.image}
            alt="green iguana"
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom component={"div"}>
            {item.title}
          </Typography>
          <Typography variant="body2" color={"text.secondary"}>
            {item.text}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", m:2 }}>
          <Button color="secondary" variant="contained" onClick={onClick}>
            Supprimer
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
