"use client";
import React from "react";
import { Dialog } from "@material-tailwind/react";
export default function Gallery({ images }) {
    const [active, setActive] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <div className="grid gap-2">
            <div className="h-full w-full grid grid-cols-3 gap-1 md:gap-0 md:flex md:items-center md:justify-center">
                {images.map((imgelink, index) => (
                    <div
                        key={index}
                        className="h-full max-h-40 w-full md:max-w-52 md:mx-1 cursor-pointer overflow-hidden"
                    >
                        <img
                            onClick={() => [setActive(imgelink), handleOpen()]}
                            src={imgelink}
                            className="w-full h-full object-cover"
                            alt="gallery-image"
                        />
                    </div>
                ))}
            </div>
            <Dialog open={open} handler={handleOpen} size="xl">
                <div>
                    {active && (
                        <img
                            className="h-auto w-full max-w-full object-cover object-center"
                            src={active}
                            alt=""
                        />
                    )}
                </div>
            </Dialog>
        </div>
    );
}
