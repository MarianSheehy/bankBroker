import type { Meta, StoryObj } from '@storybook/react';
import bankHeader from "../components/headerbank";
import Samplebank from "./sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "bank Details Page/bankHeader",
    component: bankHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof bankHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        ...Samplebank
    }
};
Basic.storyName = "Default";