"use client";

import React, { useRef } from "react";
import TextTransitions, { TextContainer } from "./textTransitions";
import { useTranslations } from "next-intl";
import ResponsiveImage from "./ResponsiveImage";

export default function IntroVideo() {
    const t = useTranslations("Intro");
    const readyDispatched = useRef(false);
    const errorDispatched = useRef(false);

    const dispatchHeroEvent = (eventName) => {
        window.dispatchEvent(new CustomEvent(eventName));
    };

    const handleVideoCanPlay = () => {
        if (readyDispatched.current) {
            return;
        }
        readyDispatched.current = true;
        dispatchHeroEvent("hero-video-ready");
    };

    const handleVideoError = () => {
        if (errorDispatched.current) {
            return;
        }
        errorDispatched.current = true;
        dispatchHeroEvent("hero-video-error");
    };

    return (
        <div className="relative">
            <div className="h-full w-full overflow-hidden hidden md:block bg-black">
                <video
                    autoPlay={true}
                    muted
                    playsInline
                    preload="metadata"
                    onCanPlay={handleVideoCanPlay}
                    onError={handleVideoError}
                    className="w-full h-full object-cover"
                    style={{
                        filter: "brightness(70%)",
                        zIndex: 0,
                    }}
                    loop={true}
                >
                    <source
                        src="/assets/video/pmzaltin-faststart.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
            <div className="h-screen w-full md:hidden">
                <ResponsiveImage
                    className="w-full h-full object-cover"
                    src="/assets/common/view.jpg"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    style={{
                        filter: "brightness(70%)",
                        objectPosition: "40%",
                    }}
                    alt="pomza export"
                />
            </div>
            <div className="absolute z-10 bottom-1/4 inset-x-0 h-[160px] md:h-[220px] w-full px-4 overflow-hidden">
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
