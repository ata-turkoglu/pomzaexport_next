/** @type {import('next-sitemap').IConfig} */
// Default code you can customize according to your requirements.
const productList = require("./src/data/products.json");
module.exports = {
    siteUrl: "https://pomzaexport.com/",
    changefreq: "monthly",
    priority: 0.7,
    generateIndexSitemap: false,
    generateRobotsTxt: true,
    exclude: ["/tr/docs/", "/en/docs/"],
    transform: async (config, path) => {
        if (path == "/" || path == "/tr" || path == "/en") {
            return {
                loc: path,
                changefreq: config.changefreq,
                priority: 1.0,
                lastmod: config.autoLastmod
                    ? new Date().toISOString()
                    : undefined,
                images: [
                    {
                        loc: {
                            href: "https://pomzaexport.com/assets/logo/pomza.png",
                        },
                    },
                ],
            };
        }
        if (checkProductDetail(path)) {
            const imgUrl = getProductImage(path);
            return {
                loc: path,
                changefreq: config.changefreq,
                priority: 0.9,
                lastmod: config.autoLastmod
                    ? new Date().toISOString()
                    : undefined,
                images: [{ loc: { href: config.siteUrl + imgUrl } }],
            };
        }
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        };
    },
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/tr/docs", "/en/docs"],
            },
        ],
    },
};

const checkProductDetail = (path) => {
    const pathList = path.split("/");
    return pathList.includes("product");
};

const getProductImage = (path) => {
    const list = path.split("/");
    const last = list[list.length - 1];
    const id = last.split("-")[0];
    return productList.find((itm) => itm.id == id).image.slice(1);
};
