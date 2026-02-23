export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO =
  import.meta.env.VITE_APP_LOGO ||
  "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

// Generate login URL - redirects to custom login page
export const getLoginUrl = () => {
  // Store the current page URL so we can redirect back after login
  const returnUrl = window.location.pathname + window.location.search;
  if (returnUrl !== '/login' && returnUrl !== '/signup') {
    sessionStorage.setItem('returnUrl', returnUrl);
  }
  return '/login';
};
