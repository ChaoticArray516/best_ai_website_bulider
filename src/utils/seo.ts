import type { CollectionEntry } from 'astro:content';
import { SITE_URL, SITE_NAME } from './constants';

/** Generate Review Schema for a single tool (used on detail pages) */
export function generateReviewSchema(tool: CollectionEntry<'tools'>) {
  return {
    "@context": "https://schema.org/",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": tool.data.name,
      "applicationCategory": "WebApplication",
      "offers": {
        "@type": "Offer",
        "price": tool.data.price.startingPrice.toString(),
        "priceCurrency": tool.data.price.currency,
      },
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": tool.data.rating.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    "author": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
    },
    "datePublished": tool.data.datePublished.toISOString().split('T')[0],
    "dateModified":  tool.data.dateModified.toISOString().split('T')[0],
  };
}

/** Generate ItemList Schema for tool lists (used on aggregate pages) */
export function generateItemListSchema(tools: CollectionEntry<'tools'>[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best AI Website Builders",
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": tool.data.name,
      "url": `${SITE_URL}/review/${tool.data.slug}/`,
    })),
  };
}

/** Generate FAQ Schema (used on any page with FAQs) */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/** Generate WebSite Schema (used only on homepage) */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Independent reviews of the best AI website builders",
  };
}

/** Generate BreadcrumbList Schema for navigation breadcrumbs */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
