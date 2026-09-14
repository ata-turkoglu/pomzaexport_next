"use client";
import React from "react";
import productsJSON from "@/data/products.json";
import Link from "next/link";
import { useParams } from "next/navigation";
import { slugify } from "@/utils/commonFuncs";
import ResponsiveImage from "@/components/ResponsiveImage";

function Products() {
    const { locale } = useParams();

    const setSlug = (id, name) => {
        return id.toString() + "-" + slugify(name);
    };

    return (
        <main className="h-full w-full flex flex-col">
            <div className="h-16 w-100 bg-[#151a38]"></div>
            <section className="px-5 py-8 text-center">
                <h1 className="text-3xl font-bold">{locale === "tr" ? "Mineraller ve Ürün Grupları" : "Minerals and Product Groups"}</h1>
                <p className="mt-3">{locale === "tr" ? "Pomza Export ürünlerinin özelliklerini, kullanım alanlarını ve üretim tesislerini tanıyın." : "Explore Pomza Export’s product properties, applications and production facilities."}</p>
            </section>
            <div className="grid grid-cols-2 gap-2 p-2">
                {productsJSON.map((item, index) => (
                    <Link
                        key={item.id}
                        className="w-full aspect-[4/3] md:aspect-[16/10] relative overflow-hidden"
                        href={`/${locale}/product/${setSlug(item.id, item.name[locale])}/`}
                    >
                        <ResponsiveImage
                            src={item.image}
                            className="w-full h-full object-cover"
                            alt={item.name[locale]}
                            desktopProfile="listing"
                            width={400}
                            height={300}
                        />
                        <span
                            className="flex items-center justify-center text-white font-semibold z-10 absolute left-0 top-0 right-0 bottom-0 m-auto text-center"
                            style={{
                                display: "flex",
                                fontSize: "1.6rem",
                            }}
                        >
                            {item.name[locale]}
                        </span>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default Products;
