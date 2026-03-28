import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const INPUT_ROOT = path.join(PUBLIC_DIR, "assets");
const OUTPUT_ROOT = path.join(PUBLIC_DIR, "assets-responsive");

const PROFILES = [
    { name: "web", width: 1600 },
    { name: "mobile", width: 800 },
];

const WEBP_QUALITY = 75;
const JPEG_QUALITY = 78;
const PNG_QUALITY = 80;
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const isSupportedAsset = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return SUPPORTED_EXTENSIONS.has(ext);
};

const getFallbackExtension = (sourceExt) => {
    if (sourceExt === ".png") {
        return ".png";
    }

    return ".jpg";
};

const walk = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                return walk(fullPath);
            }
            return fullPath;
        })
    );

    return files.flat();
};

const ensureDir = async (filePath) => {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
};

const buildOutputPath = (profileName, formatFolder, relativeInputPath, ext) => {
    const parsed = path.parse(relativeInputPath);
    return path.join(
        OUTPUT_ROOT,
        profileName,
        formatFolder,
        parsed.dir,
        `${parsed.name}${ext}`
    );
};

const processAsset = async (assetPath) => {
    const relativePath = path.relative(INPUT_ROOT, assetPath);
    const sourceExt = path.extname(assetPath).toLowerCase();
    const fallbackExt = getFallbackExtension(sourceExt);

    for (const profile of PROFILES) {
        const webpOutput = buildOutputPath(
            profile.name,
            "webp",
            relativePath,
            ".webp"
        );
        const fallbackOutput = buildOutputPath(
            profile.name,
            "fallback",
            relativePath,
            fallbackExt
        );

        await ensureDir(webpOutput);
        await ensureDir(fallbackOutput);

        const baseTransform = sharp(assetPath).rotate().resize({
            width: profile.width,
            withoutEnlargement: true,
            fit: "inside",
        });

        await baseTransform.clone().webp({ quality: WEBP_QUALITY }).toFile(webpOutput);

        if (fallbackExt === ".png") {
            await baseTransform
                .clone()
                .png({
                    quality: PNG_QUALITY,
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                })
                .toFile(fallbackOutput);
        } else {
            await baseTransform
                .clone()
                .jpeg({
                    quality: JPEG_QUALITY,
                    progressive: true,
                    mozjpeg: true,
                })
                .toFile(fallbackOutput);
        }
    }
};

const run = async () => {
    const hasInputDir = await fs
        .access(INPUT_ROOT)
        .then(() => true)
        .catch(() => false);

    if (!hasInputDir) {
        throw new Error(`Input folder not found: ${INPUT_ROOT}`);
    }

    await fs.rm(OUTPUT_ROOT, { recursive: true, force: true });

    const allFiles = await walk(INPUT_ROOT);
    const imageFiles = allFiles.filter(isSupportedAsset);

    let processed = 0;
    const failed = [];

    for (const filePath of imageFiles) {
        try {
            await processAsset(filePath);
            processed += 1;
        } catch (error) {
            failed.push({
                filePath: path.relative(process.cwd(), filePath),
                message: error instanceof Error ? error.message : String(error),
            });
        }
    }

    console.log(
        `Responsive images generated: ${processed}/${imageFiles.length} source assets`
    );

    if (failed.length > 0) {
        console.error(`Failed assets: ${failed.length}`);
        failed.forEach((entry) => {
            console.error(`- ${entry.filePath}: ${entry.message}`);
        });
        process.exitCode = 1;
    }
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
