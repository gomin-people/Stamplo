export const USER_ROUTES = {
  QR_REQUIRED: "/qr-required",
  USER_UNAVAILABLE: "/user-unavailable",
};

export const getUserRoutes = (eventId: string | number) => ({
  root: `/event/${eventId}`,
  brochure: (from?: string) =>
    from
      ? `/event/${eventId}/brochure?from=${from}`
      : `/event/${eventId}/brochure`,
  detail: `/event/${eventId}/detail`,
  mission: `/event/${eventId}/mission`,
  complete: `/event/${eventId}/complete`,
});
