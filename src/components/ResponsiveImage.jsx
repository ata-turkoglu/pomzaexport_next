"use client";

import { useState } from "react";
import {
    getResponsiveImageDimensions,
    getResponsiveImageSources,
} from "@/lib/responsiveImage";

export default function ResponsiveImage({
    src,
    alt = "",
    onError,
    mobileProfile = "mobile",
    desktopProfile = "web",
    ...imgProps
}) {
    const [forceOriginal, setForceOriginal] = useState(false);
    const sources = getResponsiveImageSources(src);
    const dimensions = getResponsiveImageDimensions(src);
    const isViewHeroImage = src === "/assets/common/view.jpg";
    const mobileSources = sources?.[mobileProfile] || sources?.mobile;
    const desktopSources = sources?.[desktopProfile] || sources?.web;
    const resolvedImgProps = {
        loading: "lazy",
        decoding: "async",
        ...imgProps,
    };

    if (
        resolvedImgProps.width == null &&
        dimensions &&
        typeof dimensions.width === "number"
    ) {
        resolvedImgProps.width = dimensions.width;
    }

    if (
        resolvedImgProps.height == null &&
        dimensions &&
        typeof dimensions.height === "number"
    ) {
        resolvedImgProps.height = dimensions.height;
    }

    if (isViewHeroImage || !sources || forceOriginal) {
        return <img src={src} alt={alt} onError={onError} {...resolvedImgProps} />;
    }

    const handleError = (event) => {
        setForceOriginal(true);
        if (typeof onError === "function") {
            onError(event);
        }
    };

    return (
        <picture style={{ display: "contents" }}>
            <>
                <source
                    media="(max-width: 767px)"
                    srcSet={mobileSources.webp}
                    type="image/webp"
                />
                <source
                    media="(max-width: 767px)"
                    srcSet={mobileSources.fallback}
                    type={mobileSources.fallbackType}
                />
            </>
            <source
                media="(min-width: 768px)"
                srcSet={desktopSources.webp}
                type="image/webp"
            />
            <source
                media="(min-width: 768px)"
                srcSet={desktopSources.fallback}
                type={desktopSources.fallbackType}
            />
            <img
                src={sources.original}
                alt={alt}
                onError={handleError}
                {...resolvedImgProps}
            />
        </picture>
    );
}
