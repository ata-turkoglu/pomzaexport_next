import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import siteMetaData from "@/lib/siteMetaData";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return {
        title: siteMetaData.aboutPage.title[locale],
        description: siteMetaData.aboutPage.description[locale],
        keywords: siteMetaData.aboutPage.keywords[locale],
        openGraph: {
            title: siteMetaData.aboutPage.title[locale],
            description: siteMetaData.aboutPage.description[locale],
            url: `https://www.pomzaexport.com/${locale}/about/`,
            locale: locale === "tr" ? "tr_TR" : "en_US",
            type: "website",
        },
        alternates: {
            canonical: `/${locale}/about/`,
            languages: {
                "tr-TR": "/tr/about/",
                "en-US": "/en/about/",
            },
        },
    };
}

export default async function AboutLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
