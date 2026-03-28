"use client";

import React, { useRef, useState } from "react";
import TextTransitions, { TextContainer } from "./textTransitions";
//import "@/components/css/introVideo.css";
import { useTranslations } from "next-intl";

export default function IntroVideo() {
    const t = useTranslations("Intro");
    const [videoError, setVideoError] = useState(false);
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
        setVideoError(true);
        if (errorDispatched.current) {
            return;
        }
        errorDispatched.current = true;
        dispatchHeroEvent("hero-video-error");
    };

    return (
        <div className="relative">
            <div className="h-full w-full overflow-hidden hidden md:block">
                {!videoError ? (
                    <video
                        autoPlay={true}
                        muted
                        playsInline
                        preload="metadata"
                        poster="/assets/common/view.jpg"
                        onCanPlay={handleVideoCanPlay}
                        onError={handleVideoError}
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
                ) : (
                    <img
                        className="w-full h-full object-cover"
                        src="/assets/common/view.jpg"
                        style={{
                            filter: "brightness(70%)",
                            objectPosition: "40%",
                        }}
                        alt="pomza export"
                    />
                )}
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
