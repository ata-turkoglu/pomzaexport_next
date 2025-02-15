"use client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import productsJSON from "@/data/products.json";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

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

export default function Product({ params }) {
    const productId = params.id;
    /*     const [productData, setProductData] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null); */
    //const [mobileView, setMobileView] = useState(false);

    /* useLayoutEffect(() => {
        if (window.innerWidth < 768) {
            setMobileView(true);
        }
        window.scrollTo(0, 0);
    }, []); */

    const mobileView = true;
    console.log(mobileView);
    const data = productsJSON.find((itm) => itm.id == productId);

    const productData = data;
    let selectedImg = data.image;

    /*     useEffect(() => {
        const data = productsJSON.find((itm) => itm.id == productId);
        setSelectedImg(data.image);
        setProductData(data);
    }, [productId]); */

    return (
        <div className="h-fit">
            {productData && (
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
                            {productData.name.tr}
                        </h1>
                    </div>
                    <div className="p-3 w-full md:w-2/3 h-fit">
                        <h3>Ürün Bilgileri</h3>
                        {typeof productData.description.tr == "string" ? (
                            productData.description.tr
                        ) : (
                            <ul>
                                {productData.description.tr.map((itm, indx) => (
                                    <li key={indx}>{itm}</li>
                                ))}
                            </ul>
                        )}

                        {productData.images.length > 0 && (
                            <div className="pt-5">
                                <h3>Ürün Resimleri</h3>
                                <div className="h-full w-full grid grid-cols-3 gap-1 md:gap-0 md:flex md:items-center md:justify-center">
                                    {productData.images.map((item, indx) => (
                                        <div
                                            key={indx}
                                            className="h-full max-h-40 w-full md:max-w-52 md:mx-1 cursor-pointer overflow-hidden"
                                            onClick={() => {
                                                selectedImg = item;
                                                window.scrollTo(0, 0);
                                            }}
                                        >
                                            <img
                                                className="w-full h-full object-cover"
                                                src={item}
                                            ></img>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {productData.usageAreas.tr && (
                            <div className="pt-5">
                                <h3>Kullanım Alanları</h3>
                                <div className="text-md">
                                    {productData.usageAreas.tr}
                                </div>
                            </div>
                        )}
                        {productData.productVariety.tr && (
                            <div className="pt-5">
                                <h3>Ürün Çeşitleri</h3>
                                <div className="text-md">
                                    {productData.productVariety.tr}
                                </div>
                            </div>
                        )}
                        {productData.technicalInfo && (
                            <div className="pt-5">
                                <h3>Teknik Bilgiler</h3>
                                <div>
                                    {productData.technicalInfo.gravity && (
                                        <span>
                                            Yoğunluk:
                                            {" " +
                                                productData.technicalInfo
                                                    .gravity}
                                        </span>
                                    )}
                                    {productData.technicalInfo.hardness && (
                                        <span>
                                            Sertlik:
                                            {" " +
                                                productData.technicalInfo
                                                    .hardness}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
