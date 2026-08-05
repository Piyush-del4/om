import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
 return {
 rules: {
 userAgent: '*',
 allow: '/',
 disallow: [
 '/dashboard/', 
 '/admin/', 
 '/profile/', 
 '/orders/', 
 '/my-batches/', 
 '/lecture/'
 ],
 },
 sitemap: 'https://omastrologyamc.com/sitemap.xml',
 };
}
