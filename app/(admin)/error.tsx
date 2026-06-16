"use client";

import { Button } from "@/components/ui/button";

export default function AdminError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>문제가 발생했습니다.</p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
