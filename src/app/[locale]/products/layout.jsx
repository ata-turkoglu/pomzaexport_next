import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import siteMetaData from "@/lib/siteMetaData";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return {
        title: siteMetaData.productsPage.title[locale],
        description: siteMetaData.productsPage.description[locale],
        keywords: siteMetaData.productsPage.keywords[locale],
        openGraph: {
            title: siteMetaData.productsPage.title[locale],
            description: siteMetaData.productsPage.description[locale],
            url: `https://www.pomzaexport.com/${locale}/products/`,
            locale: locale === "tr" ? "tr_TR" : "en_US",
            type: "website",
        },
        alternates: {
            canonical: `/${locale}/products/`,
            languages: {
                "tr-TR": "/tr/products/",
                "en-US": "/en/products/",
            },
        },
    };
}

export default async function ProductsLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
