"use client";

import React, { useEffect, useRef } from "react";
import TextTransitions, { TextContainer } from "./textTransitions";
import { useTranslations } from "next-intl";

export default function IntroVideo() {
    const t = useTranslations("Intro");
    const readyDispatched = useRef(false);
    const errorDispatched = useRef(false);
    const videoRef = useRef(null);
    const mobileImageRef = useRef(null);

    const isMobileViewport = () =>
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

    const dispatchHeroEvent = (status) => {
        if (typeof window === "undefined") {
            return;
        }

        window.__heroMediaStatus = status;
        window.dispatchEvent(new CustomEvent(`hero-media-${status}`));
    };

    const dispatchReady = () => {
        if (readyDispatched.current) {
            return;
        }
        readyDispatched.current = true;
        dispatchHeroEvent("ready");
    };

    const dispatchError = () => {
        if (errorDispatched.current) {
            return;
        }
        errorDispatched.current = true;
        dispatchHeroEvent("error");
    };

    const handleVideoCanPlay = () => {
        if (isMobileViewport()) {
            return;
        }
        dispatchReady();
    };

    const handleVideoError = () => {
        if (isMobileViewport()) {
            return;
        }
        dispatchError();
    };

    const handleImageLoad = () => {
        if (!isMobileViewport()) {
            return;
        }
        dispatchReady();
    };

    const handleImageError = () => {
        if (!isMobileViewport()) {
            return;
        }
        dispatchError();
    };

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (isMobileViewport()) {
            const imageEl = mobileImageRef.current;
            if (!imageEl || !imageEl.complete) {
                return;
            }

            if (imageEl.naturalWidth > 0) {
                dispatchReady();
            } else {
                dispatchError();
            }
            return;
        }

        const videoEl = videoRef.current;
        if (!videoEl) {
            return;
        }

        if (videoEl.error) {
            dispatchError();
            return;
        }

        if (videoEl.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            dispatchReady();
        }
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <div className="absolute inset-0 hidden md:block">
                <video
                    ref={videoRef}
                    autoPlay={true}
                    muted
                    playsInline
                    preload="metadata"
                    onCanPlay={handleVideoCanPlay}
                    onLoadedData={handleVideoCanPlay}
                    onError={handleVideoError}
                    className="absolute inset-0 w-full h-full object-cover"
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
            <div className="absolute inset-0 md:hidden">
                <img
                    ref={mobileImageRef}
                    className="w-full h-full object-cover hero-pan"
                    src="/assets/common/view.jpg"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{
                        filter: "brightness(70%)",
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
        </section>
    );
}
