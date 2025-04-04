"use client";
import React, { useLayoutEffect } from "react";
import productsJSON from "@/data/products.json";
import { useParams, useRouter } from "next/navigation";
import { slugify } from "@/utils/commonFuncs";

function Products() {
    const router = useRouter();
    const { locale } = useParams();

    const setSlug = (id, name) => {
        return id.toString() + "-" + slugify(name);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-16 w-100 bg-[#151a38]"></div>
            <div className="grid grid-cols-2 gap-2 p-2">
                {productsJSON.map((item, index) => (
                    <div
                        key={index}
                        className="w-full h-full relative cursor-pointer"
                        onClick={() => {
                            item.externalLink
                                ? window.open(item.link, "_blank")
                                : router.push(
                                      "/" +
                                          locale +
                                          "/product/" +
                                          setSlug(item.id, item.name[locale])
                                  );
                        }}
                    >
                        <img
                            src={item.image}
                            className="w-full h-full objecj-cover"
                            alt={item.name[locale]}
                        />
                        <span
                            className="text-white font-semibold z-10 absolute left-0 top-0 right-0 bottom-0 m-auto text-center"
                            style={{
                                display: "block",
                                fontSize: "1.8rem",
                                alignSelf: "center",
                                justifySelf: "center",
                            }}
                        >
                            {item.name[locale]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
