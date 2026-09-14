import site from "./siteMetaData";

export const absoluteUrl = (path) => new URL(path, site.siteUrl).href;

export function detailDescription(name, locale, kind = "product") {
    if (kind === "mine") return locale === "tr"
        ? `${name}: Pomza Export’un madencilik faaliyetleri, işletme bilgileri ve üretilen mineraller hakkında bilgi edinin.`
        : `${name}: learn about Pomza Export’s mining activities, facility and mineral products.`;
    return locale === "tr"
        ? `${name} hakkında bilgi edinin. Pomza Export ürün tanıtımı, özellikleri ve kullanım alanlarını inceleyin.`
        : `Learn about ${name.toLowerCase()}. Explore Pomza Export’s product information, properties and applications.`;
}

export function organizationGraph() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "Organization", "@id": absoluteUrl("/#organization"),
                name: site.title, url: site.siteUrl, logo: site.siteLogo,
                sameAs: [site.linkedin, site.instagram, site.facebokk] },
            { "@type": "WebSite", "@id": absoluteUrl("/#website"),
                name: site.title, url: site.siteUrl, inLanguage: ["tr", "en"],
                publisher: { "@id": absoluteUrl("/#organization") } },
        ],
    };
}
