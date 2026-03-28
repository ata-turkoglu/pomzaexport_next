"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const FacilitiesLinks = dynamic(() => import("./facilitiesLinks"), {
    ssr: false,
    loading: () => <div className="w-full min-h-20" />,
});

const Sustainability = dynamic(() => import("./sustainability"), {
    ssr: false,
    loading: () => <div className="w-full min-h-20" />,
});

const Brands = dynamic(() => import("./brands"), {
    ssr: false,
    loading: () => <div className="w-full min-h-20" />,
});

export default function HomeBelowFoldLazy() {
    const [shouldLoad, setShouldLoad] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        if (!sentinelRef.current || shouldLoad) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: "600px 0px",
                threshold: 0.01,
            }
        );

        observer.observe(sentinelRef.current);

        return () => observer.disconnect();
    }, [shouldLoad]);

    return (
        <>
            <div ref={sentinelRef} className="w-full h-px" />
            {shouldLoad ? (
                <>
                    <FacilitiesLinks />
                    <Sustainability />
                    <Brands />
                </>
            ) : null}
        </>
    );
}
