import React from "react";

export default function Sustainability() {
    return (
        <div
            className="bg-[#151a3812] w-full flex justify-center"
            style={{
                backgroundImage: "url(/assets/common/pattern.jpg)",
            }}
        >
            <div className="max-w-[1300px] w-full h-fit flex flex-col-reverse items-center md:flex-row pt-5 pb-2 md:pt-10 md:pb-10 md:pl-10 md:pr-5">
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center mr-0 md:mr-16">
                    <h2 className="text-2xl md:text-3xl mb-2 md:mb-5 md:ml-0 w-full z-30 bg-transparent text-center">
                        Yenilenebilir enerji yatırımlarımıza <br></br> devam
                        ediyoruz.
                        {/* <br></br>
                        Sürdürülebilir bir yaşam için gerekli hammaddeleri
                        üretiyoruz. */}
                    </h2>
                    {/* <ul className="p-3 md:p-0">
                        <li className="text-lg md:text-xl">
                            Solar panel sayımızı her geçen gün artıyor,
                        </li>
                        <li className="text-lg md:text-xl">
                            Kamyonlarda elektrikli araç dönüşümünü başladı,
                        </li>
                        <li className="text-lg md:text-xl">
                            Çevre danışmanlarımız ile toz ve emisyonlarımızı
                            kontrol altında,
                        </li>
                        <li className="text-lg md:text-xl">
                            Su tüketimimizi yağmur sularını yönlendirip
                            depolayarak minimuma indirdik.
                        </li>
                    </ul> */}
                    <span className="p-3 md:p-0 text-justify md:text-center text-lg md:text-xl">
                        Güneş paneli sayımız her geçen gün artıyor. Kamyonlarda
                        elektrikli araç dönüşümünü başlattık. Çevre
                        danışmanlarımız ile toz ve emisyonlarımızı kontrol
                        altında tutuyoruz. Her geçen gün karbon ayak izimizi
                        düşürmek için adımlar atıyoruz. Kendi su arıtma
                        tesisimizi kurmakla kalmadık, yağmur sularını depolayıp
                        kullanarak su tüketimimizi minimuma indirdik.
                    </span>
                </div>
                <div className="w-full md:w-1/2 h-84 grid grid-cols-2 grid-rows-2 gap-2 p-3 mb-5 md:p-0 md:mb-0">
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-auto h-full object-cover"
                            src="/assets/common/sustainability.jpg"
                        />
                    </div>
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/common/sustainability1.jpg"
                        />
                    </div>
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/common/sany.jpg"
                        />
                    </div>
                    <div className="flex flex-1 h-full">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/common/water.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
