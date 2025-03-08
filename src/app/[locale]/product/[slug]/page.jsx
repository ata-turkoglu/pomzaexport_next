"use client";
//import React, { useEffect, useState, useLayoutEffect } from "react";
import Gallery from "@/components/gallery";
import productsJSON from "@/data/products.json";
import { useTranslations } from "next-intl";
/* import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react"; */

const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
};

function Icon({ id, open }) {
    return (
        <svg
            id={"icon" + id}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${
                open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
    );
}

/* export async function generateStaticParams() {
    return productsJSON.map((product) => {
        return {
            id: product.id.toString(),
        };
    });
} */

const SetUsageAreaListItem = (text) => {
    if (text.includes(":")) {
        const parts = text.split(":");

        return (
            <span className="text-neutral-500">
                <strong>{parts[0]}</strong>: {parts[1]}
            </span>
        );
    } else {
        return text;
    }
};

export default function Product({ params: { locale, slug } }) {
    const t = useTranslations("ProductPage");

    const mobileView = true;
    const id = slug.split("-")[0];
    const data = productsJSON.find((itm) => itm.id == id);

    const productData = data;
    let selectedImg = data.image;

    return (
        <main className="h-fit">
            <div className="flex flex-col min-h-screen h-fit w-full items-center pb-12">
                <div
                    className="w-full relative duration-300"
                    style={{
                        height: !mobileView ? "100vh" : "50vh",
                    }}
                >
                    <img
                        className="w-full h-full object-cover brightness-90"
                        src={selectedImg}
                        loading="lazy"
                    ></img>
                    <h1 className="w-full text-4xl font-bold text-white absolute left-0 flex justify-center bottom-0 pb-5">
                        {productData.name[locale]}
                    </h1>
                </div>

                <div className="p-3 w-full md:w-2/3 h-fit">
                    {productData.whatIs && (
                        <div className="pt-5">
                            <h3 className="mb-1">
                                {productData.whatIs.head[locale]}
                            </h3>
                            <hr className="mb-4" />
                            <div className="text-md text-neutral-500">
                                <span>
                                    {typeof productData.whatIs.content[
                                        locale
                                    ] == "string" ? (
                                        <span>
                                            {productData.whatIs.content[locale]}
                                        </span>
                                    ) : (
                                        <ul>
                                            {productData.whatIs.content[
                                                locale
                                            ].map((itm, indx) => (
                                                <li key={indx} className="mb-2">
                                                    {SetUsageAreaListItem(itm)}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="pt-5">
                        <h3 className="mb-0">{t("productInfo")}</h3>
                        <hr className="mb-4" />
                        <div className="text-md text-neutral-500">
                            {typeof productData.description[locale] ==
                            "string" ? (
                                <span>{productData.description[locale]}</span>
                            ) : (
                                <ul>
                                    {productData.description[locale].map(
                                        (itm, indx) => (
                                            <li key={indx} className="mb-2">
                                                {SetUsageAreaListItem(itm)}
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="pt-5 mb-5">
                        <h3>{t("productImages")}</h3>
                        <Gallery images={productData.images} />
                    </div>

                    {productData.usageAreas && (
                        <div className="pt-5">
                            <h3 className="mb-1">{t("areasOfUsage")}</h3>
                            <hr className="mb-4" />
                            <div className="text-md text-neutral-500"></div>
                            {typeof productData.usageAreas[locale] ==
                            "string" ? (
                                <span>{productData.usageAreas[locale]}</span>
                            ) : (
                                <ul>
                                    {productData.usageAreas[locale].map(
                                        (itm, indx) => (
                                            <li key={indx} className="mb-3">
                                                {SetUsageAreaListItem(itm)}
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    )}

                    {productData.productVariety && (
                        <div className="pt-5">
                            <h3 className="mb-1">{t("productVariety")}</h3>
                            <hr className="mb-4" />
                            <div className="text-md">
                                {productData.productVariety[locale]}
                            </div>
                        </div>
                    )}

                    {productData.technicalInfo && (
                        <div className="pt-5">
                            <h3 className="mb-1">{t("technicalInfo")}</h3>
                            <hr className="mb-4" />
                            <div className="text-md text-neutral-500">
                                {typeof productData.technicalInfo[locale] ==
                                "string" ? (
                                    <span>
                                        {productData.technicalInfo[locale]}
                                    </span>
                                ) : (
                                    <ul>
                                        {productData.technicalInfo[locale].map(
                                            (itm, indx) => (
                                                <li key={indx} className="mb-3">
                                                    {SetUsageAreaListItem(itm)}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
