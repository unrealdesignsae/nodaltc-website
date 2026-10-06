export const dynamic='force-static';
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/survey-config';
export default function sitemap():MetadataRoute.Sitemap{return process.env.NEXT_PUBLIC_ALLOW_INDEXING==='true'?['/','/site-survey/','/privacy/'].map(path=>({url:SITE_URL+path,changeFrequency:'monthly' as const,priority:path==='/'?1:.8})):[];}
