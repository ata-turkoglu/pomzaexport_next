import responsiveImageManifest from "./responsiveImageManifest.json";

const ASSET_PREFIX = "/assets/";

const FALLBACK_MIME_BY_EXT = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
};

const getPathInfo = (src) => {
    if (typeof src !== "string" || !src.startsWith("/")) {
        return null;
    }

    const cleanSrc = src.split("?")[0].split("#")[0];
    const lastDot = cleanSrc.lastIndexOf(".");
    if (lastDot === -1) {
        return null;
    }

    const ext = cleanSrc.slice(lastDot).toLowerCase();
    const base = cleanSrc.slice(0, lastDot);

    return { ext, base };
};

const getFallbackExtension = (sourceExt) => {
    if (sourceExt === ".png") {
        return ".png";
    }
    if (sourceExt === ".webp") {
        return ".jpg";
    }
    if (sourceExt === ".jpg" || sourceExt === ".jpeg") {
        return ".jpg";
    }

    return sourceExt;
};

const toResponsivePath = (src, profile, format, ext) => {
    const relative = src.slice(ASSET_PREFIX.length);
    const normalized = relative.replace(/\.[^./]+$/, ext);
    return `/assets-responsive/${profile}/${format}/${normalized}`;
};

export const getResponsiveImageSources = (src) => {
    if (typeof src !== "string" || !src.startsWith(ASSET_PREFIX)) {
        return null;
    }

    const info = getPathInfo(src);
    if (!info) {
        return null;
    }

    const fallbackExt = getFallbackExtension(info.ext);
    const fallbackType = FALLBACK_MIME_BY_EXT[fallbackExt] || "image/jpeg";

    return {
        mobile: {
            webp: toResponsivePath(src, "mobile", "webp", ".webp"),
            fallback: toResponsivePath(src, "mobile", "fallback", fallbackExt),
            fallbackType,
        },
        web: {
            webp: toResponsivePath(src, "web", "webp", ".webp"),
            fallback: toResponsivePath(src, "web", "fallback", fallbackExt),
            fallbackType,
        },
        original: src,
    };
};

export const getResponsiveImageDimensions = (src) => {
    if (typeof src !== "string") {
        return null;
    }

    const cleanSrc = src.split("?")[0].split("#")[0];
    const item = responsiveImageManifest[cleanSrc];

    if (!item || !item.width || !item.height) {
        return null;
    }

    return item;
};
