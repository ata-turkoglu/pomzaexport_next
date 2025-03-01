import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import siteMetaData from "@/lib/siteMetaData";
import productsJSON from "@/data/products.json";
import { slugify } from "@/utils/commonFuncs";

export async function generateStaticParams({ params }) {
    const { locale } = await params;
    let list = [];

    productsJSON.forEach((item) => {
        list.push({ slug: item.id.toString() });
        list.push({
            slug: item.id.toString() + "-" + slugify(item.name[locale]),
        });
    });
    return list;
}

//bakılacak
export async function generateMetadata({ params }) {
    const { locale } = await params;

    //const mine = minesJSON.find()

    return {
        title: siteMetaData.minePage.title[locale],
        description: siteMetaData.minePage.description[locale],
        keywords: siteMetaData.minePage.keywords[locale],
    };
}

export default async function ProductDetailLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
