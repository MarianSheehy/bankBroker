
import type { Meta } from '@storybook/react';
import bankList from "../components/bankList";
import Samplebank from "./sampleData";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import banksContextProvider from "../contexts/banksContext";


const meta = {
  title: "Home Page/bankList",
  component: bankList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <banksContextProvider><Story /></banksContextProvider>,
    ],
    
} satisfies Meta<typeof bankList>;
export default meta;


export const Basic = () => {
  const banks = [
    { ...Samplebank, id: 1 },
    { ...Samplebank, id: 2 },
    { ...Samplebank, id: 3 },
    { ...Samplebank, id: 4 },
    { ...Samplebank, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <bankList
        banks={banks}
        action={(bank) => <AddToFavouritesIcon {...bank} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


