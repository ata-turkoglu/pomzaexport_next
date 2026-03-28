import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import siteMetaData from "@/lib/siteMetaData";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return {
        title: locale === "tr" ? "Maden İşletmeleri" : "Mining Facilities",
        description: siteMetaData.minePage.description[locale],
        keywords: siteMetaData.minePage.keywords[locale],
        openGraph: {
            title: locale === "tr" ? "Maden İşletmeleri" : "Mining Facilities",
            description: siteMetaData.minePage.description[locale],
            url: `https://www.pomzaexport.com/${locale}/facilities/`,
            locale: locale === "tr" ? "tr_TR" : "en_US",
            type: "website",
        },
        alternates: {
            canonical: `/${locale}/facilities/`,
            languages: {
                "tr-TR": "/tr/facilities/",
                "en-US": "/en/facilities/",
            },
        },
    };
}

export default async function FacilitiesLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
