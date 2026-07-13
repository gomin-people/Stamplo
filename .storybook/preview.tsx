import type { Preview } from "@storybook/nextjs";

import "@/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // todo: 접근성 위반을 테스트 UI에서만 표시
      // error: 접근성 위반을 CI 실패로 처리
      // off: 접근성 검사를 비활성화
      test: "todo",
    },
  },
};

export default preview;
