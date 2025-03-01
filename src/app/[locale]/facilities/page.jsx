"use client";
import React, { useLayoutEffect } from "react";
import minesJSON from "@/data/mines.json";
import { useParams, useRouter } from "next/navigation";

function Facilities() {
    const router = useRouter();
    const { locale } = useParams();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-16 w-100 bg-[#151a38]"></div>
            <div className="flex flex-col p-2">
                {minesJSON.map((item, index) => (
                    <div
                        key={index}
                        className="w-full h-full relative mb-2 cursor-pointer"
                        onClick={() =>
                            router.push("/" + locale + "/mine/" + item.id)
                        }
                    >
                        <img
                            src={item.images[0]}
                            className="w-full h-full objecj-cover brightness-75"
                        />
                        <span
                            className="text-white z-10 absolute left-0 top-0 right-0 bottom-0 m-auto text-center t-shadow"
                            style={{
                                display: "block",
                                fontSize: "1.8rem",
                                alignSelf: "center",
                                justifySelf: "center",
                            }}
                        >
                            {item.location} <br></br>
                            {item.name.tr}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Facilities;
