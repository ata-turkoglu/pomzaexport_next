"use client";
import React from "react";
import ResponsiveImage from "./ResponsiveImage";
export default function Gallery({ images, name = "gallery-image" }) {
    const [active, setActive] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    React.useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    React.useEffect(() => {
        if (!open) {
            return;
        }

        const onEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", onEscape);
        return () => window.removeEventListener("keydown", onEscape);
    }, [open]);

    return (
        <div className="grid gap-2">
            <div className="h-full w-full grid grid-cols-3 gap-1 md:gap-0 md:flex md:items-center md:justify-center">
                {images.map((imgelink, index) => (
                    <div
                        key={index}
                        className="h-full max-h-40 w-full md:max-w-52 md:mx-1 cursor-pointer overflow-hidden"
                    >
                        <ResponsiveImage
                            onClick={() => {
                                setActive(imgelink);
                                handleOpen();
                            }}
                            src={imgelink}
                            className="w-full h-full object-cover"
                            alt={name}
                            mobileProfile="listing"
                            desktopProfile="listing"
                        />
                    </div>
                ))}
            </div>
            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/80 p-4 md:p-8 flex items-center justify-center"
                    onClick={handleOpen}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="relative w-full max-w-6xl overflow-hidden"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {active && (
                            <ResponsiveImage
                                className="block h-auto w-full max-w-full object-cover object-center"
                                src={active}
                                alt={name}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
