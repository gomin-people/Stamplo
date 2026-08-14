import type { Meta, StoryObj } from "@storybook/nextjs";
import { ThemeProvider } from "next-themes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

const meta = {
  title: "UI/Sonner",
  component: Toaster,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Toasts: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("행사가 저장되었습니다.")}>
          성공
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("변경사항이 있습니다.")}
        >
          안내
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("재고를 확인해주세요.")}
        >
          경고
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error("저장하지 못했습니다.")}
        >
          오류
        </Button>
      </div>
    </ThemeProvider>
  ),
};
