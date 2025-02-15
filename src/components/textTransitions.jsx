"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";

//import "./css/textTransition.css";

export function TextContainer({ children }) {
    return children;
}

export default function TextTransitions({ children }) {
    const [content, setContent] = useState(null);

    const setWords = (item) => {
        return item.props.children.split(" ").map((el, idx) => {
            return (
                <span key={idx} className="tt mr-2 text-white text-5xl">
                    {el}
                </span>
            );
        });
    };

    useEffect(() => {
        let counter = 1;

        const showIntrvl = setInterval(() => {
            console.log("counter", counter);
            if (counter != 0) {
                document.getElementById("text" + (counter - 1)).style.display =
                    "none";
            } else {
                const prevEl = document.getElementById(
                    "text" + (children.length - 1)
                );
                if (prevEl.style.display == "flex") {
                    prevEl.style.display = "none";
                }
            }

            document.getElementById("text" + counter).style.display = "flex";

            if (counter < children.length - 1) {
                counter++;
            } else {
                counter = 0;
            }
        }, 5000);

        return () => {
            clearInterval(showIntrvl);
        };
    }, [content]);

    useLayoutEffect(() => {
        const list = children.map((item, index) => {
            return (
                <h1
                    id={"text" + index}
                    key={index}
                    className={
                        index != 0 ? "tth1 hidden t-shadow" : "tth1 t-shadow"
                    }
                    style={index != 0 ? { display: "none" } : {}}
                >
                    {setWords(item)}
                </h1>
            );
        });
        setContent(list);
    }, []);

    return <div className="h-100 w-full flex justify-center">{content}</div>;
}
