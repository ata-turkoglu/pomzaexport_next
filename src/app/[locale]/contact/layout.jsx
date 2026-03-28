import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import siteMetaData from "@/lib/siteMetaData";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return {
        title: siteMetaData.contactPage.title[locale],
        description: siteMetaData.contactPage.description[locale],
        keywords: siteMetaData.contactPage.keywords[locale],
        openGraph: {
            title: siteMetaData.contactPage.title[locale],
            description: siteMetaData.contactPage.description[locale],
            url: `https://www.pomzaexport.com/${locale}/contact/`,
            locale: locale === "tr" ? "tr_TR" : "en_US",
            type: "website",
        },
        alternates: {
            canonical: `/${locale}/contact/`,
            languages: {
                "tr-TR": "/tr/contact/",
                "en-US": "/en/contact/",
            },
        },
    };
}

export default async function ContactLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
