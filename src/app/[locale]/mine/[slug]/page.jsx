"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import ImgCarousel from "@/components/imgCarousel";
import minesJSON from "@/data/mines.json";
import productsJSON from "@/data/products.json";
import "./mine.css";
import "@/components/css/facilityBanner.css";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Mine({ params: { locale, slug } }) {
    const router = useRouter();
    const [mineData, setMineData] = useState(null);

    const [mineId, setMineId] = useState(null);
    const [mobileView, setMobileView] = useState(false);
    const [header, setHeader] = useState("");
    const [description, setDescription] = useState("");
    const [mineImages, setMineImages] = useState([]);
    const [mapSrc, setMapSrc] = useState(null);
    const [mineProducts, setMineProducts] = useState([]);
    const [productName, setProductName] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [showingImage, setShowingImage] = useState(false);
    const [linkId, setLinkId] = useState(null);
    const [external, setExternal] = useState(false);
    const t = useTranslations("MinePage");

    const mouseOver = (e, name) => {
        setProductName(name);
        if (e.target.src) {
            setImgUrl(e.target.src);
            setShowingImage(true);
        } else {
            setImgUrl(e.target.previousSibling.src);
            setShowingImage(true);
        }
    };

    const mouseLeave = (e) => {
        setProductName(null);
        setShowingImage(false);
    };

    useLayoutEffect(() => {
        const id = slug.split("-")[0];
        setMineId(id);

        const data = minesJSON.find((itm) => itm.id == id);
        setMineData(data);

        const products = productsJSON.filter((item) => item.facilityId == id);
        setMineProducts([...products]);

        if (window.innerWidth < 768) {
            setMobileView(true);
        }
    }, []);

    /*     useLayoutEffect(() => {
        if (mineId) {
            const data = minesJSON.find((itm) => itm.id == mineId);
            setHeader(data.name[locale]);
            setDescription(data.info[locale]);
            setMineImages([...data.images]);
            setMapSrc(data.mapSrc);

            const products = productsJSON.filter(
                (item) => item.facilityId == mineId
            );
            setMineProducts([...products]);
        }
    }, [mineId]); */

    useEffect(() => {
        const el = document.getElementById("showImage" + mineId);
        if (showingImage) {
            el.classList.remove("leaveAnim");
            el.classList.add("enterAnim");
            el.style.display = "block";
        } else if (el) {
            el.classList.remove("enterAnim");
            el.classList.toggle("leaveAnim");
            setTimeout(() => {
                el.style.display = "none";
                setImgUrl(null);
            }, 300);
        }
    }, [showingImage]);

    return (
        <>
            {mineData && (
                <main className="flex flex-col h-fit w-full items-center overflow-scroll">
                    {/* Image Container */}
                    <div
                        className="h-fit w-full overflow-hidden relative"
                        style={{ height: mobileView ? "50vh" : "70vh" }}
                    >
                        <ImgCarousel images={[...mineData.images]} />
                        <h1
                            className="absolute font-semibold text-white text-3xl md:text-6xl w-fit flex justify-center t-shadow"
                            style={{
                                top: mobileView ? "85%" : "80%",
                                left: "5%",
                            }}
                        >
                            {mineData.name[locale]}
                        </h1>
                        <div
                            id={"showImage" + mineData.id}
                            className="absolute left-0 top-0 w-full h-full bg-black z-200 hidden"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src={imgUrl}
                            ></img>
                            {!mobileView && (
                                <span className="text-white z-10 absolute left-10 bottom-10 text-6xl t-shadow">
                                    {productName}
                                </span>
                            )}
                            {mobileView && (
                                <span
                                    className="absolute right-0 left-0 mx-auto bottom-5 w-fit h-fit p-2 text-white"
                                    style={{ border: "1px solid white" }}
                                    onClick={() => {
                                        external
                                            ? window.open(linkId, "_blank")
                                            : router.push(
                                                  "/" +
                                                      locale +
                                                      "/product/" +
                                                      linkId
                                              );
                                    }}
                                >
                                    {t("goToProductPage")}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Product Container */}
                    <div
                        className="w-full py-3 md:py-8 md:pl-3 md:pr-0 px-3 grid grid-cols-2 gap-2 md:gap-0 md:flex md:items-center md:justify-center duration-200"
                        style={{ height: mobileView ? "fit-content" : "30vh" }}
                    >
                        {mineProducts.map((item, key) => {
                            return (
                                <div
                                    key={key}
                                    className="w-full h-full md:max-w-max overflow-hidden cursor-pointer md:mr-1 hover:shadow-lg shadow-black duration-200 productContainer relative"
                                    onClick={() => {
                                        !mobileView &&
                                            (item.externalLink
                                                ? window.open(
                                                      item.link,
                                                      "_blank"
                                                  )
                                                : router.push(
                                                      "/" +
                                                          locale +
                                                          "/product/" +
                                                          item.id
                                                  ));
                                        mobileView &&
                                            window.scrollTo({
                                                top: 0,
                                                left: 0,
                                                behavior: "smooth",
                                            });
                                    }}
                                    onMouseOver={(e) => {
                                        mouseOver(e, item.name[locale]);
                                        item.externalLink
                                            ? setExternal(true)
                                            : setExternal(false);
                                        item.externalLink
                                            ? setLinkId(item.link)
                                            : setLinkId(item.id);
                                    }}
                                    onMouseLeave={(e) => {
                                        mouseLeave(e);
                                        setLinkId(null);
                                    }}
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        src={item.image}
                                        alt={item.name[locale]}
                                    ></img>
                                    {mobileView && (
                                        <span
                                            className="text-white font-semibold z-10 text-center t-shadow"
                                            style={{
                                                display: mobileView
                                                    ? "block"
                                                    : "",
                                                fontSize: mobileView
                                                    ? "1.5rem"
                                                    : "",
                                            }}
                                        >
                                            {item.name[locale]}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="md:w-1/2 w-full p-3 mb-10 text-justify">
                        {mineData.description[locale]}
                    </div>

                    <div className="md:w-1/2 w-full flex items-center justify-center mb-10">
                        <div className="w-full flex items-center justify-center">
                            <iframe
                                src={mineData.mapSrc}
                                width={mobileView ? "380" : "500"}
                                height={mobileView ? "380" : "500"}
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
