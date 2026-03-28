"use client";
import { Carousel } from "@material-tailwind/react";
import ResponsiveImage from "./ResponsiveImage";

export default function ImgCarousel({ images }) {
    return (
        <Carousel
            autoplay={true}
            loop={true}
            navigation={() => {
                return <span></span>;
            }}
        >
            {images.map((img, key) => {
                return (
                    <div key={key} className="relative h-full w-full">
                        <ResponsiveImage
                            src={img}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            alt="Pomza Export"
                            style={{
                                filter: "brightness(75%)",
                            }}
                        />
                    </div>
                );
            })}
        </Carousel>
    );
}
