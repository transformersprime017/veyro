import { useEffect } from 'react';
import { studioConfig } from '../config/studio';

export interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: 'index, follow' | 'noindex, follow' | 'noindex, nofollow';
  schema?: Record<string, unknown> | null;
}

/**
 * Returns the resolved canonical base origin.
 * Prefers verified production domain if configured; falls back cleanly to window.location.origin.
 */
export function getCanonicalOrigin(): string {
  if (studioConfig.deployment.isProductionDomain && studioConfig.deployment.domain) {
    return studioConfig.deployment.domain.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return studioConfig.deployment.domain.replace(/\/+$/, '');
}

/**
 * Helper to update or create an HTML meta tag in <head>
 */
function setMetaTag(selector: string, attrName: string, attrValue: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Centralized React hook to manage document title, meta descriptions,
 * canonical URLs, OpenGraph, Twitter Cards, robots directives, and JSON-LD structured data.
 */
export function usePageSEO({
  title,
  description,
  path,
  image = '/og.svg',
  type = 'website',
  robots = 'index, follow',
  schema = null,
}: PageSEOProps) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    const baseOrigin = getCanonicalOrigin();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${baseOrigin}${cleanPath === '/' ? '/' : cleanPath}`;
    const resolvedImageUrl = image.startsWith('http') ? image : `${baseOrigin}${image.startsWith('/') ? image : `/${image}`}`;

    // 2. Primary Meta Description
    setMetaTag('meta[name="description"]', 'name', 'description', description);

    // 3. Canonical Link Tag
    let canonicalTag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 4. Robots Directive
    setMetaTag('meta[name="robots"]', 'name', 'robots', robots);

    // 5. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', resolvedImageUrl);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'VEYRO');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);

    // 6. Twitter / X Cards
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', resolvedImageUrl);

    // 7. Schema.org JSON-LD Structured Data
    const scriptId = 'veyro-page-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    // Cleanup on unmount / route change
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, path, image, type, robots, schema]);
}
