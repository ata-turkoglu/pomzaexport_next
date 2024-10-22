"use client";

import React, { useState, useRef, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import swal from "sweetalert";
import { Mail } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [token, setToken] = useState(null);

    const recaptchaRef = useRef();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onVerify = useCallback((token) => {
        setToken(token);
    });

    function Send() {
        var body =
            "Name: " +
            formData.name +
            "<br /> Email: " +
            formData.email +
            "<br /> Message: " +
            formData.message;

        window.Email.send({
            Host: "smtp.elasticemail.com",
            Username: "info@pomzaexport.com",
            Password: import.meta.env.VITE_STMP_PASS,
            To: "info@pomzaexport.com",
            From: "info@pomzaexport.com",
            Subject: "Email from website",
            Body: body,
        }).then((message) => {
            console.log(message);
            if (message == `OK`) {
                swal(
                    "Success!",
                    "You Message Successfull Received!",
                    "success"
                );
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                swal(
                    "Something Wrong",
                    "Your Message is not Received",
                    "error"
                );
            }
            setToken(null);
            recaptchaRef.current.reset();
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Send();
    };

    return (
        <section className="bg-[#151a38]" id="contact">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="my-10">
                    <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200"></p>
                        <h2 className="font-heading mb-4 font-bold tracking-tight text-white dark:text-white text-3xl sm:text-5xl">
                            Bizimle İletişime Geçin
                        </h2>
                    </div>
                </div>
                <div className="flex items-stretch justify-center">
                    <div className="grid md:grid-cols-2">
                        <div className="h-full pr-6">
                            <ul className="mb-6 md:mb-0">
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-white dark:text-white">
                                            İletişim Adreslerimiz
                                        </h3>
                                        <p className="text-white dark:text-slate-400">
                                            <strong>
                                                SART MADEN İŞLETMESİ
                                            </strong>
                                            <br />
                                            Sart Mah. Pomza Sk. No: 40,
                                            Salihli/MANİSA
                                            <br />
                                            Telefon : +90 236 724 20 21
                                            <br />
                                            Fax : +90 236 724 30 51 <br />
                                            <br />
                                            <strong>
                                                EİLE POMEX YAPI KİMYASALLARI
                                            </strong>
                                            <br />
                                            Yeniköy Mah. Menderes - Orhanlı Yolu
                                            Sk. No : 179/22 Menderes/İZMİR
                                            <br />
                                            Telefon : +90 232 360 17 77
                                            <br />
                                            Fax : +90 232 360 16 16 <br />
                                            <br />
                                            <strong>
                                                MENDERES MADEN İŞLETMESİ
                                            </strong>
                                            <br />
                                            Küner Mah. 7801 Sk. No:94
                                            Menderes/İZMİR
                                            <br />
                                            Telefon : +90 232 782 14 46
                                            <br />
                                            Fax : +90 232 782 15 98 <br />
                                            <br />
                                            <strong>
                                                ETİPER PERLİT İŞLETMESİ
                                            </strong>
                                            <br />
                                            Yeniköy Mah. Menderes - Orhanlı Yolu
                                            Sk. No : 179/22 Menderes/İZMİR
                                            <br />
                                            Telefon : +90 232 787 67 24
                                            <br />
                                            Fax : +90 232 782 67 25 <br />
                                            <br />
                                            <strong>ANKARA OFİS</strong>
                                            <br />
                                            Çukurca Birlik Mah. 447 Sk. No: 3/5
                                            Çankaya/ANKARA
                                            <br />
                                            Telefon : +90 312 495 64 90
                                            <br />
                                            Fax : +90 312 495 64 93
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="card h-fit max-w-6xl p-5 md:p-12 md:pt-1"
                            id="form"
                        >
                            <div className="flex">
                                <Mail color="white" />
                                <span className="ml-3 text-white text-bold text-lg">
                                    info@pomzaexport.com
                                </span>
                            </div>
                            <h2 className="my-4 text-2xl font-bold text-white">
                                Bize Ulaşın
                            </h2>
                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label
                                                htmlFor="name"
                                                className="pb-1 text-xs uppercase tracking-wider"
                                            ></label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                autoComplete="given-name"
                                                placeholder="Ad Soyad"
                                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label
                                                htmlFor="email"
                                                className="pb-1 text-xs uppercase tracking-wider"
                                            ></label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                autoComplete="email"
                                                placeholder="Mail Adresiniz"
                                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label
                                            htmlFor="textarea"
                                            className="pb-1 text-xs uppercase tracking-wider"
                                        ></label>
                                        <textarea
                                            id="textarea"
                                            name="message"
                                            cols="30"
                                            rows="5"
                                            placeholder="Lütfen Mesajınızı Yazınız"
                                            className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        style={{
                                            background: !token ? "grey" : "",
                                            textTransform: "capitalize",
                                        }}
                                        disabled={!token}
                                        className="w-full bg-white text-[#151a38] px-6 py-3 font-xl rounded-md sm:mb-0 flex items-center justify-center"
                                    >
                                        <span className="p-0 m-0 flex items-center">
                                            Gönder
                                        </span>
                                    </button>
                                </div>
                                <div
                                    id="rcap"
                                    className="w-full my-8 flex justify-center items-center"
                                >
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey="6Lf-S8UpAAAAAL58_LEdcdltYiANv69K7ei0K9wP"
                                        onChange={onVerify}
                                        size="normal"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
