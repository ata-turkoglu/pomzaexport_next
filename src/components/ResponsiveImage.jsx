"use client";

import { useState } from "react";
import {
    getResponsiveImageDimensions,
    getResponsiveImageSources,
} from "@/lib/responsiveImage";

export default function ResponsiveImage({ src, alt = "", onError, ...imgProps }) {
    const [forceOriginal, setForceOriginal] = useState(false);
    const sources = getResponsiveImageSources(src);
    const dimensions = getResponsiveImageDimensions(src);
    const isViewHeroImage = src === "/assets/common/view.jpg";
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

    const mobileWebpSrcSet = `${sources.mobile.webp} 1x, ${sources.web.webp} 2x`;
    const mobileFallbackSrcSet = `${sources.mobile.fallback} 1x, ${sources.web.fallback} 2x`;

    return (
        <picture style={{ display: "contents" }}>
            <>
                <source
                    media="(max-width: 767px)"
                    srcSet={mobileWebpSrcSet}
                    type="image/webp"
                />
                <source
                    media="(max-width: 767px)"
                    srcSet={mobileFallbackSrcSet}
                    type={sources.mobile.fallbackType}
                />
            </>
            <source
                media="(min-width: 768px)"
                srcSet={sources.web.webp}
                type="image/webp"
            />
            <source
                media="(min-width: 768px)"
                srcSet={sources.web.fallback}
                type={sources.web.fallbackType}
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
