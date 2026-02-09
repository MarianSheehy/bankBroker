import React, {MouseEvent, useContext} from "react";
import { banksContext } from "../../contexts/banksContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BasebankProps} from "../../types/interfaces"

const AddToFavouritesIcon: React.FC<BasebankProps> = (bank) => {
  const context = useContext(banksContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(bank);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
