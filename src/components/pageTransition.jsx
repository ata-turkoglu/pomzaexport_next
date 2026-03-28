"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const TRANSITION_MS = 820;

function PageTransition({ children }) {
    const pathname = usePathname();
    const [isAnimating, setIsAnimating] = useState(false);
    const frameRef = useRef(0);
    const timerRef = useRef(0);
    const prevPathRef = useRef(pathname);

    useEffect(() => {
        return () => {
            window.cancelAnimationFrame(frameRef.current);
            window.clearTimeout(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (prevPathRef.current === pathname) {
            return;
        }

        prevPathRef.current = pathname;
        window.cancelAnimationFrame(frameRef.current);
        window.clearTimeout(timerRef.current);

        setIsAnimating(false);

        frameRef.current = window.requestAnimationFrame(() => {
            setIsAnimating(true);
            timerRef.current = window.setTimeout(() => {
                setIsAnimating(false);
            }, TRANSITION_MS);
        });
    }, [pathname]);

    return (
        <div
            className={
                isAnimating
                    ? "page-transition page-transition-active"
                    : "page-transition"
            }
        >
            {children}
        </div>
    );
}

export default PageTransition;
