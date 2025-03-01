"use client";
import mineJSON from "@/data/mines.json";
import { useRouter, useParams } from "next/navigation";

export default function FacilitiesLinks() {
    const router = useRouter();
    const { locale } = useParams();
    return (
        <div className="bg-[#151a381a] w-full flex justify-center">
            <div className="max-w-[1300px] w-full h-fit flex flex-col items-center pt-12 pb-4 md:py-20 md:pl-10 md:pr-5">
                <div className="w-full h-fit flex">
                    <h2 className="text-2xl md:text-4xl mb-2 md:mb-7 w-full flex justify-center md:mr-3 pt-3 md:pt-0">
                        Hammadde Üretim Tesislerimiz
                    </h2>
                </div>
                <div className="w-full h-fit md:h-84 flex flex-col md:flex-row items-center justify-center">
                    {mineJSON.map((item, key) => (
                        <div
                            key={key}
                            onClick={() =>
                                router.push(
                                    "/" + locale + "/mine/" + item.id + "/"
                                )
                            }
                            className="relative w-full h-auto md:h-full flex md:flex-1 mb-3 md:mb-0 ml-3 md:ml-0 mr-3 md:mr-5 cursor-pointer duration-300 hover:shadow-xl shadow-black hover:-translate-y-2 overflow-hidden"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src={item.mineBgImage}
                            />
                            <h3 className="absolute w-full left-0 bottom-0 px-3 pt-3 pb-1 text-white text-2xl t-shadow font-extrabold">
                                {item.location} <br></br>
                                {item.name.tr}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col items-center">
                    <span className="w-full md:w-5/12 mt-0 p-3 md:p-0 md:mt-10 text-lg md:text-xl text-justify md:text-center md:mr-3">
                        Ürettiğimiz cevherlerden farklı sektörlerin
                        ihtiyaçlarını karşılayan yüksek kaliteli uç ürünler
                        üretiyoruz. Amacımız, kendi ürettiğimiz minerallerin
                        değerlerini arttırarak ülkemize daha fazla katma değer
                        oluşturmaktadır.
                    </span>
                    <span className="w-full md:w-5/12 mt-0 p-3 md:p-0 md:mt-10 text-lg md:text-xl text-justify md:text-center md:mr-3">
                        Türkiyenin ilk 100% yerli sermaye ile altın üreten
                        firması olmanın gururunu yaşamaktayız. Her zaman "Önce
                        insan, sonra çevre, sonra maden" ilkesi ile hareket
                        ederiz.
                    </span>
                </div>
            </div>
        </div>
    );
}
