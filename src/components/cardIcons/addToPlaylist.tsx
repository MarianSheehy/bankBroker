import React, {MouseEvent, useContext} from "react";
import { banksContext } from "../../contexts/banksContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {BasebankProps} from "../../types/interfaces"

const AddToPlaylistIcon: React.FC<BasebankProps> = (bank) => {
  const context = useContext(banksContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToPlaylist(bank);
  };
  return (
    <IconButton aria-label="add to playlist" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;