import type { Meta, StoryObj } from "@storybook/nextjs";

import { Switch } from "@/components/ui/switch";

const meta = {
  title: "UI/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { "aria-label": "미션 활성화" },
  argTypes: {
    size: { control: "select", options: ["sm", "default", "md", "lg"] },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" aria-label="작음" defaultChecked />
      <Switch aria-label="기본" defaultChecked />
      <Switch size="md" aria-label="중간" defaultChecked />
      <Switch size="lg" aria-label="큼" defaultChecked />
    </div>
  ),
};
