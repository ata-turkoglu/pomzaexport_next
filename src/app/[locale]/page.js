import IntroVideo from "@/components/introVideo";
import FacilitiesLinks from "@/components/facilitiesLinks";
import Brands from "@/components/brands";
import Sustainability from "@/components/sustainability";

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

function Home({ params: { locale } }) {
    setRequestLocale(locale);
    const t = useTranslations("Home");

    const getHeader = (locale) => {
        if (locale == "tr") {
            return "Pomza Export Madencilik";
        } else {
            return "Pomza Export Mining Company";
        }
    };

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
