import { USER_ROUTES } from "@/constants/userRoutes";

export const getUserUnavailablePath = (message: string | null) =>
  message === "존재하지 않는 미션입니다."
    ? `${USER_ROUTES.USER_UNAVAILABLE}?reason=not-found`
    : USER_ROUTES.USER_UNAVAILABLE;
