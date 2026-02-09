import type { Meta, StoryObj } from '@storybook/react';
import bankListHeader from "../components/headerbankList";
import { MemoryRouter } from "react-router";
import banksContextProvider from "../contexts/banksContext";

const meta = {
    title: 'Home Page/Header',
    component: bankListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <banksContextProvider>{Story()}</banksContextProvider>,
    ],
  } satisfies Meta<typeof bankListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'Discover banks'}

};
Basic.storyName = "Default";

