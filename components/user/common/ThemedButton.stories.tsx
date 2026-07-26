import type { Meta, StoryObj } from "@storybook/nextjs";
import { ScanLine } from "lucide-react";

import ThemedButton from "@/components/user/common/ThemedButton";

const meta = {
  title: "User/Common/ThemedButton",
  component: ThemedButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "QR 체크하기" },
} satisfies Meta<typeof ThemedButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <ScanLine className="size-5" />
        QR 체크하기
      </>
    ),
  },
};
export const Disabled: Story = {
  args: { disabled: true, children: "리워드 수령 완료" },
};
