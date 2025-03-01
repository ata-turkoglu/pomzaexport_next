"use client";
import React from "react";
import "./css/brands.css";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
/* import { translateText as t } from "../../store/reducers/language"; */

function Brands() {
    const [mobile, setMobile] = useState(null);
    const router = useRouter();
    const { locale } = useParams();
    useEffect(() => {
        window.innerWidth < 768 ? setMobile(true) : setMobile(false);
    }, []);
    return (
        <div className="brands mx-3 md:mx-10 overflow-hidden">
            <div className="content">
                <div className="headerContainer">
                    <h1 color="white">Şirketlerimiz</h1>
                </div>
                <div className="images">
                    <div className="imgContainer">
                        <a href="https://www.pomzaexport.com/" target="_blank">
                            <img src="/assets/logo/pomzaexport-logo-white.png" />
                        </a>
                    </div>
                    <div className="imgContainer">
                        <a href="https://www.eilepomex.com/" target="_blank">
                            <img src="/assets/logo/eilepomex-logo-white.png" />
                        </a>
                    </div>
                </div>
                <div className="images">
                    <div className="imgContainer">
                        <a href="http://www.persanyapi.com.tr/" target="_blank">
                            <img src="/assets/logo/persan-logo-white.png" />
                        </a>
                    </div>
                    <div className="imgContainer">
                        <a href="http://www.erper.com.tr/" target="_blank">
                            <img src="/assets/logo/erper-logo-white.png" />
                        </a>
                    </div>
                </div>
            </div>
            {mobile ? (
                <div className="content-border-h"></div>
            ) : (
                <div className="content-border"></div>
            )}
            <div className="content">
                <div className="headerContainer">
                    <h1 color="white">Markalarımız</h1>
                </div>
                <div className="images">
                    <div className="imgContainer">
                        <img
                            className="cursor-pointer"
                            onClick={() =>
                                router.push("/" + locale + "/product/7")
                            }
                            src="/assets/logo/etiper-logo-white.png"
                        />
                    </div>
                    <div className="imgContainer">
                        <img
                            className="cursor-pointer"
                            onClick={() =>
                                router.push("/" + locale + "/product/1")
                            }
                            src="/assets/logo/sardesquartz-logo-white.png"
                        />
                    </div>
                    <div className="imgContainer">
                        <img
                            className="cursor-pointer"
                            onClick={() =>
                                router.push("/" + locale + "/product/9")
                            }
                            src="/assets/logo/emerex-logo-white.png"
                        />
                    </div>
                </div>
                <div className="images">
                    <div className="imgContainer">
                        <a
                            href="https://www.eilepomex.com/pomexblok"
                            target="_blank"
                        >
                            <img src="/assets/logo/pomexblok-logo-white.png" />
                        </a>
                    </div>
                    <div className="imgContainer">
                        <img
                            className="cursor-pointer"
                            onClick={() =>
                                router.push("/" + locale + "/product/4")
                            }
                            src="/assets/logo/pomexgarnet-logo-white.png"
                        />
                    </div>
                    <div className="imgContainer">
                        <img
                            className="cursor-pointer"
                            onClick={() =>
                                router.push("/" + locale + "/product/10")
                            }
                            src="/assets/logo/pomexbeton-logo-white.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Brands;
