import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    // Chromatic 시각 회귀 테스트와 Storybook 배포 연동
    "@chromatic-com/storybook",
    // Storybook 패널에서 접근성 이슈 검사
    "@storybook/addon-a11y",
    // Storybook Docs와 autodocs 문서화 지원
    "@storybook/addon-docs",
    // AI 도구가 Storybook 정보를 읽고 조작할 수 있게 하는 MCP 연동
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs",
  staticDirs: ["../public"],
};
export default config;
