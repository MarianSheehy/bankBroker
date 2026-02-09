import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { bankDetailsProps } from "../../types/interfaces"; 
import Avatar from "@mui/material/Avatar";

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
    },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
      marginleft: 50,
    },
};

const bankHeader: React.FC<bankDetailsProps> = (bank) => {

const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');
const isFavourite = favourites.some((fav: any) => fav.id === bank.id);  

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      <IconButton aria-label="go back">
        {isFavourite && (
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        )}
      </IconButton>
      <Typography variant="h4" component="h3">
        {bank.title}{"   "}
        <a href={bank.homepage}>
          <HomeIcon color="primary"  fontSize="large"/>
        </a>
        <br />
        <span>{`${bank.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default bankHeader;
