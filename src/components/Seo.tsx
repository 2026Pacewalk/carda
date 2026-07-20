const SITE_URL = "https://mycarda.com";
const SITE_NAME = "MyCarda";
const DEFAULT_IMAGE = "/images/og-image.jpg";
const TITLE_SUFFIX = " | MyCarda";

interface SeoProps {
  /** Page title (the brand suffix is appended automatically unless already present) */
  title: string;
  /** Meta description, ~150–160 chars */
  description: string;
  /** Route path for canonical + og:url, e.g. "/pricing" (defaults to "/") */
  path?: string;
  /** OG/Twitter image — absolute URL or site-relative path */
  image?: string;
  /** og:type — "website" (default) or "article" */
  type?: "website" | "article";
  /** Set true on auth/utility pages that should not be indexed */
  noindex?: boolean;
  /** Optional keywords */
  keywords?: string;
}

/**
 * Per-page SEO / social metadata. Uses React 19's native document metadata
 * hoisting — these tags are moved into <head> automatically. Render it once
 * near the top of each page component.
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  keywords,
}: SeoProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title}${TITLE_SUFFIX}`;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
