import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function About({ params: { locale } }) {
    setRequestLocale(locale);
    const t = useTranslations("About");

    return (
        <div
            className="flex flex-col justify-center items-center text-white h-fit relative overflow-hidden"
            style={{
                background:
                    "url(/assets/common/pattern.jpg), rgba(21,26,56,.95)",
                backgroundBlendMode: "multiply",
            }}
        >
            {locale == "tr" ? (
                <div className="md:w-2/3 w-full z-20 text-justify text-blue-gray-50 md:mt-32 md:mx-auto mt-24 px-5 pb-60 h-full">
                    <h2 className="mb-3 text-3xl text-center font-bold">
                        Hakkımızda
                    </h2>
                    <p className="mb-2">
                        Pomza Export A.Ş., madencilik sektöründe tamamen yerli
                        sermaye kurulmuş, köklü bir şirket olarak 50 yıldan
                        fazla süredir faaliyet göstermektedir. Sürdürülebilirlik
                        ilkesiyle hareket eden firmamız, 2007 yılında Türkiye'ye
                        daha fazla katma değer sağlamak amacıyla, 'Sıfır-Deşarj'
                        üretim modelini benimseyerek Eile Pomex Yapı
                        Kimyasalları şirketini kurmuştur. Bu sayede, kendi
                        madenlerinde üretilen Perlit, Kuvars, Korund gibi
                        agregaları yapı ürünlerinde kullanarak kaliteli,
                        sürdürülebilir ve yenilikçi çözümleri pazara sunmuştur.
                    </p>
                    <p className="mb-2">
                        Müşteri memnuniyetini en üst düzeyde tutarak, ulusal ve
                        uluslararası kalite standartlarına uygun şekilde hareket
                        etmek temel önceliğimizdir. Tüm çalışanlarımızın sürekli
                        mesleki alanda bilgilendirilmesi ve gelişimlerinin
                        desteklenmesi, iş sağlığı ve iş güvenliği bilincinin en
                        üst seviyede olması için en yüksek profesyonel
                        standartlara uygun eğitimler verilmektedir. Bu şekilde,
                        çalışanlarımızın iş güvenliği konusundaki bilincini
                        artırarak daha güvenli bir çalışma ortamı sağlamayı
                        hedefliyoruz.
                    </p>
                    <p className="mb-2">
                        Ayrıca, hataları önceden önlemek ve tekrarlanmasını
                        engellemek için doğaya ve insana saygı çerçevesinde
                        sürekli iyileştirmeler yaparak yönetim sistemimizi
                        geliştirmekteyiz.
                    </p>
                    <p className="mb-2">
                        Tüm yasa ve mevzuatlara uygun olarak faaliyet göstermek
                        ve en doğru şekilde çalışmak da işimizin ayrılmaz bir
                        parçasıdır. Müşteri memnuniyeti, sürdürülebilirlik,
                        kalite, güvenlik ve yasal uyumluluk alanlarında en üst
                        düzeyde performans sergileyerek çalışanlarımıza,
                        müşterilerimize ve topluma karşı sorumluluklarımızı
                        yerine getiriyoruz.
                    </p>

                    <h2 className="mb-3 mt-10 text-3xl font-bold text-center">
                        Misyonumuz
                    </h2>

                    <p className="mb-4">
                        Genç, dinamik mühendis kadromuzla müşteri ihtiyaç ve
                        beklentilerini en iyi şekilde anlayarak, iş etiği ve
                        ahlak kurallarına uygun, sürdürülebilir ve kaliteli
                        üretim sağlamaktır.
                    </p>

                    <h2 className="mb-3 mt-10 text-3xl font-bold text-center">
                        Vizyonumuz
                    </h2>

                    <p className="mb-4">
                        Sektörde yılların güvenini kazanmış bir firma olarak,
                        kendimizi sürekli geliştirip firmamızın ulusal ve
                        uluslararası pazardaki etkinliğini ve verimliliğini
                        artırmak; Türkiye'nin inovasyon ve çevrecilik
                        prensipleriyle hareket eden saygın bir kuruluşu
                        olmaktır.
                    </p>
                </div>
            ) : (
                <div className="md:w-2/3 w-full z-20 text-justify text-blue-gray-50 md:mt-32 md:mx-auto mt-24 px-5 pb-60 h-full">
                    <h2 className="mb-3 text-3xl text-center font-bold">
                        About
                    </h2>

                    <p className="mb-2">
                        Pomza Export is one of the leading companies shaping
                        Turkey's mining sector since 1961. Operating with the
                        principle of sustainability, our company established
                        Eile Pomex Construction Chemicals in 2007 to produce
                        value-added building products by adopting the
                        'Zero-Discharge' business model. By using aggregates
                        such as Perlite, Quartz, And Corundum produced in our
                        own mines in these construction products, we have
                        introduced quality, sustainability, and innovation to
                        the market
                    </p>

                    <p className="mb-2">
                        Ensuring customer satisfaction at the highest level and
                        acting in accordance with national and international
                        quality standards are our main priorities. All our
                        employees receive continuous training and support for
                        their development, and training is provided at the
                        highest professional standards to ensure the highest
                        level of occupational health and safety awareness. In
                        this way, we aim to increase awareness of occupational
                        safety among our employees and create a safer working
                        environment.
                    </p>

                    <p className="mb-2">
                        Additionally, we continuously improve our management
                        system within the framework of respect for nature and
                        humanity to prevent errors and avoid their repetition.
                    </p>

                    <p className="mb-2">
                        Operating in compliance with all laws and regulations is
                        an integral part of our business. By demonstrating
                        top-level performance in customer satisfaction,
                        sustainability, quality, safety, and legal compliance,
                        we fulfil our responsibilities to both our customers and
                        the society.
                    </p>

                    <h2 className="mb-3 mt-10 text-3xl font-bold text-center">
                        Mission
                    </h2>

                    <p className="mb-4">
                        To provide sustainable, value-added production in
                        accordance with business ethics by understanding market
                        needs and expectations and form long-term partnerships
                        with our national and international customers.
                    </p>

                    <h2 className="mb-3 mt-10 text-3xl font-bold text-center">
                        Vision
                    </h2>

                    <p className="mb-4">
                        As a company that has earned the trust of the industry
                        over the years, our vision is to continuously improve
                        ourselves and increase the effectiveness and efficiency
                        of our company in both national and international
                        markets, aiming to become a respected organization that
                        operates with principles of innovation and
                        environmentalism.
                    </p>
                </div>
            )}
        </div>
    );
}
