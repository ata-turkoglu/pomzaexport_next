"use client";

import React, { useEffect, useRef, useState } from "react";
import ImgCarousel from "@/components/imgCarousel";
import minesJSON from "@/data/mines.json";
import productsJSON from "@/data/products.json";
import "./mine.css";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { slugify } from "@/utils/commonFuncs";
import mineTexts from "@/data/mineTexts.js";
import ResponsiveImage from "@/components/ResponsiveImage";

export default function Mine({ params: { locale, slug } }) {
    const router = useRouter();
    const [mineData, setMineData] = useState(null);

    const [mineId, setMineId] = useState(null);
    const [mineProducts, setMineProducts] = useState([]);
    const [previewItem, setPreviewItem] = useState(null);
    const [isPreviewFading, setIsPreviewFading] = useState(false);
    const previewCloseTimeoutRef = useRef(0);
    const t = useTranslations("MinePage");

    const mouseLeave = () => {
        if (!previewItem) {
            return;
        }
        window.clearTimeout(previewCloseTimeoutRef.current);
        setIsPreviewFading(true);
        previewCloseTimeoutRef.current = window.setTimeout(() => {
            setPreviewItem(null);
            setIsPreviewFading(false);
        }, 220);
    };

    const getLocalizedName = (item) =>
        item?.name?.[locale] || item?.name?.tr || item?.name?.en || "";

    const mouseOver = (item) => {
        const localizedName = getLocalizedName(item);

        window.clearTimeout(previewCloseTimeoutRef.current);
        setIsPreviewFading(false);
        setPreviewItem({
            name: localizedName || "",
            image: item?.image || "",
            external: Boolean(item?.externalLink),
            linkId: item?.externalLink
                ? item?.link
                : setSlug(item.id, localizedName || String(item.id)),
        });
    };

    const setSlug = (id, name) => {
        return id.toString() + "-" + slugify(name);
    };

    const isMobileViewport = () =>
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

    useEffect(() => {
        const id = slug.split("-")[0];
        setMineId(id);

        const data = minesJSON.find((itm) => itm.id == id);
        setMineData(data);

        const products = productsJSON.filter((item) => item.facilityId == id);
        setMineProducts(products);
    }, [slug]);

    useEffect(() => {
        return () => {
            window.clearTimeout(previewCloseTimeoutRef.current);
        };
    }, []);

    const isPreviewVisible = Boolean(previewItem?.image);

    return (
        <>
            {mineData && (
                <main className="flex flex-col h-fit w-full items-center overflow-scroll">
                    {/* Image Container */}
                    <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative">
                        <ImgCarousel images={mineData.images} />
                        <h1
                            className="absolute top-[85%] md:top-[80%] left-[5%] font-semibold text-white text-3xl md:text-6xl w-fit flex justify-center t-shadow"
                        >
                            {mineData.name[locale]}
                        </h1>
                        <div
                            className={
                                "absolute left-0 top-0 w-full h-full bg-black z-[200] transition-opacity duration-200 " +
                                (isPreviewVisible && !isPreviewFading
                                    ? "opacity-100"
                                    : "opacity-0 pointer-events-none")
                            }
                        >
                            {previewItem?.image && (
                                <ResponsiveImage
                                    className="w-full h-full object-cover"
                                    src={previewItem.image}
                                    alt={
                                        previewItem.name ||
                                        mineData.name[locale]
                                    }
                                />
                            )}
                            {previewItem?.name && (
                                <span className="hidden md:block text-white z-10 absolute left-10 bottom-10 text-6xl t-shadow">
                                    {previewItem.name}
                                </span>
                            )}
                            {isPreviewVisible && (
                                <span
                                    className="md:hidden absolute right-0 left-0 mx-auto bottom-5 w-fit h-fit p-2 pt-3 text-white z-10"
                                    style={{ border: "1px solid white" }}
                                    role="button"
                                    onClick={() => {
                                        previewItem.external
                                            ? window.open(
                                                  previewItem.linkId,
                                                  "_blank"
                                              )
                                            : router.push(
                                                  "/" +
                                                      locale +
                                                      "/product/" +
                                                      previewItem.linkId
                                              );
                                    }}
                                >
                                    {t("goToProductPage")}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Product Container */}
                    <div className="w-full py-3 md:py-8 md:pl-3 md:pr-0 px-3 grid grid-cols-2 gap-2 md:gap-0 md:flex md:items-center md:justify-center md:h-[30vh] duration-200">
                        {mineProducts.map((item, key) => {
                            return (
                                <div
                                    key={key}
                                    className="w-full aspect-[4/3] md:aspect-auto md:h-full md:max-w-max overflow-hidden cursor-pointer md:mr-1 hover:shadow-lg shadow-black duration-200 productContainer relative"
                                    onClick={() => {
                                        if (!isMobileViewport()) {
                                            if (item.externalLink) {
                                                window.open(item.link, "_blank");
                                            } else {
                                                router.push(
                                                    "/" +
                                                        locale +
                                                        "/product/" +
                                                        setSlug(
                                                            item.id,
                                                            getLocalizedName(
                                                                item
                                                            )
                                                        )
                                                );
                                            }
                                            return;
                                        }

                                        mouseOver(item);
                                        window.scrollTo({
                                            top: 0,
                                            left: 0,
                                            behavior: "smooth",
                                        });
                                    }}
                                    onTouchStart={() => {
                                        if (isMobileViewport()) {
                                            mouseOver(item);
                                        }
                                    }}
                                    onMouseEnter={() => {
                                        if (!isMobileViewport()) {
                                            mouseOver(item);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isMobileViewport()) {
                                            mouseLeave();
                                        }
                                    }}
                                >
                                    <ResponsiveImage
                                        className="w-full h-full object-cover"
                                        src={item.image}
                                        alt={item.name[locale]}
                                    />
                                    <span className="md:hidden flex items-center justify-center text-white font-semibold text-2xl z-10 absolute left-0 top-0 right-0 bottom-0 m-auto text-center t-shadow select-none">
                                        {item.name[locale]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="md:w-1/2 w-full p-3 mb-10 text-justify">
                        {mineTexts[mineId] ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: mineTexts[mineId][locale],
                                }}
                            ></div>
                        ) : (
                            mineData.description[locale]
                        )}
                    </div>

                    <div className="md:w-1/2 w-full flex items-center justify-center mb-10">
                        <div className="w-full flex items-center justify-center">
                            <iframe
                                src={mineData.mapSrc}
                                className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] max-w-full border-0"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}
