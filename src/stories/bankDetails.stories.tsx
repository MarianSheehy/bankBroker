import type { Meta, StoryObj } from '@storybook/react';
import bankDetails from "../components/bankDetails";
import Samplebank from "./sampleData";
import { MemoryRouter } from "react-router";
import banksContextProvider from "../contexts/banksContext";

const meta = {
    title: "bank Details Page/bankDetails",
    component: bankDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <banksContextProvider>{Story()}</banksContextProvider>,
      ],
} satisfies Meta<typeof bankDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: Samplebank
};
Basic.storyName = "Default";