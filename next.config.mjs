/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    output: "export",
    trailingSlash: true,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/tr",
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
