import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import productsJSON from "@/data/products.json";
import { slugify } from "@/utils/commonFuncs";

export async function generateStaticParams({ params }) {
    const { locale } = await params;
    return productsJSON.map((item) => ({
        slug: item.id.toString() + "-" + slugify(item.name[locale]),
    }));
}

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const slugList = slug.split("-");
    const productId = slugList[0];
    const product = productsJSON.find((item) => item.id == productId);
    if (!product) {
        return {};
    }

    const trSlug = product.id.toString() + "-" + slugify(product.name.tr);
    const enSlug = product.id.toString() + "-" + slugify(product.name.en);
    const canonicalSlug = locale === "tr" ? trSlug : enSlug;
    const canonicalPath = `/${locale}/product/${canonicalSlug}/`;
    const description = Array.isArray(product.description[locale])
        ? product.description[locale].join(" ")
        : product.description[locale];

    const metaObj = {
        title: product.name[locale],
        description,
        keywords: product.keywords[locale],
        alternates: {
            canonical: canonicalPath,
            languages: {
                "tr-TR": `/tr/product/${trSlug}/`,
                "en-US": `/en/product/${enSlug}/`,
            },
        },
        openGraph: {
            title: product.name[locale],
            description,
            url: "https://www.pomzaexport.com" + canonicalPath,
            images: [
                {
                    url: "https://www.pomzaexport.com" + product.image,
                    alt: product.name[locale],
                },
            ],
            locale: locale === "tr" ? "tr_TR" : "en_US",
            type: "website",
        },
    };

    if (slugList.length == 1) {
        metaObj.robots = {
            index: false,
            follow: true,
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
