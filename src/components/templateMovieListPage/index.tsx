import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { BaseMovieProps} from "../../types/interfaces";

interface MovieListPageTemplateProps {
  movies: BaseMovieProps[];
  title: string;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, action })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;

