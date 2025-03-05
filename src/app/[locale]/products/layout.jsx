import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import siteMetaData from "@/lib/siteMetaData";
import minesJSON from "@/data/mines.json";
import { slugify } from "@/utils/commonFuncs";

/* export async function generateStaticParams({ params }) {
    const { locale } = await params;
    let list = [];

    minesJSON.forEach((item) => {
        list.push({ slug: item.id.toString() });
        list.push({
            slug: item.id.toString() + "-" + slugify(item.name[locale]),
        });
    });
    return list;
} */

/* export async function generateMetadata({ params }) {
    const { locale } = await params;

    return {
        title: siteMetaData.minePage.title[locale],
        description: siteMetaData.minePage.description[locale],
        keywords: siteMetaData.minePage.keywords[locale],
    };
} */

export default async function ProductsLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
