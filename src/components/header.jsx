"use client";

import React, { useState, useLayoutEffect } from "react";
import productsJSON from "@/data/products.json";
import minesJSON from "@/data/mines.json";
import "./css/header.css";
import { Drawer } from "@material-tailwind/react";
import { X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { slugify } from "@/utils/commonFuncs";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState(null);

    const route = usePathname();
    const router = useRouter();
    const { locale } = useParams();
    const pathname = usePathname();
    const t = useTranslations("Header");

    const changeLanguage = (language) => {
        setLang(language);
        window.localStorage.setItem("lang", language);

        const realPath = pathname.split("/").splice(2).join("/");
        const pathList = pathname.split("/").splice(2);
        const index = pathList.indexOf("product-details");
        if (index >= 0) {
            const product = productList.find(
                (item) => item.id == pathList[index + 1].split("-")[0]
            );
            const slug =
                product.id.toString() + "-" + slugify(product.name[language]);
            pathList[index + 1] = slug;
            const path = pathList.join("/");
            router.push("/" + language + "/" + path);
        } else {
            router.push("/" + language + "/" + realPath);
        }
    };

    useLayoutEffect(() => {
        setLang(locale);
    }, []);

    return (
        <nav className="bg-transparent flex items-center absolute left-0 top-0 z-40 w-full h-16 px-4">
            <div className="w-full h-full flex items-center justify-between">
                <a
                    href={"/" + locale + "/"}
                    className="w-1/2 md:w-1/4 font-semibold flex items-start"
                >
                    <img
                        src="/assets/logo/pomzaexport-logo-white.png"
                        alt="Pomza Export"
                        className="w-60 d-shadow"
                    />
                </a>
                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        type="button"
                        className="text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>
                {/* Navigation */}
                <div className="hidden md:flex md:items-center space-x-4 h-full text-lg text-white font-semibold">
                    <Link
                        href={"/" + locale + "/about"}
                        className="px-6 py-2 h-full text-md flex items-center cursor-pointer relative nav-link nav-item t-shadow"
                    >
                        <span className="capitalize">{t("aboutus")}</span>
                    </Link>
                    <span className="px-6 py-2 h-full text-lg flex items-center cursor-pointer relative nav-link nav-item t-shadow">
                        <span className="capitalize">{t("facilities")}</span>
                        <ul className="nav-list pb-3">
                            {minesJSON.map((item, key) => {
                                return (
                                    <li
                                        key={key}
                                        className="text-md text-white w-full px-6 pb-3 duration-200 z-40"
                                        onClick={() =>
                                            router.push(
                                                "/" +
                                                    locale +
                                                    "/mine/" +
                                                    item.id
                                            )
                                        }
                                    >
                                        {item.name[locale]}
                                    </li>
                                );
                            })}
                        </ul>
                    </span>
                    <span className="px-6 py-2 h-full text-lg flex items-center cursor-pointer relative nav-link nav-item t-shadow">
                        <span className="capitalize">{t("products")}</span>
                        <ul className="nav-list pb-3">
                            {productsJSON.map((item, key) => {
                                return (
                                    <li
                                        key={key}
                                        className="text-md text-white w-full px-6 pb-2 duration-200 z-40"
                                        onClick={() =>
                                            item.externalLink
                                                ? window.open(
                                                      item.link,
                                                      "_blank"
                                                  )
                                                : router.push(
                                                      "/" +
                                                          locale +
                                                          "/product/" +
                                                          item.id
                                                  )
                                        }
                                    >
                                        {item.name[locale]}
                                    </li>
                                );
                            })}
                        </ul>
                    </span>
                    <Link
                        href={"/" + locale + "/contact"}
                        className="px-6 py-2 h-full text-lg flex items-center cursor-pointer relative nav-link nav-item t-shadow"
                    >
                        <span className="capitalize">{t("contact")}</span>
                    </Link>
                    <span className="px-6 py-2 h-full text-lg flex items-center cursor-pointer relative nav-link nav-item t-shadow">
                        <span>{lang}</span>
                        <ul className="nav-list pb-3">
                            <li
                                className="text-md text-white w-full px-6 pb-3 duration-200 z-40"
                                onClick={() => changeLanguage("tr")}
                            >
                                tr
                            </li>
                            <li
                                className="text-md text-white w-full px-6 pb-3 duration-200 z-40"
                                onClick={() => changeLanguage("en")}
                            >
                                en
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
            {/* Mobile Menu */}
            <Drawer
                placement="top"
                open={isOpen}
                onClose={() => setIsOpen(true)}
                className="h-full w-full absolute"
                style={isOpen ? { display: "flex" } : { display: "none" }}
                overlay={true}
            >
                <div className="p-4 h-fit w-full bg-[#151a38] z-50 flex flex-col items-center md:hidden duration-200">
                    <div className="flex justify-between w-full items-start">
                        <span className="text-white pl-1 h-full text-lg flex items-center cursor-pointer relative nav-link bg-transparent">
                            <span>{lang}</span>
                            <ul className="nav-list pb-3 bg-transparent">
                                <li
                                    className="text-md text-white w-full px-6 pb-3 duration-200 z-40"
                                    onClick={() => changeLanguage("tr")}
                                >
                                    tr
                                </li>
                                <li
                                    className="text-md text-white w-full px-6 pb-3 duration-200 z-40"
                                    onClick={() => changeLanguage("en")}
                                >
                                    en
                                </li>
                            </ul>
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            type="button"
                            className="text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
                        >
                            <X />
                        </button>
                    </div>
                    <Link
                        href={"/" + locale + "/about"}
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-400 my-4 rounded-md text-xl font-medium"
                    >
                        <span className="capitalize">{t("aboutus")}</span>
                    </Link>
                    <Link
                        href={"/" + locale + "/facilities"}
                        onClick={() => setIsOpen(false)}
                        className=" text-white hover:text-gray-400 my-4 rounded-md text-xl font-medium"
                    >
                        <span className="capitalize">{t("facilities")}</span>
                    </Link>
                    <Link
                        href={"/" + locale + "/products"}
                        onClick={() => setIsOpen(false)}
                        className=" text-white hover:text-gray-400 my-4 rounded-md text-xl font-medium"
                    >
                        <span className="capitalize">{t("products")}</span>
                    </Link>
                    <Link
                        href={"/" + locale + "/contact"}
                        onClick={() => setIsOpen(false)}
                        className=" text-white hover:text-gray-400 my-4 rounded-md text-xl font-medium"
                    >
                        <span className="capitalize">{t("contact")}</span>
                    </Link>
                </div>
            </Drawer>
        </nav>
    );
}

export default Header;
