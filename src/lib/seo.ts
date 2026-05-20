import { sanityClient, imageUrl } from './sanity';

export interface PageSEO {
  metaTitle?: string;
  metaDescription?: string;
  socialTitle?: string;
  socialDescription?: string;
  ogImage?: unknown;
  noindex?: boolean;
}

export interface ResolvedSEO {
  metaTitle: string;
  metaDescription: string;
  socialTitle: string;
  socialDescription: string;
  ogImageUrl: string;
  noindex: boolean;
}

export interface TrackingCodes {
  ga4MeasurementId: string;
  gtmId: string;
  metaPixelId: string;
  gscVerification: string;
}

export interface SiteSettings {
  contact?: {
    phone?: string;
    email?: string;
    primaryAddress?: string;
  };
  openingHours?: Array<{
    day?: string;
    closed?: boolean;
    opens?: string;
    closes?: string;
  }>;
  locations?: Array<{
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    mapEmbed?: string;
    hours?: string;
  }>;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    x?: string;
  };
}

let _defaultSeoCache: PageSEO | null = null;
let _trackingCache: TrackingCodes | null = null;

const TRACKING_PATTERNS = {
  ga4MeasurementId: /^G-[A-Z0-9]{4,20}$/,
  gtmId: /^GTM-[A-Z0-9]{5,10}$/,
  metaPixelId: /^[0-9]{6,20}$/,
  gscVerification: /^[A-Za-z0-9_-]{20,100}$/,
} as const;

function sanitiseTrackingId(
  value: string | undefined,
  key: keyof typeof TRACKING_PATTERNS
): string {
  if (!value) return '';
  const trimmed = String(value).trim();
  return TRACKING_PATTERNS[key].test(trimmed) ? trimmed : '';
}

async function fetchDefaultSeo(): Promise<PageSEO> {
  if (_defaultSeoCache) return _defaultSeoCache;
  try {
    const doc = await sanityClient.fetch(
      `*[_type == "defaultSeo" && _id == "defaultSeo"][0]{
        metaTitle,
        metaDescription,
        socialTitle,
        socialDescription,
        ogImage,
        noindex
      }`
    );
    _defaultSeoCache = doc || {};
    return _defaultSeoCache!;
  } catch (e) {
    console.warn('[seo] Failed to fetch Default SEO from Sanity:', e);
    return {};
  }
}

export async function getSEO(pageSeo?: PageSEO): Promise<ResolvedSEO> {
  const defaults = await fetchDefaultSeo();

  const merged: ResolvedSEO = {
    metaTitle: pageSeo?.metaTitle || defaults.metaTitle || '',
    metaDescription: pageSeo?.metaDescription || defaults.metaDescription || '',
    socialTitle: pageSeo?.socialTitle || defaults.socialTitle || '',
    socialDescription: pageSeo?.socialDescription || defaults.socialDescription || '',
    ogImageUrl: '',
    noindex: pageSeo?.noindex ?? defaults.noindex ?? false,
  };

  const ogSource = pageSeo?.ogImage || defaults.ogImage;
  if (ogSource) {
    try {
      merged.ogImageUrl = imageUrl(ogSource).width(1200).height(630).url();
    } catch {
      // Invalid image reference
    }
  }

  return merged;
}

export async function getTrackingCodes(): Promise<TrackingCodes> {
  if (_trackingCache) return _trackingCache;
  try {
    const doc = await sanityClient.fetch(
      `*[_type == "trackingCodes" && _id == "trackingCodes"][0]{
        ga4MeasurementId,
        gtmId,
        metaPixelId,
        gscVerification
      }`
    );
    _trackingCache = {
      ga4MeasurementId: sanitiseTrackingId(
        doc?.ga4MeasurementId ||
          import.meta.env.PUBLIC_GA_MEASUREMENT_ID ||
          import.meta.env.PUBLIC_GTAG_ID,
        'ga4MeasurementId'
      ),
      gtmId: sanitiseTrackingId(
        doc?.gtmId || import.meta.env.PUBLIC_GTM_ID,
        'gtmId'
      ),
      metaPixelId: sanitiseTrackingId(
        doc?.metaPixelId || import.meta.env.PUBLIC_META_PIXEL_ID,
        'metaPixelId'
      ),
      gscVerification: sanitiseTrackingId(
        doc?.gscVerification || import.meta.env.PUBLIC_GSC_VERIFICATION,
        'gscVerification'
      ),
    };
    return _trackingCache;
  } catch (e) {
    console.warn('[seo] Failed to fetch Tracking Codes from Sanity:', e);
    _trackingCache = {
      ga4MeasurementId: sanitiseTrackingId(
        import.meta.env.PUBLIC_GA_MEASUREMENT_ID ||
          import.meta.env.PUBLIC_GTAG_ID,
        'ga4MeasurementId'
      ),
      gtmId: sanitiseTrackingId(import.meta.env.PUBLIC_GTM_ID, 'gtmId'),
      metaPixelId: sanitiseTrackingId(
        import.meta.env.PUBLIC_META_PIXEL_ID,
        'metaPixelId'
      ),
      gscVerification: sanitiseTrackingId(
        import.meta.env.PUBLIC_GSC_VERIFICATION,
        'gscVerification'
      ),
    };
    return _trackingCache;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const doc = await sanityClient.fetch(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
        contact,
        openingHours,
        locations,
        social
      }`
    );
    return doc || {};
  } catch (e) {
    console.warn('[seo] Failed to fetch Site Settings from Sanity:', e);
    return {};
  }
}
