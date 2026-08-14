import type { Meta, StoryObj } from "@storybook/nextjs";

import EventFormStepper from "@/components/admin/event/EventFormStepper";

const meta = {
  title: "Admin/Event/EventFormStepper",
  component: EventFormStepper,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { currentStep: 1 },
} satisfies Meta<typeof EventFormStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {};
export const MiddleStep: Story = { args: { currentStep: 2 } };
export const LastStep: Story = { args: { currentStep: 3 } };
