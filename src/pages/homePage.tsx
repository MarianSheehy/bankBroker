// import React from "react";
// import PageTemplate from "../components/templateBankListPage";
// import useFiltering from "../hooks/useFiltering";
/* import {
  titleFilter,
  genreFilter,
} from "../components/bankFilterUI"; */
// import { Discoverbanks, BasebankProps } from "../types/interfaces";
// import { useQuery } from "react-query";
// import Spinner from "../components/spinner";
// import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';

/* const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
}; */

/* const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<Discoverbanks, Error>("discover", getbanks);
  const { filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  };

  const banks = data ? data.results : [];
  const displayedbanks = filterFunction(banks);

   return (
    <>
      <PageTemplate
        title="Discover banks"
        banks={displayedbanks}
        action={(bank: BasebankProps) => {
          return <AddToFavouritesIcon {...bank} />
        }}
      />
    </>
  );
}; */
// export default HomePage;







