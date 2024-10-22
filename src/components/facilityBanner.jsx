import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/facilityBanner.css";
import minesJSON from "../../data/mines.json";
import productsJSON from "../../data/products.json";

export default function FacilityBanner({ mineId, direction, children }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [mobileView, setMobileView] = useState(false);
    const [showingImage, setShowingImage] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [mineBgImage, setMineBgImage] = useState(null);

    const mouseOver = (e) => {
        if (e.target.src) {
            setImgUrl(e.target.src);
            setShowingImage(true);
        } else {
            setImgUrl(e.target.previousSibling.src);
            setShowingImage(true);
        }
    };

    const mouseLeave = (e) => {
        setShowingImage(false);
    };

    useLayoutEffect(() => {
        const data = minesJSON.find((itm) => itm.id == mineId);
        setHeader(data.name.tr);
        setContent(data.info.tr);
        setMineBgImage(data.mineBgImage);
        setShowingImage(false);

        if (window.innerWidth < 768) {
            setMobileView(true);
        }

        const list = productsJSON
            .filter((item) => item.facilityId == mineId)
            .map((item, index) => {
                const { id, name, image } = item;
                return (
                    <div
                        key={index}
                        onClick={() =>
                            !mobileView &&
                            (item.externalLink
                                ? window.open(item.link, "_blank")
                                : navigate("/product/" + id))
                        }
                        className="relative cursor-pointer hover:-translate-y-2 w-full h-full md:w-44 md:h-40 duration-300 overflow-hidden md:overflow-visible"
                        onMouseOver={mouseOver}
                        onMouseLeave={mouseLeave}
                        style={{ border: "1px solid black" }}
                    >
                        <img
                            src={image}
                            className="w-full h-full object-cover"
                        />
                        <span
                            className="hidden md:block absolute inset-x-0 mx-auto w-3/4 bg-white text-center shadow-lg capitalize"
                            style={{
                                bottom: "-10px",
                                border: "1px solid grey",
                            }}
                        >
                            {name.tr}
                        </span>
                    </div>
                );
            });
        setProducts(list);
    }, [mineId]);

    useEffect(() => {
        const el = document.getElementById("showImage" + mineId);
        if (showingImage) {
            el.classList.remove("leaveAnim");
            el.classList.add("enterAnim");
            el.style.display = "block";
        } else {
            el.classList.remove("enterAnim");
            el.classList.toggle("leaveAnim");
            setTimeout(() => {
                el.style.display = "none";
                setImgUrl(null);
            }, 300);
        }
    }, [showingImage]);

    return (
        <div
            className="h-screen w-full flex md:items-center relative"
            style={{
                flexDirection: direction == "right" ? "row-reverse" : "row",
                background: "rgba(70,70,70,.8)",
            }}
        >
            <div className="h-full w-full md:h-full md:w-1/2 relative">
                <div className="h-full w-full overflow-hidden">
                    <img
                        className="h-full w-full object-cover z-0 scale"
                        src={mineBgImage}
                        style={{
                            filter: mobileView
                                ? "brightness(60%)"
                                : "brightness(80%)",
                        }}
                    ></img>
                </div>

                {/* info */}
                <div
                    id="info"
                    className="bg-whitesmoke text-white text-justify md:text-[#010851] absolute mx-auto left-0 right-0 z-10 h-1/2 w-11/12 md:h-1/2 md:w-full bg-transparent md:bg-white flex flex-col p-4 md:p-7 overflow-scroll md:overflow-hidden"
                    style={{
                        boxShadow: mobileView ? "none" : "0 0 10px grey inset",
                        top: mobileView ? "10%" : "130px",
                        left: !mobileView
                            ? direction == "right"
                                ? "-170%"
                                : "85%"
                            : "",
                        opacity: mobileView ? ".95" : "1",
                        border: mobileView ? "1px solid white" : "none",
                    }}
                >
                    <div className="h-full flex flex-col justify-between">
                        <div className="w-full">
                            <h2 className="text-xl md:text-2xl text-center mb-3 md:mb-7 flex flex-col">
                                {header}
                            </h2>
                            <span className="text-justify text-sm md:text-md h-3/4 md:h-fit overflow-y-scroll">
                                {content}
                            </span>
                        </div>
                        <div className="w-full flex items-center justify-end">
                            <Link
                                className="cursor-pointer drop-shadow p-3 infoLink duration-200"
                                to={"/mine/" + mineId}
                                style={{
                                    border: "1px solid",
                                    borderColor: mobileView
                                        ? "white"
                                        : "#010851",
                                }}
                            >
                                Detaylı Bilgi
                            </Link>
                        </div>
                    </div>
                    <div
                        id={"showImage" + mineId}
                        className="absolute left-0 top-0 w-full h-full bg-black z-20 hidden"
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={imgUrl}
                        ></img>
                    </div>
                </div>
            </div>

            {/* Pattern */}
            {!mobileView && (
                <div className="h-full w-1/2 relative">
                    <img
                        className="w-full h-full"
                        src="/assets/common/pattern.jpg"
                    ></img>
                    <div
                        className="absolute w-full h-full left-0 top-0"
                        style={{
                            backgroundImage:
                                "linear-gradient(to bottom, #252525, #555555, #8a8a8a, #c3c3c3, #ffffff)",
                            backgroundImage:
                                "linear-gradient(to bottom, #03337A,#ffffff)",
                            opacity: ".8",
                        }}
                    ></div>
                </div>
            )}

            {/* products */}
            <div
                className="absolute md:flex md:items-center px-6 w-full h-fit grid grid-cols-3 gap-1 overflow-hidden md:overflow-visible"
                style={{
                    top: mobileView ? "65%" : "75%",
                    justifyContent: direction == "left" ? "end" : "start",
                }}
            >
                {products}
            </div>
        </div>
    );
}
