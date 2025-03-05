"use client";
import React from "react";
import { Linkedin, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { slugify } from "@/utils/commonFuncs";
import minesJSON from "@/data/mines.json";
import productsJSON from "@/data/products.json";
import { useParams } from "next/navigation";

function Footer({ hFull = false }) {
    const t = useTranslations("Footer");
    const t_c = useTranslations("Contact");
    const { locale } = useParams();
    return (
        <footer
            className="w-full bg-[#151a38] md:px-10 p-4 pt-10 max-w-screen-2x1 mx-auto text-white overflow-scroll"
            style={{ height: hFull ? "100vh" : "fit-content" }}
        >
            <div className="my-12 flex flex-col md:flex-row gap-10">
                <div className="md:w-1/3 space-y-8">
                    {!hFull && (
                        <Link
                            href="/"
                            className="text-2x1 font-semibold flex items-center space-x-3 text-primary"
                        >
                            <img
                                src="/assets/logo/pomzaexport-logo-white.png"
                                alt="pomza export"
                                className="w-60 inline-block items-center"
                            />
                        </Link>
                    )}
                    <p className="md:w-1/2"></p>
                </div>
                {/* footer navigations */}
                <div className="md:w-2/3 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start">
                    {/* Mines */}
                    <div className="space-y-4 mt-4">
                        <h4 className="text-xl underline capitalize">
                            {t("facilities")}
                        </h4>
                        <ul className="space-y-3">
                            {minesJSON.map((item, key) => {
                                return (
                                    <Link
                                        key={key}
                                        className="block hover:text-gray-300"
                                        href={"/" + locale + "/mine/" + item.id}
                                    >
                                        {item.name[locale]}
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="space-y-4 mt-4">
                        <h4 className="text-xl underline capitalize">
                            {t("products")}
                        </h4>
                        <ul className="space-y-3">
                            {productsJSON.map((item, key) => {
                                return (
                                    <Link
                                        key={key}
                                        className="block hover:text-gray-300"
                                        href={
                                            item.externalLink
                                                ? item.link
                                                : "/" +
                                                  locale +
                                                  "/product/" +
                                                  item.id
                                        }
                                    >
                                        {item.name[locale]}
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Address */}
                    <div className="space-y-4 mt-4">
                        <h4 className="text-xl underline capitalize">
                            {t_c("contactAdresses")}
                        </h4>
                        <ul className="space-y-5 text-sm">
                            <p className="hover:text-gray-300">
                                <strong className="uppercase">
                                    {t_c("sartMadenIsletmesi")}
                                </strong>
                                <br />
                                Sart Mah. Pomza Sk. No: 40
                                <br />
                                Salihli/MANİSA
                                <br />
                                <span className="capitalize">
                                    {t_c("telephone")}
                                </span>{" "}
                                : +90 236 724 20 21
                                <br />
                                <span className="capitalize">
                                    {t_c("fax")}
                                </span>{" "}
                                : +90 236 724 30 51
                            </p>
                            <p className="hover:text-gray-300">
                                <strong className="uppercase">
                                    {t_c("menderesMadenIsletmesi")}
                                </strong>
                                <br />
                                Küner Mah. 7801 Sk. No:94
                                <br />
                                Menderes/İZMİR
                                <br />
                                <span className="capitalize">
                                    {t_c("telephone")}
                                </span>{" "}
                                : +90 232 782 14 46
                                <br />
                                <span className="capitalize">
                                    {t_c("fax")}
                                </span>{" "}
                                : +90 232 782 15 98
                            </p>
                            <p className="hover:text-gray-300">
                                <strong className="uppercase">
                                    {t_c("etiperPerlitIsletmesi")}
                                </strong>
                                <br />
                                Yeniköy Mah. Menderes - Orhanlı Yolu Sk. No:
                                179/22 <br /> Menderes/İZMİR
                                <br />
                                <span className="capitalize">
                                    {t_c("telephone")}
                                </span>{" "}
                                : +90 232 787 67 24
                                <br />
                                <span className="capitalize">
                                    {t_c("fax")}
                                </span>{" "}
                                : +90 232 782 67 25
                            </p>
                            <p className="hover:text-gray-300">
                                <strong className="uppercase">
                                    {t_c("eilePomex")}
                                </strong>
                                <br />
                                Yeniköy Mah. Menderes - Orhanlı Yolu Sk. No:
                                179/22
                                <br />
                                Menderes/İZMİR
                                <br />
                                <span className="capitalize">
                                    {t_c("telephone")}
                                </span>{" "}
                                : +90 232 360 17 77
                                <br />
                                <span className="capitalize">
                                    {t_c("fax")}
                                </span>{" "}
                                : +90 232 360 16 16
                            </p>
                            <p className="hover:text-gray-300">
                                <strong className="uppercase">
                                    {t_c("ankaraOffice")}
                                </strong>
                                <br />
                                Çukurca Birlik Mah. 447 Sk. No: 3/5
                                <br />
                                Çankaya/ANKARA
                                <br />
                                <span className="capitalize">
                                    {t_c("telephone")}
                                </span>{" "}
                                : +90 312 495 64 90
                                <br />
                                <span className="capitalize">
                                    {t_c("fax")}
                                </span>{" "}
                                : +90 312 495 64 93
                            </p>
                        </ul>
                    </div>
                </div>
            </div>

            <hr />

            {/* Social Media */}
            <div className="flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8">
                <p className="capitalize">{t("copyright")}</p>
                <div className="flex items-center space-x-5">
                    <Link
                        href="https://www.linkedin.com/company/pomzaexport/"
                        target="_blank"
                        aria-label="LinkedIn"
                        className="w-8 cursor-pointer hover:-translate-y-1 transition-all duration-300"
                    >
                        <Linkedin />
                    </Link>
                    <Link
                        href="https://facebook.com"
                        target="_blank"
                        aria-label="Facebook"
                        className="w-8 cursor-pointer hover:-translate-y-1 transition-all duration-300"
                    >
                        <Facebook />
                    </Link>
                    <Link
                        href="https://youtube.com"
                        target="_blank"
                        aria-label="Youtube"
                        className="w-8 cursor-pointer hover:-translate-y-1 transition-all duration-300"
                    >
                        <Youtube />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
