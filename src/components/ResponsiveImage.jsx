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
    const preferMobileFallback = src === "/assets/common/view.jpg";
    const resolvedImgProps = { ...imgProps };

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

    if (!sources || forceOriginal) {
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
            {preferMobileFallback ? (
                <source
                    media="(max-width: 767px)"
                    srcSet={sources.mobile.fallback}
                    type={sources.mobile.fallbackType}
                />
            ) : (
                <>
                    <source
                        media="(max-width: 767px)"
                        srcSet={sources.mobile.webp}
                        type="image/webp"
                    />
                    <source
                        media="(max-width: 767px)"
                        srcSet={sources.mobile.fallback}
                        type={sources.mobile.fallbackType}
                    />
                </>
            )}
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
