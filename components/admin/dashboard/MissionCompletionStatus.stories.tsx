import type { Meta, StoryObj } from "@storybook/nextjs";

import MissionCompletionStatus from "@/components/admin/dashboard/MissionCompletionStatus";

const meta = {
  title: "Admin/Dashboard/MissionCompletionStatus",
  component: MissionCompletionStatus,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    missions: [
      {
        id: 1,
        title: "포토존 인증",
        isActive: true,
        completedCount: 124,
        completionRate: 82.7,
      },
      {
        id: 2,
        title: "브랜드 퀴즈",
        isActive: true,
        completedCount: 98,
        completionRate: 65.3,
      },
      {
        id: 3,
        title: "친구에게 공유",
        isActive: false,
        completedCount: 31,
        completionRate: 20.7,
      },
    ],
  },
} satisfies Meta<typeof MissionCompletionStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithMissions: Story = {
  decorators: [
    (Story) => (
      <div className="h-[41rem] w-[44rem] rounded-xl border">
        <Story />
      </div>
    ),
  ],
};
export const Empty: Story = {
  args: { missions: [] },
  decorators: [
    (Story) => (
      <div className="h-[41rem] w-[44rem] rounded-xl border">
        <Story />
      </div>
    ),
  ],
};
