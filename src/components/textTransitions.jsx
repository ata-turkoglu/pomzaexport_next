"use client";
import React, { Children, useEffect, useMemo, useState } from "react";

const ROTATE_MS = 5000;

export function TextContainer({ children }) {
    return <>{children}</>;
}

export default function TextTransitions({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const lines = useMemo(
        () =>
            Children.toArray(children)
                .map((item) => item?.props?.children)
                .map((text) =>
                    typeof text === "string"
                        ? text.trim()
                        : String(text || "").trim()
                )
                .filter(Boolean),
        [children]
    );

    useEffect(() => {
        if (lines.length <= 1) {
            return;
        }

        const interval = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % lines.length);
        }, ROTATE_MS);

        return () => {
            window.clearInterval(interval);
        };
    }, [lines.length]);

    useEffect(() => {
        setActiveIndex(0);
    }, [lines.length]);

    if (lines.length === 0) {
        return null;
    }

    return (
        <div className="relative h-full w-full overflow-hidden">
            {lines.map((line, index) => (
                <span
                    key={line + index}
                    className={
                        "absolute inset-0 m-0 flex flex-wrap items-center justify-center gap-x-2 text-center text-white font-medium t-shadow transition-all duration-500 text-3xl md:text-5xl " +
                        (index === activeIndex
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2 pointer-events-none")
                    }
                    aria-hidden={index !== activeIndex}
                >
                    {line.split(/\s+/).map((word, wordIndex) => (
                        <span key={word + wordIndex}>{word}</span>
                    ))}
                </span>
            ))}
        </div>
    );
}
