import Link from "next/link";
import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { slugify } from "@/utils/commonFuncs";

export default function DetailContext({ item, locale, kind }) {
    const tr = locale === "tr";
    const path = `/${locale}/${kind}/${item.id}-${slugify(item.name[locale])}/`;
    const items = [
        { name: tr ? "Ana Sayfa" : "Home", path: `/${locale}/` },
        { name: kind === "product" ? (tr ? "Ürünler" : "Products") : (tr ? "İşletmelerimiz" : "Facilities"), path: `/${locale}/${kind === "product" ? "products" : "facilities"}/` },
        { name: item.name[locale], path },
    ];
    return <>
        <nav aria-label={tr ? "Sayfa yolu" : "Breadcrumb"} className="w-full px-4 pt-3 pb-1 text-neutral-600">
            <ol className="flex flex-wrap gap-2 text-sm max-w-6xl mx-auto">
                {items.map((entry, index) => <li key={entry.path} className={index === 1 ? "md:hidden" : undefined}>
                    {index > 0 && <span aria-hidden="true" className="mr-2">/</span>}
                    {index === items.length - 1 ? <span aria-current="page">{entry.name}</span> : <Link className="underline" href={entry.path}>{entry.name}</Link>}
                </li>)}
            </ol>
        </nav>
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [
            { "@type": "BreadcrumbList", "@id": absoluteUrl(path + "#breadcrumb"), itemListElement: items.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.name, item: absoluteUrl(entry.path) })) },
            { "@type": "WebPage", "@id": absoluteUrl(path + "#webpage"), url: absoluteUrl(path), name: item.name[locale], inLanguage: locale,
                isPartOf: { "@id": absoluteUrl("/#website") }, breadcrumb: { "@id": absoluteUrl(path + "#breadcrumb") },
                about: { "@type": "Thing", name: item.name[locale] },
                publisher: { "@id": absoluteUrl("/#organization") } },
        ] }} />
    </>;
}
