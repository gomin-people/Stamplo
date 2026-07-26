import type { Meta, StoryObj } from "@storybook/nextjs";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { day: "월", participants: 42 },
  { day: "화", participants: 68 },
  { day: "수", participants: 51 },
  { day: "목", participants: 86 },
  { day: "금", participants: 73 },
];

const chartConfig = {
  participants: { label: "참여자 수", color: "var(--chart-1)" },
} satisfies ChartConfig;

const meta = {
  title: "UI/Chart",
  component: ChartContainer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BarChartExample: Story = {
  render: () => (
    <div className="w-96">
      <ChartContainer config={chartConfig} className="min-h-56 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="participants"
            fill="var(--color-participants)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};
