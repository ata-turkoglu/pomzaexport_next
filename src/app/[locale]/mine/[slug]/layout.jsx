import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import minesJSON from "@/data/mines.json";
import { slugify } from "@/utils/commonFuncs";

export async function generateStaticParams({ params }) {
    const { locale } = await params;
    return minesJSON.map((item) => ({
        slug: item.id.toString() + "-" + slugify(item.name[locale]),
    }));
}

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;
    const slugList = slug.split("-");
    const mineId = slugList[0];
    const mine = minesJSON.find((item) => item.id == mineId);
    if (!mine) {
        return {};
    }

    const trSlug = mine.id.toString() + "-" + slugify(mine.name.tr);
    const enSlug = mine.id.toString() + "-" + slugify(mine.name.en);
    const canonicalSlug = locale === "tr" ? trSlug : enSlug;
    const canonicalPath = `/${locale}/mine/${canonicalSlug}/`;
    const description = Array.isArray(mine.description[locale])
        ? mine.description[locale].join(" ")
        : mine.description[locale];

    const metaObj = {
        title: mine.name[locale],
        description,
        keywords: mine.keywords[locale],
        alternates: {
            canonical: canonicalPath,
            languages: {
                "tr-TR": `/tr/mine/${trSlug}/`,
                "en-US": `/en/mine/${enSlug}/`,
            },
        },
        openGraph: {
            title: mine.name[locale],
            description,
            url: "https://www.pomzaexport.com" + canonicalPath,
            images: [
                {
                    url: "https://www.pomzaexport.com" + mine.images[0],
                    alt: mine.name[locale],
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

export default async function MineLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
