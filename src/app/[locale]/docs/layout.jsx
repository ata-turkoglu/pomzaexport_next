import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function DocsLayout({ children, params }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);
    return <div>{children}</div>;
}
