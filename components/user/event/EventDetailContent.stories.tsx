import type { Meta, StoryObj } from "@storybook/nextjs";

import EventDetailContent from "@/components/user/event/EventDetailContent";
import type { EventModel } from "@/types/models";

const defaultEvent: EventModel = {
  id: 1,
  userId: "admin-id",
  title: "Stamply 여름 팝업스토어",
  startDate: "2026-07-24",
  endDate: "2026-07-27",
  startTime: "10:00:00",
  endTime: "20:00:00",
  operatingRemarks: "매일 운영",
  location: "서울 성동구 성수이로 88",
  locationUrl: "https://maps.google.com",
  notice: null,
  contactPhone: "02-1234-5678",
  contactEmail: "hello@stamply.kr",
  production: "고민피플",
  posterImageUrl: "",
  brochureImageUrl: null,
  stampImageUrl: null,
  primaryColor: "#5435EB",
  rewardStock: 100,
  createdAt: "2026-07-01T00:00:00.000Z",
  updatedAt: "2026-07-01T00:00:00.000Z",
};

const meta = {
  title: "User/Event/EventDetailContent",
  component: EventDetailContent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { event: defaultEvent },
  decorators: [
    (Story) => (
      <div className="h-[70vh] w-[calc(100vw-3rem)] max-w-sm overflow-y-auto rounded-[24px] shadow-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventDetailContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutOptionalContact: Story = {
  args: {
    event: {
      ...defaultEvent,
      locationUrl: null,
      contactPhone: null,
      contactEmail: null,
      operatingRemarks: null,
    },
  },
};

export const LongContent: Story = {
  args: {
    event: {
      ...defaultEvent,
      title: "여름밤 성수에서 만나는 Stamply 브랜드 체험 팝업스토어",
      operatingRemarks:
        "주말에는 현장 상황에 따라 입장이 조기 마감될 수 있습니다.",
      location: "서울특별시 성동구 성수이로 88, 2층 스탬플리 팝업스토어",
      production: "고민피플 스탬플리 운영팀",
    },
  },
};
