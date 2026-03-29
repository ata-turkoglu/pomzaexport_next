"use client";
import { useEffect, useState } from "react";
import ResponsiveImage from "./ResponsiveImage";

export default function ImgCarousel({ images }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const imageCount = images.length;

    useEffect(() => {
        setActiveIndex(0);
    }, [images]);

    useEffect(() => {
        if (imageCount <= 1) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % imageCount);
        }, 4500);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [imageCount]);

    if (imageCount === 0) {
        return null;
    }

    return (
        <div className="relative h-full w-full overflow-hidden">
            {images.map((img, key) => (
                <div
                    key={key}
                    className={
                        "absolute inset-0 h-full w-full transition-opacity duration-700 " +
                        (key === activeIndex
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none")
                    }
                >
                        <ResponsiveImage
                            src={img}
                            className="h-full w-full object-cover"
                            loading={key === 0 ? "eager" : "lazy"}
                            fetchPriority={key === 0 ? "high" : "auto"}
                            alt="Pomza Export"
                            style={{
                                filter: "brightness(75%)",
                            }}
                        />
                </div>
            ))}
        </div>
    );
}
