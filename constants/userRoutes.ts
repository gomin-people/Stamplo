export const USER_ROUTES = {
  QR_REQUIRED: "/qr-required",
  USER_UNAVAILABLE: "/user-unavailable",
};

export const getUserRoutes = (eventId: string | number) => ({
  root: `/event/${eventId}`,
  brochure: `/event/${eventId}/brochure`,
  mission: `/event/${eventId}/mission`,
  complete: `/event/${eventId}/complete`,
});
