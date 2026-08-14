import type { Meta, StoryObj } from "@storybook/nextjs";

import { Input } from "@/components/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { placeholder: "행사명을 입력해주세요" },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input placeholder="기본 입력" />
      <Input defaultValue="Stamply 팝업스토어" />
      <Input placeholder="비활성 입력" disabled />
      <Input placeholder="오류 입력" aria-invalid="true" />
    </div>
  ),
};
