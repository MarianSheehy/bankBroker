import React from "react";
import { getPopularCast} from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { BaseMovieProps } from "../types/interfaces";
import CastList from "../components/castList";
import { Box, Grid } from "@mui/material";
import Header from "../components/headerMovieList";

const PopularCastPage: React.FC = () => {
  const { data: actors, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>("popular", getPopularCast);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Box sx={{ marginTop: "150px", padding: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Header title="Popular Cast" />
        </Grid>
        <Grid item container spacing={5} sx={{ marginTop: 2 }}>
          <CastList 
            actors={actors || []} 
            action={(actor) => {
              return <AddToFavouritesIcon {...actor} />
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopularCastPage;