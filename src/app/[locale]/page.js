import IntroVideo from "@/components/introVideo";
import FacilitiesLinks from "@/components/facilitiesLinks";
import Brands from "@/components/brands";
import Sustainability from "@/components/sustainability";
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
            <h1 style={{ display: "none" }}>{getHeader(locale)}</h1>
            <IntroVideo />
            <FacilitiesLinks />
            <Sustainability />
            <Brands />
        </main>
    );
}

export default Home;
