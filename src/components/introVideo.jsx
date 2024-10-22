import React from "react";
import TextTransitions, { TextContainer } from "./textTransitions";
//import "@/components/css/introVideo.css";

export default function IntroVideo() {
    return (
        <div className="relative">
            <div className="h-full w-full overflow-hidden hidden md:block">
                <video
                    autoPlay={true}
                    muted
                    style={{
                        filter: "brightness(70%)",
                        zIndex: 0,
                    }}
                    loop={true}
                >
                    <source src="/assets/video/pmzaltin.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="h-screen w-full md:hidden">
                <img
                    className="w-full h-full object-cover slide"
                    src="/assets/common/view.jpg"
                    style={{
                        filter: "brightness(70%)",
                        objectPosition: "40%",
                    }}
                />
            </div>
            <div className="absolute z-10 bottom-1/4 inset-x-0 h-fit w-full px-4">
                <TextTransitions>
                    <TextContainer>
                        Lidyalıların bıraktığı yerden devam ediyoruz.
                    </TextContainer>
                    <TextContainer>
                        Türkiyede altın üreten ilk yerli firmayız.
                    </TextContainer>
                    <TextContainer>Sıfır atık ile çalışıyoruz.</TextContainer>
                    <TextContainer>
                        Türkiyenin ilk ve tek Rutil üreticisiyiz.
                    </TextContainer>
                    <TextContainer>
                        Türk maden sektöründe çevreci çalışmalarda bir lideriz.
                    </TextContainer>
                    <TextContainer>
                        Ülkenin ilk ve tek Garnet üreticisiyiz.
                    </TextContainer>
                </TextTransitions>
            </div>
        </div>
    );
}
