import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const INPUT_ROOT = path.join(PUBLIC_DIR, "assets");
const OUTPUT_ROOT = path.join(PUBLIC_DIR, "assets-responsive");
const MANIFEST_PATH = path.resolve(
    process.cwd(),
    "src/lib/responsiveImageManifest.json"
);

const PROFILES = [
    { name: "web", width: 1600 },
    { name: "mobile", width: 800 },
    { name: "listing", width: 400 },
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

const toWebPath = (relativePath) =>
    `/assets/${relativePath.split(path.sep).join("/")}`;

const processAsset = async (assetPath, manifest) => {
    const relativePath = path.relative(INPUT_ROOT, assetPath);
    const sourceExt = path.extname(assetPath).toLowerCase();
    const fallbackExt = getFallbackExtension(sourceExt);
    const sourceImage = sharp(assetPath).rotate();
    const metadata = await sourceImage.metadata();

    manifest[toWebPath(relativePath)] = {
        width: metadata.width || null,
        height: metadata.height || null,
    };

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

        const baseTransform = sourceImage.clone().resize({
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
    const manifest = {};

    let processed = 0;
    const failed = [];

    for (const filePath of imageFiles) {
        try {
            await processAsset(filePath, manifest);
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

    const sortedManifest = Object.fromEntries(
        Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
    );
    await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
    await fs.writeFile(MANIFEST_PATH, JSON.stringify(sortedManifest, null, 2));
    console.log(
        `Responsive image manifest generated: ${path.relative(
            process.cwd(),
            MANIFEST_PATH
        )}`
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
