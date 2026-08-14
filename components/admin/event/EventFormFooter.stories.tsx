import type { Meta, StoryObj } from "@storybook/nextjs";

import EventFormFooter from "@/components/admin/event/EventFormFooter";

const meta = {
  title: "Admin/Event/EventFormFooter",
  component: EventFormFooter,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof EventFormFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const View: Story = {
  args: { mode: "view", onEditStart: () => {}, onDeleteClick: () => {} },
};
export const Edit: Story = {
  args: { mode: "edit", onEditCancel: () => {}, onEditSave: () => {} },
};
export const Disabled: Story = {
  args: {
    mode: "edit",
    disabled: true,
    onEditCancel: () => {},
    onEditSave: () => {},
  },
};
