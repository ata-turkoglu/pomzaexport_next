import React, { useLayoutEffect, useEffect, useState, useRef } from "react";

export function SectionPart({ children }) {
    return <section className="h-screen overflow-hidden">{children}</section>;
}

export default function SectionScroller({ children }) {
    const [mobileView, setMobileView] = useState(false);
    const [content, setContent] = useState(null);
    const scrollIndex = useRef(0);
    const scrollState = useRef();
    const touchStartY = useRef();

    const scrollToSection = (index) => {
        const el = document.getElementById("sectionScroller");
        const height = el.clientHeight;
        el.scrollTo({
            top: height * index,
            behavior: "smooth",
        });
    };

    useLayoutEffect(() => {
        const list = children.map((item, index) => {
            return {
                ...item,
                key: index,
                _owner: { ...item._owner, ref: "section-" + index },
            };
        });

        setContent(list);

        scrollState.current = true;
    }, []);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobileView(true);
        }

        const scrollEvent = (e) => {
            if (scrollState.current && Math.abs(e.deltaY) > 15) {
                if (e.deltaY > 0) {
                    children.length - 1 > scrollIndex.current &&
                        ++scrollIndex.current;
                } else {
                    !scrollIndex.current <= 0 && --scrollIndex.current;
                }
                scrollToSection(scrollIndex.current);
                scrollState.current = false;
                setTimeout(() => {
                    scrollState.current = true;
                }, 1000);
            }
        };

        window.addEventListener("wheel", scrollEvent);

        return () => {
            window.removeEventListener("whell", scrollEvent);
        };
    }, []);

    useEffect(() => {
        let touchstart, touchend;

        if (mobileView) {
            touchstart = (e) => {
                touchStartY.current = e.changedTouches[0].clientY;
            };

            touchend = (e) => {
                const deltaY =
                    e.changedTouches[0].clientY - touchStartY.current;

                if (scrollState.current && Math.abs(deltaY) > 150) {
                    if (deltaY < 0) {
                        children.length - 1 > scrollIndex.current &&
                            ++scrollIndex.current;
                    } else {
                        !scrollIndex.current <= 0 && --scrollIndex.current;
                    }
                    scrollToSection(scrollIndex.current);
                    scrollState.current = false;
                    setTimeout(() => {
                        scrollState.current = true;
                    }, 1000);
                }
            };

            window.addEventListener("touchstart", touchstart);

            window.addEventListener("touchend", touchend);
        }

        return () => {
            window.removeEventListener("touchstart", touchstart);

            window.removeEventListener("touchend", touchend);
        };
    }, [mobileView]);

    return (
        <div id="sectionScroller" className="h-screen overflow-hidden">
            {content}
        </div>
    );
}
