import "@/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import siteMetaData from "@/lib/siteMetaData";
import localFont from "next/font/local";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return {
        title: {
            //template: locale == "tr" ? `%s Madencilik` : `%s Mining Company`,
        },
        title: {
            default:
                locale == "tr"
                    ? "Pomza Export Madencilik"
                    : "Pomza Export Mining Company",
        },
        description: siteMetaData.description[locale],
        keywords: siteMetaData.keywords[locale],
        openGraph: {
            title: siteMetaData.title,
            description: siteMetaData.description[locale],
            url: siteMetaData.siteUrl + locale + "/",
            siteName: siteMetaData.title,
            images: [
                {
                    url: "https://www.eilepomex.com/assets/logo/pomza.png",
                    height: "457",
                    width: "1364",
                    alt: "pomza export",
                },
                {
                    url: "https://www.eilepomex.com/assets/logo/pomzaexport-logo-white.png",
                    height: "59",
                    width: "309",
                    alt: "pomza export",
                },
            ],
            locale,
            type: "website",
        },
        robots: {
            index: true,
            folow: true,
            //noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

const GloberFont = localFont({
    src: [
        {
            path: "../../fonts/GloberRegular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../fonts/GloberRegularItalic.otf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../../fonts/GloberBold.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../fonts/GloberBoldItalic.otf",
            weight: "700",
            style: "italic",
        },
    ],
});

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    const messages = await getMessages();
    setRequestLocale(locale);

    return (
        <html lang={locale}>
            <body
                className={
                    GloberFont.className +
                    " antialiased w-full h-full overflow-auto"
                }
            >
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
