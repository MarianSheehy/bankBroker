import type { Meta, StoryObj } from '@storybook/react';
import bankCard from "../components/bankCard";
import Samplebank from "./sampleData";
import { MemoryRouter } from "react-router";
import BanksContextProvider from "../contexts/banksContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const meta = {
  title: 'Home Page/bankCard',
  component: bankCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <BanksContextProvider>{Story()}</BanksContextProvider>,
  ],
} satisfies Meta<typeof bankCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (bank ) => <AddToFavouritesIcon {...bank} />,
    bank: Samplebank,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...Samplebank, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    bank: sampleNoPoster,
    action: (bank ) => <AddToFavouritesIcon {...bank} />,
  }
};
Exceptional.storyName = "Exception";