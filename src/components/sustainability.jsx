import { useTranslations } from "next-intl";
import React from "react";

export default function Sustainability() {
    const t = useTranslations("Sustainability");
    return (
        <div
            className="bg-[#151a3812] w-full flex justify-center"
            style={{
                backgroundImage: "url(/assets/common/pattern.jpg)",
            }}
        >
            <div className="max-w-[1300px] w-full h-fit flex flex-col-reverse items-center md:flex-row pt-5 pb-2 md:pt-10 md:pb-10 md:pl-10 md:pr-5">
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center mr-0 md:mr-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-5 md:ml-0 w-full z-30 bg-transparent text-center">
                        {t("head")}
                    </h2>
                    <span className="p-3 md:p-0 text-justify md:text-center text-lg md:text-xl">
                        {t("content")}
                    </span>
                </div>
                <div className="w-full md:w-1/2 h-84 grid grid-cols-2 grid-rows-2 gap-2 p-3 mb-5 md:p-0 md:mb-0">
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-auto h-full object-cover"
                            src="/assets/common/sustainability.jpg"
                            alt="pomza export"
                        />
                    </div>
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/common/sustainability1.jpg"
                            alt="pomza export"
                        />
                    </div>
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/common/sany.jpg"
                            alt="pomza export"
                        />
                    </div>
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/common/water.jpg"
                            alt="pomza export"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
