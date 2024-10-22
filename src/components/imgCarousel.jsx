import { Carousel } from "@material-tailwind/react";

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
                        <img
                            src={img}
                            className="h-full w-full object-cover"
                            loading="lazy"
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
