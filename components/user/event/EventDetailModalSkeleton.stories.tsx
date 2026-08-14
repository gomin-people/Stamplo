import type { Meta, StoryObj } from "@storybook/nextjs";

import EventDetailModalSkeleton from "@/components/user/event/EventDetailModalSkeleton";

const meta = {
  title: "User/Event/EventDetailModalSkeleton",
  component: EventDetailModalSkeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[70vh] w-[calc(100vw-3rem)] max-w-sm overflow-y-auto rounded-[24px] shadow-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventDetailModalSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {};
