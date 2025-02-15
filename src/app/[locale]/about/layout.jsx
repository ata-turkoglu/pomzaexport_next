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
