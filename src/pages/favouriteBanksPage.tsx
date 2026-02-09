import React, { useContext } from "react"
import PageTemplate from "../components/templateBankListPage";
import { banksContext } from "../contexts/banksContext";
import { useQueries } from "react-query";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import BankFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/bankFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import { JSX } from "react/jsx-runtime";
import { BaseBankProps } from "../types/interfaces";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouritebanksPage: React.FC = () => {
  const { favourites: bankIds } = useContext(banksContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const favouritebankQueries = useQueries(
    bankIds.map((bankId) => {
      return {
        queryKey: ["bank", bankId],
        queryFn: () => getbank(bankId.toString()),
      };
    })
  );

  
  const isLoading = favouritebankQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouritebankQueries.map((q) => q.data);
  const displayedbanks = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite banks"
        banks={displayedbanks}
        action={(bank: JSX.IntrinsicAttributes & BaseBankProps) => {
          return (
            <>
              <RemoveFromFavourites {...bank} />
            </>
          );
        }}
      />
      <BankFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouritebanksPage;



function getbank(_arg0: string): any {
  throw new Error("Function not implemented.");
}

