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
        '/lecture/',
        '/cart',
        '/checkout',
        '/shop/cart',
        '/shop/checkout',
        '/login',
        '/register',
        '/forgot-password',
        '/onboarding',
        '/saved-kundlis',
        '/api/',
        '/*?q=*',
        '/shop?*'
      ],
    },
    sitemap: 'https://omastrologyamc.com/sitemap.xml',
  };
}
