import React from "react";
import TextTransitions, { TextContainer } from "./textTransitions";
//import "@/components/css/introVideo.css";
import { useTranslations } from "next-intl";

export default function IntroVideo() {
    const t = useTranslations("Intro");
    return (
        <div className="relative">
            <div className="h-full w-full overflow-hidden hidden md:block">
                <video
                    autoPlay={true}
                    muted
                    style={{
                        filter: "brightness(70%)",
                        zIndex: 0,
                    }}
                    loop={true}
                >
                    <source src="/assets/video/pmzaltin.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="h-screen w-full md:hidden">
                <img
                    className="w-full h-full object-cover slide"
                    src="/assets/common/view.jpg"
                    style={{
                        filter: "brightness(70%)",
                        objectPosition: "40%",
                    }}
                    alt="pomza export"
                />
            </div>
            <div className="absolute z-10 bottom-1/4 inset-x-0 h-fit w-full px-4">
                <TextTransitions>
                    <TextContainer>
                        {t("weContinueWhereTheLydiansLeftOff")}
                    </TextContainer>
                    <TextContainer>
                        {t(
                            "weAreTheFirstDomesticCompanyToProduceGoldInTurkiye"
                        )}
                    </TextContainer>
                    <TextContainer>{t("weWorkWithZeroWaste")}</TextContainer>
                    <TextContainer>
                        {t("weAreTheFirstAndOnlyRutileProducerInTurkiye")}
                    </TextContainer>
                    <TextContainer>
                        {t(
                            "weAreALeaderInEnvironmentalWorkInTheTurkishMiningIndustry"
                        )}
                    </TextContainer>
                    <TextContainer>
                        {t("weAreTheFirstAndOnlyGarnetProducerInTheCountry")}
                    </TextContainer>
                </TextTransitions>
            </div>
        </div>
    );
}
