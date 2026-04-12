import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export function SEO({
  title,
  description = "Premium gym in B-17 Islamabad. CrossFit, weight loss, strength training. 100+ equipment pieces. Open until 11 PM. Call 0317 5441707.",
  keywords = "gym islamabad, crossfit islamabad, b17 gym, capital gym islamabad, weight loss gym islamabad",
  image = "/opengraph.jpg"
}: SEOProps) {
  const { pathname: location } = useLocation();
  const fullTitle = `The Capital Gym | ${title} | B-17 Islamabad`;
  const pageUrl = `https://thecapitalgym.com${location}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', pageUrl, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', 'The Capital Gym', 'property');

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    window.scrollTo(0, 0);
  }, [title, description, keywords, image, location]);

  return null;
}
