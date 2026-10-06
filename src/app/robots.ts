export const dynamic = 'force-static';
import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots {return {rules:{userAgent:'*',...(process.env.NEXT_PUBLIC_ALLOW_INDEXING==='true'?{allow:'/'}:{disallow:'/'})}};}
