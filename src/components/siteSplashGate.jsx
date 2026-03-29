"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ResponsiveImage from "./ResponsiveImage";

const HOME_MAX_MS = 1500;
const FADE_MS = 250;
const HARD_CLOSE_MS = 6200;
const LOGO_GROW_MS = 2200;
const PROGRESS_HOME_MS = 4600;
const PROGRESS_OTHER_MS = 2400;

const isLocaleHomePath = (pathname) => /^\/(tr|en)\/?$/.test(pathname || "");

export default function SiteSplashGate() {
    const pathname = usePathname();
    const isHome = useMemo(() => isLocaleHomePath(pathname), [pathname]);
    const [phase, setPhase] = useState("visible");
    const [progress, setProgress] = useState(0);
    const [logoIn, setLogoIn] = useState(false);

    useEffect(() => {
        if (phase === "hidden" || typeof window === "undefined") {
            return;
        }

        let closed = false;

        const closeSplash = () => {
            if (closed) {
                return;
            }
            closed = true;
            setProgress(1);
            setPhase("fading");
            window.setTimeout(() => setPhase("hidden"), FADE_MS);
        };

        const hardTimer = window.setTimeout(closeSplash, HARD_CLOSE_MS);

        if (!isHome) {
            const timer = window.setTimeout(closeSplash, 0);
            return () => {
                window.clearTimeout(timer);
                window.clearTimeout(hardTimer);
            };
        }

        const onMediaSignal = () => {
            closeSplash();
        };

        const maxTimer = window.setTimeout(closeSplash, HOME_MAX_MS);

        window.addEventListener("hero-media-ready", onMediaSignal);
        window.addEventListener("hero-media-error", onMediaSignal);

        if (
            window.__heroMediaStatus === "ready" ||
            window.__heroMediaStatus === "error"
        ) {
            closeSplash();
        }

        return () => {
            window.clearTimeout(maxTimer);
            window.clearTimeout(hardTimer);
            window.removeEventListener("hero-media-ready", onMediaSignal);
            window.removeEventListener("hero-media-error", onMediaSignal);
        };
    }, [isHome, phase]);

    useEffect(() => {
        if (phase !== "visible" || typeof window === "undefined") {
            return;
        }

        const cap = isHome ? 0.84 : 1;
        const duration = isHome ? PROGRESS_HOME_MS : PROGRESS_OTHER_MS;
        const start = window.performance.now();
        let frame = 0;

        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - t) * (1 - t);
            const next = cap * eased;
            setProgress((prev) => (next > prev ? next : prev));

            if (t < 1) {
                frame = window.requestAnimationFrame(tick);
            }
        };

        frame = window.requestAnimationFrame(tick);

        return () => window.cancelAnimationFrame(frame);
    }, [isHome, phase]);

    useEffect(() => {
        if (phase !== "visible" || typeof window === "undefined") {
            return;
        }

        setLogoIn(false);
        const timer = window.setTimeout(() => setLogoIn(true), 80);

        return () => window.clearTimeout(timer);
    }, [phase, pathname]);

    if (phase === "hidden") {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#151a38",
                opacity: phase === "fading" ? 0 : 1,
                transition: `opacity ${FADE_MS}ms ease`,
            }}
        >
            <div
                style={{
                    width: "min(70vw, 340px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                }}
            >
                <ResponsiveImage
                    src="/assets/logo/pomzaexport-logo-white.png"
                    alt="Pomza Export"
                    loading="eager"
                    style={{
                        width: "100%",
                        height: "auto",
                        transform: logoIn
                            ? "translateY(0) scale(1)"
                            : "translateY(14px) scale(0.9)",
                        opacity: logoIn ? 1 : 0.25,
                        transition: `transform ${LOGO_GROW_MS}ms cubic-bezier(0.16,0.8,0.28,1), opacity ${LOGO_GROW_MS}ms ease`,
                    }}
                />
                <div
                    style={{
                        width: "100%",
                        height: "2px",
                        borderRadius: "999px",
                        backgroundColor: "transparent",
                    }}
                >
                    <span
                        style={{
                            display: "block",
                            width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                            height: "100%",
                            backgroundColor: "#fff",
                            borderRadius: "999px",
                            transition: "width 240ms ease-out",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
