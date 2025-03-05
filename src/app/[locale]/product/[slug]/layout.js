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

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const slugList = slug.split("-");
    const productId = slugList[0];
    const product = productsJSON.find((item) => item.id == productId);
    const keywords = product?.keywords?.[locale] || [];

    const str =
        product.id.toString() + "-" + slugify(product.name[locale]) + "/";

    const metaObj = {
        title: product.name[locale],
        description: product.description[locale],
        keywords,
        openGraph: {
            title: product.name[locale],
            description: product.description[locale],
            url: "https://www.pomzaexport.com/" + locale + "/product/" + str,
            images: [
                {
                    url: "https://www.pomzaexport.com" + product.image,
                    alt: product.name[locale],
                },
            ],
            locale,
            type: "website",
        },
    };

    if (slugList.length == 1) {
        metaObj.alternates = {
            canonical:
                "https://www.pomzaexport.com/" + locale + "/product/" + str,
        };
        metaObj.robots = {
            index: false,
            folow: true,
        };
    }

    return metaObj;
}

export default async function ProductDetailLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
