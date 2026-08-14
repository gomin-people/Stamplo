import type { Meta, StoryObj } from "@storybook/nextjs";

import FloatingActionButton from "@/components/user/mission/FloatingActionButton";

const meta = {
  title: "User/Mission/FloatingActionButton",
  component: FloatingActionButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { isPreview: true, onClick: () => {} },
} satisfies Meta<typeof FloatingActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const QrCheck: Story = {};
export const RewardClaim: Story = { args: { isAllCompleted: true } };
export const Claimed: Story = { args: { isRewardClaimed: true } };
export const Loading: Story = { args: { isLoading: true } };
