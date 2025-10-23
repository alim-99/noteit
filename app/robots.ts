import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
      const baseUrl = "https://noteit-pied.vercel.app/";
      return {
            rules: {
                  userAgent: "*",
                  allow: "/",
                  disallow: ["/update-note/", "/sign-in/", "/sign-up/"],
            },
            sitemap: `${baseUrl}/sitemap.xml`, 
      }
}