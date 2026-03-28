import "@/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SiteSplashGate from "@/components/siteSplashGate";
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
                    url: "https://www.pomzaexport.com/assets/logo/pomza.png",
                    height: "457",
                    width: "1364",
                    alt: "pomza export",
                },
                {
                    url: "https://www.pomzaexport.com/assets/logo/pomzaexport-logo-white.png",
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
            follow: true,
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
            path: "../../fonts/GloberSemiBold.otf",
            weight: "600",
            style: "normal",
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
                    " antialiased w-full h-full overflow-auto relative"
                }
            >
                <NextIntlClientProvider messages={messages}>
                    <SiteSplashGate />
                    <Header />
                    {children}
                    <Footer />
                    <div
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            zIndex: 50,
                            width: "fit-content",
                            height: "fit-content",
                            cursor: "pointer",
                        }}
                    >
                        <a
                            href="https://wa.me/+905348953039"
                            target="_blank"
                            aria-label="Chat on WhatsApp"
                        >
                            <img
                                src="/assets/logo/whatsapp.png"
                                alt="Chat on WhatsApp"
                                width={40}
                                style={{
                                    filter: "drop-shadow(0 0 8px grey)",
                                }}
                            />
                        </a>
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
