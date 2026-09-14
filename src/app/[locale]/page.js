import Link from "next/link";
import IntroVideo from "@/components/introVideo";
import HomeBelowFoldLazy from "@/components/homeBelowFoldLazy";
import siteMetaData from "@/lib/siteMetaData";

import { setRequestLocale } from "next-intl/server";

const getHeader = (locale) => {
    if (locale == "tr") {
        return "Pomza Export Madencilik";
    } else {
        return "Pomza Export Mining Company";
    }
};

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return {
        title: getHeader(locale),
        description: siteMetaData.description[locale],
        keywords: siteMetaData.keywords[locale],
        alternates: {
            canonical: `/${locale}/`,
            languages: {
                "tr-TR": "/tr/",
                "en-US": "/en/",
            },
        },
    };
}

function Home({ params: { locale } }) {
    setRequestLocale(locale);

    return (
        <main
            id="home"
            className="flex flex-col h-fit md:min-w-full md:min-h-max"
        >
            <IntroVideo />
            <section className="mx-auto w-full max-w-5xl px-5 py-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold">{locale === "tr" ? "Altın ve Endüstriyel Mineraller" : "Gold and Industrial Minerals"}</h1>
                <p className="mt-5 text-lg leading-relaxed">{locale === "tr"
                    ? "Pomza Export; altın başta olmak üzere çok çeşitli endüstriyel mineral ve inşaat sektörüne yönelik malzeme çözümleri sunar."
                    : "Pomza Export supplies gold, a broad range of industrial minerals, and material solutions for the construction industry."}</p>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-600">{locale === "tr"
                    ? "Manisa ve İzmir’deki işletmelerimizde madencilik ve mineral işlemeyi, verimli kaynak kullanımı ve saha rehabilitasyonu anlayışıyla yürütüyoruz."
                    : "At our facilities in Manisa and İzmir, we combine mining and mineral processing with efficient resource use and site rehabilitation."}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-6 md:hidden">
                    <Link className="underline" href={`/${locale}/products/`}>{locale === "tr" ? "Mineralleri ve ürünleri inceleyin" : "Explore minerals and products"}</Link>
                    <Link className="underline" href={`/${locale}/facilities/`}>{locale === "tr" ? "Maden işletmelerimizi tanıyın" : "Discover our mining facilities"}</Link>
                </div>
            </section>
            <HomeBelowFoldLazy />
        </main>
    );
}

export default Home;
