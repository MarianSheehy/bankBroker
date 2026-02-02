import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getShows } from "../api/tmdb-api";
import { DiscoverShows, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';

const ShowPage: React.FC = () => {
  const { data: movies, error, isLoading, isError } = useQuery<DiscoverShows, Error>("discover", getShows);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

   return (
    <>
      <PageTemplate
        title="Discover Shows"
        movies={movies?.results || []}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
    </>
  );
};
export default ShowPage;