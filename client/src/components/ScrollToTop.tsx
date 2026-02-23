import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component ensures the page scrolls to the top
 * whenever the route changes (navigation occurs)
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top of page when location changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return null;
}
