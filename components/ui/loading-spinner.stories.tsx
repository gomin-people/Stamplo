import type { Meta, StoryObj } from "@storybook/nextjs";

import LoadingSpinner from "@/components/ui/loading-spinner";

const meta = {
  title: "UI/LoadingSpinner",
  component: LoadingSpinner,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
