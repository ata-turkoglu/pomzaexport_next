/** @type {import('next-sitemap').IConfig} */
const productList = require("./src/data/products.json");
const shortDetailPathRegex = /^\/(tr|en)\/(product|mine)\/\d+$/;

module.exports = {
    siteUrl: "https://www.pomzaexport.com",
    changefreq: "monthly",
    priority: 0.7,
    generateIndexSitemap: false,
    generateRobotsTxt: true,
    exclude: [],
    transform: async (config, path) => {
        const normalizedPath =
            path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

        if (shortDetailPathRegex.test(normalizedPath)) {
            return null;
        }

        if (normalizedPath == "/") {
            return null;
        }

        if (normalizedPath == "/tr" || normalizedPath == "/en") {
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
                            href: "https://www.pomzaexport.com/assets/logo/pomza.png",
                        },
                    },
                ],
            };
        }
        if (checkProductDetail(normalizedPath)) {
            const imgUrl = getProductImage(path);
            return {
                loc: path,
                changefreq: config.changefreq,
                priority: 0.9,
                lastmod: config.autoLastmod
                    ? new Date().toISOString()
                    : undefined,
                images: imgUrl
                    ? [
                          {
                              loc: {
                                  href: config.siteUrl + "/" + imgUrl,
                              },
                          },
                      ]
                    : [],
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
                disallow: [],
            },
        ],
    },
};

const checkProductDetail = (path) => {
    const pathList = path.split("/");
    return pathList.includes("product");
};

const getProductImage = (path) => {
    const list = path.split("/").filter(Boolean);
    const last = list[list.length - 1] || "";
    const id = last.split("-")[0];
    const product = productList.find((itm) => itm.id == id);
    if (!product || !product.image) {
        return null;
    }
    return product.image.slice(1);
};
