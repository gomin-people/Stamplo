import type { Meta, StoryObj } from "@storybook/nextjs";

import InfoCard from "@/components/user/common/InfoCard";

const meta = {
  title: "User/Common/InfoCard",
  component: InfoCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { label: "행사명", children: "Stamply 팝업스토어" },
} satisfies Meta<typeof InfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
