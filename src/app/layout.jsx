import siteMetaData from "@/lib/siteMetaData";

export async function generateMetadata() {
    return {
        metadataBase: new URL(siteMetaData.siteUrl),
        canonical: "https://www.pomzaexport.com/tr",
        alternates: {
            languages: {
                "tr-TR": "/tr",
                "en-US": "/en",
            },
        },
        title: {
            //template: `%s Yapı Kimyasalları`,
            default: siteMetaData.title,
        },
        keywords: siteMetaData.keywords.tr,
        description: siteMetaData.description.tr,
        openGraph: {
            title: siteMetaData.title,
            description: siteMetaData.description.tr,
            url: siteMetaData.siteUrl,
            siteName: siteMetaData.title,
            images: [
                {
                    url: "https://www.eilepomex.com/assets/logos/eile.png",
                    height: "86",
                    width: "86",
                    alt: "eile pomex",
                },
                {
                    url: "https://www.eilepomex.com/assets/logos/eilepomex-round.png",
                    height: "110",
                    width: "300",
                    alt: "eile pomex",
                },
                {
                    url: "https://www.eilepomex.com/assets/logos/eile-logo-tr.png",
                    height: "112",
                    width: "300",
                    alt: "eile pomex tr",
                },
                {
                    url: "https://www.eilepomex.com/assets/logos/eile-logo-en.png",
                    height: "112",
                    width: "300",
                    alt: "eile pomex en",
                },
            ],
            //locale: "tr_TR",
            type: "website",
        },
        robots: {
            index: true,
            folow: true,
            //noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    };
}

export default async function MainLayout({ children }) {
    return <>{children}</>;
}
