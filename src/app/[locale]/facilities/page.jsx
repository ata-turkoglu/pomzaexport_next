"use client";
import Link from "next/link";
import minesJSON from "@/data/mines.json";
import { useParams } from "next/navigation";
import { slugify } from "@/utils/commonFuncs";
import ResponsiveImage from "@/components/ResponsiveImage";

function Facilities() {
    const { locale } = useParams();

    const setSlug = (id, name) => {
        return id.toString() + "-" + slugify(name);
    };

    return (
        <main className="h-full w-full flex flex-col">
            <div className="h-16 w-100 bg-[#151a38]"></div>
            <section className="px-5 py-8 text-center">
                <h1 className="text-3xl font-bold">{locale === "tr" ? "Maden İşletmelerimiz" : "Our Mining Facilities"}</h1>
                <p className="mt-3">{locale === "tr" ? "Manisa ve İzmir’deki Sart, Yeniköy ve Küner işletmelerimizin faaliyetlerini ve ürünlerini keşfedin." : "Discover the activities and products of our Sart, Yeniköy and Küner facilities in Manisa and İzmir."}</p>
            </section>
            <div className="flex flex-col p-2">
                {minesJSON.map((item, index) => (
                    <Link
                        key={item.id}
                        className="w-full aspect-[16/9] md:aspect-[21/9] flex relative mb-2 overflow-hidden"
                        href={`/${locale}/mine/${setSlug(item.id, item.name[locale])}/`}
                    >
                        <ResponsiveImage
                            src={item.images[0]}
                            className="w-full h-full object-cover brightness-75"
                            alt={item.name[locale]}
                        />
                        <span
                            className="flex items-center justify-center text-white z-10 absolute left-0 top-0 right-0 bottom-0 m-auto text-center t-shadow"
                            style={{
                                display: "flex",
                                fontSize: "1.6rem",
                            }}
                        >
                            {item.location} <br></br>
                            {item.name[locale]}
                        </span>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default Facilities;
