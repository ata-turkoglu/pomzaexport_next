import Link from "next/link";
import products from "@/data/products.json";
import { slugify } from "@/utils/commonFuncs";

// Answers summarize existing product information; no commercial claims or offers.
const questions = {
    0: {
        tr: [
            ["Altın hangi alanlarda kullanılır?", "Altın; mücevherat, elektronik, uzay ve havacılık gibi alanlarda kullanılan bir metaldir."],
            ["Pomza Export altını nerede üretir?", "Altın üretimi, Manisa’nın Salihli ilçesindeki Sart bölgesinde bulunan ruhsatlı maden sahalarında gerçekleştirilir."],
            ["Altın üretiminde hangi yöntem kullanılır?", "Nabit altın, yoğunluk farklarından yararlanan gravimetrik zenginleştirme yöntemiyle elde edilir."],
        ],
        en: [
            ["What is gold used for?", "Gold is a metal used in jewelry, electronics, aerospace and aviation applications."],
            ["Where does Pomza Export produce gold?", "Gold is produced at licensed mining sites in the Sart region of Salihli, Manisa, Türkiye."],
            ["Which method is used to recover gold?", "Native gold is recovered through gravity concentration, which separates materials using differences in density."],
        ],
    },
    1: {
        tr: [
            ["Kuvars nedir?", "Kuvars, kimyasal formülü SiO₂ olan ve endüstriyel uygulamalarda hammadde olarak kullanılan bir mineraldir."],
            ["Kuvars nerelerde kullanılır?", "Kuvars; cam, seramik, elektronik, inşaat malzemeleri ve dekoratif yüzeylerin üretiminde kullanılır."],
            ["Pomza Export kuvarsı nerede işler?", "Salihli Kaletepe’deki ruhsatlı ocaktan çıkarılan kuvars, Sardes Kuvars tesislerinde işlenir. Granül ve mikronize ürünler hazırlanır."],
        ],
        en: [
            ["What is quartz?", "Quartz is a mineral with the chemical formula SiO₂, used as a raw material in industrial applications."],
            ["What is quartz used for?", "Quartz is used in glass, ceramics, electronics, construction materials and decorative surfaces."],
            ["Where does Pomza Export process quartz?", "Quartz from the licensed quarry in Kaletepe, Salihli, is processed at the Sardes Quartz facilities into granular and micronized products."],
        ],
    },
    2: {
        tr: [
            ["Rutil nedir?", "Rutil, kimyasal formülü TiO₂ olan bir titanyum dioksit mineralidir."],
            ["Rutil hangi alanlarda kullanılır?", "Rutil; titanyum metal üretimi, pigment üretimi, kaynak elektrotları, seramik ve cam uygulamalarında kullanılır."],
            ["Rutil hangi ürün biçimlerinde sunulur?", "Pomza Export rutili granül ve mikronize biçimlerde, kraft torba veya big bag ambalajlarda sunar."],
        ],
        en: [
            ["What is rutile?", "Rutile is a titanium dioxide mineral with the chemical formula TiO₂."],
            ["What is rutile used for?", "Rutile is used in titanium metal production, pigments, welding electrodes, ceramics and glass applications."],
            ["In which forms is rutile supplied?", "Pomza Export supplies granular and micronized rutile in kraft bags or big bags."],
        ],
    },
    3: {
        tr: [
            ["Agrega nedir?", "Agrega; kırılmış taş, kum ve çakıl gibi farklı boyutlardaki taneli malzemelerin genel adıdır."],
            ["Agrega nerelerde kullanılır?", "Agrega; beton, asfalt, harç, yol yapımı ve peyzaj uygulamalarında kullanılır."],
            ["Agrega tane boyutu neden önemlidir?", "Tane boyutu ve malzeme özellikleri, beton ve asfaltın dayanıklılığını etkiler. Agrega seçimi uygulamanın ihtiyaçlarına göre yapılır."],
        ],
        en: [
            ["What are aggregates?", "Aggregates are granular materials such as crushed stone, sand and gravel, available in different particle sizes."],
            ["What are aggregates used for?", "Aggregates are used in concrete, asphalt, mortar, road construction and landscaping."],
            ["Why does aggregate particle size matter?", "Particle size and material properties affect the durability of concrete and asphalt. Aggregates are selected according to the needs of the application."],
        ],
    },
    4: {
        tr: [
            ["Garnet su jeti kesiminde ne işe yarar?", "Garnet, su jeti kesim makinelerinde aşındırıcı olarak kullanılır. Sertliği ve aşındırma özelliğiyle malzemenin işlenmesine, hassas ve düzgün kesim yüzeyleri elde edilmesine katkı sağlar."],
            ["Garnet ile hangi malzemelerin su jeti kesimi yapılır?", "Garnet, metal, taş ve cam gibi malzemelerin işlendiği aşındırıcılı su jeti uygulamalarında kullanılır."],
            ["Pomza Export hangi garnet tane boyutlarını sunar?", "Garnet ürün grubunda 80, 120, 180 ve 200 mesh seçenekleri bulunur. Su jeti kesimi için ihtiyaç duyduğunuz tane boyutunu ve ürün özelliklerini bizimle görüşebilirsiniz."],
            ["Garnet kumlamada ne işe yarar?", "Kumlama işlemlerinde yüzeylerdeki pas, boya ve kirlerin giderilmesi için aşındırıcı olarak kullanılır."],
            ["Garnet filtrasyonda kullanılır mı?", "Garnet, su arıtma sistemlerinde filtre malzemesi olarak kullanılır. Kimyasal dayanıklılığı ve düşük çözünürlüğü bu kullanımda öne çıkar."],
        ],
        en: [
            ["What does garnet do in waterjet cutting?", "Garnet is used as an abrasive in waterjet cutting machines. Its hardness and abrasive properties help remove material and contribute to precise cuts and smooth cut surfaces."],
            ["Which materials can be processed with garnet in waterjet cutting?", "Garnet is used in abrasive waterjet applications to process materials such as metal, stone and glass."],
            ["Which garnet particle sizes does Pomza Export offer?", "The garnet product range includes 80, 120, 180 and 200 mesh options. Contact us to discuss the particle size and product properties you need for waterjet cutting."],
            ["What does garnet do in blasting?", "Garnet acts as an abrasive to remove rust, paint and contaminants from surfaces."],
            ["Is garnet used in filtration?", "Garnet is used as a filter medium in water treatment systems, where its chemical resistance and low solubility are useful properties."],
        ],
    },
    5: {
        tr: [
            ["Silis kumu hangi alanlarda kullanılır?", "Silis kumu; döküm kalıplarında, beton ve harç karışımlarında, epoksi zemin kaplamalarında, seramik ve peyzaj uygulamalarında kullanılır."],
            ["Pomza Export silis kumunu nereden çıkarır?", "Silis kumu, Salihli’nin Kaletepe mevkiindeki ruhsatlı ocaktan çıkarılır."],
            ["Silis kumu nasıl işlenir?", "Yıkama tesislerinde kil ve topraktan arındırılan silis kumu kurutulur ve müşteri taleplerine uygun tane boyutlarına ayrılır."],
        ],
        en: [
            ["What is silica sand used for?", "Silica sand is used in foundry molds, concrete and mortar mixtures, epoxy flooring, ceramics and landscaping."],
            ["Where does Pomza Export extract silica sand?", "Silica sand is extracted from the licensed quarry in the Kaletepe region of Salihli."],
            ["How is silica sand processed?", "Silica sand is washed to remove clay and soil, dried, and graded into particle sizes according to customer requirements."],
        ],
    },
    6: {
        tr: [
            ["Hematit nedir?", "Hematit, demir oksit içeriği ve yüksek yoğunluğuyla öne çıkan, sanayide hammadde olarak kullanılan bir mineraldir."],
            ["Hematit hangi alanlarda kullanılır?", "Hematit; demir-çelik, ağır beton, pigment, dekoratif ürün ve filtrasyon uygulamalarında kullanılır."],
            ["Hematit pigment üretiminde neden kullanılır?", "Hematitin doğal kırmızı tonu, boya ve seramik gibi uygulamalarda renklendirici olarak değerlendirilir."],
        ],
        en: [
            ["What is hematite?", "Hematite is a mineral used as an industrial raw material, known for its iron oxide content and high density."],
            ["What is hematite used for?", "Hematite is used in iron and steel production, heavy concrete, pigments, decorative products and filtration."],
            ["Why is hematite used in pigments?", "Hematite’s natural red color is used in applications such as paints and ceramics."],
        ],
    },
    7: {
        tr: [
            ["Perlit hangi alanlarda kullanılır?", "Perlit; tarım ve bahçecilik, inşaat, filtrasyon ve döküm gibi alanlarda kullanılır. Kullanım amacı, işleme biçimi ve ürün özelliklerine göre değişir."],
            ["Tarımda perlit ne işe yarar?", "Tarım perliti yetiştirme ortamının havalanmasına ve su tutmasına yardımcı olur. Toprak düzenleyici olarak tarım ve bahçecilik uygulamalarında kullanılır."],
            ["Pomza Export’un perlit işletmesi nerededir?", "Yeniköy Perlit Maden İşletmesi İzmir’in Menderes ilçesindedir. Perlit ürünleri ETİPER markasıyla tanıtılmaktadır."],
        ],
        en: [
            ["What is perlite used for?", "Perlite is used in agriculture, horticulture, construction, filtration and foundry applications. Its use depends on processing and product properties."],
            ["What does perlite do in horticulture?", "Horticultural perlite helps growing media retain water and supports aeration. It is used as a soil conditioner in agriculture and gardening."],
            ["Where is Pomza Export’s perlite facility?", "The Yeniköy perlite facility is in Menderes, İzmir, Türkiye. Its perlite products are presented under the ETİPER brand."],
        ],
    },
    8: {
        tr: [
            ["Pomza nedir?", "Pomza, volkanik kökenli, gözenekli ve hafif doğal bir taştır. Yapısı nedeniyle inşaat, tarım ve çeşitli endüstriyel uygulamalarda kullanılır."],
            ["Pomza nerelerde kullanılır?", "Pomza; hafif beton ve yalıtım malzemelerinde, tarımda toprak düzenleyici olarak, filtrasyon ve aşındırıcı uygulamalarda kullanılır. Peyzaj düzenlemelerinde de yer alır."],
            ["Pomza Export’un pomza üretim sahası nerededir?", "Pomza Export, İzmir’in Menderes ilçesindeki Küner sahasında pumicit üretimi gerçekleştirmektedir."],
        ],
        en: [
            ["What is pumice?", "Pumice is a porous, lightweight natural volcanic rock. Its structure makes it useful in construction, agriculture and industrial applications."],
            ["What is pumice used for?", "Pumice is used in lightweight concrete and insulation materials, as a soil conditioner, and in filtration and abrasive applications. It is also used in landscaping."],
            ["Where is Pomza Export’s pumice production site?", "Pomza Export produces pumicite at the Küner site in Menderes, İzmir, Türkiye."],
        ],
    },
    9: {
        tr: [
            ["Korund (zımpara taşı) nedir?", "Bu ürün grubundaki doğal zımpara taşı, çoğunlukla korindon ve demir oksit minerallerinden oluşan bir mineral karışımıdır."],
            ["Korund nerelerde kullanılır?", "Korund; zımpara, taşlama ve kesme disklerinde, ısıya dayanıklı seramiklerde ve metalurji uygulamalarında kullanılır."],
            ["Korund yüzey işlemlerinde ne işe yarar?", "Aşındırıcı özelliği sayesinde yüzeylerin taşlanması ve işlenmesinde kullanılır."],
        ],
        en: [
            ["What is emery?", "Emery is a natural mineral mixture composed mainly of corundum and iron oxide minerals."],
            ["What is emery used for?", "Emery is used in sandpaper, grinding and cutting discs, heat-resistant ceramics and metallurgical applications."],
            ["What does emery do in surface treatment?", "Its abrasive properties make it useful for grinding and working surfaces."],
        ],
    },
    10: {
        tr: [
            ["Hazır beton nedir?", "Hazır beton; çimento, agrega, su ve gerektiğinde katkı maddelerinin belirlenmiş oranlarda karıştırılmasıyla üretilen bir yapı malzemesidir."],
            ["Hazır beton hangi projelerde kullanılır?", "Hazır beton; konut, endüstriyel yapı, altyapı ve çevre düzenleme projelerinde kullanılır."],
            ["Hazır beton üretiminde kalite nasıl kontrol edilir?", "Tesiste üretilen beton kalite kontrol süreçlerinden geçirilir ve projenin ihtiyaçlarına uygunluğu açısından test edilir."],
        ],
        en: [
            ["What is ready-mix concrete?", "Ready-mix concrete is a building material made by mixing cement, aggregates, water and, when needed, additives in predetermined proportions."],
            ["Which projects use ready-mix concrete?", "Ready-mix concrete is used in residential construction, industrial buildings, infrastructure and landscaping projects."],
            ["How is quality checked during concrete production?", "Concrete produced at the facility undergoes quality control and is tested for suitability for the project’s requirements."],
        ],
    },
    11: {
        tr: [
            ["Bims blok hangi ürün grubunda yer alır?", "Bims blok, Pomza Export’un yapı malzemeleri ürün grupları arasında yer alır."],
            ["Pomexblok ürünleri hakkında ayrıntılı bilgiye nereden ulaşabilirim?", "Pomexblok ürünlerine ilişkin ayrıntılı bilgiler EILE POMEX marka sitesinde sunulmaktadır. Bu sayfadaki marka bağlantısından ürün bilgilerine ulaşabilirsiniz."],
        ],
        en: [
            ["Which product group includes bims block?", "Bims block belongs to Pomza Export’s building materials product range."],
            ["Where can I find detailed information about Pomexblok products?", "Detailed information about Pomexblok products is available on the EILE POMEX brand website, accessible through the brand link on this page."],
        ],
    },
    12: {
        tr: [
            ["Yapı elemanları ve yapı kimyasalları hangi markayla sunulur?", "Pomza Export’un yapı elemanları ve yapı kimyasalları grubu EILE POMEX markasıyla tanıtılmaktadır."],
            ["Ürün gruplarına ve uygulama bilgilerine nereden ulaşabilirim?", "Ürün grupları ve uygulama bilgileri EILE POMEX marka sitesinde yer alır. Bu sayfadaki marka bağlantısını kullanabilirsiniz."],
        ],
        en: [
            ["Which brand represents the building materials and construction chemicals range?", "Pomza Export presents its building materials and construction chemicals under the EILE POMEX brand."],
            ["Where can I find product groups and application information?", "Product groups and application information are available on the EILE POMEX brand website. You can use the brand link on this page to visit it."],
        ],
    },
};

const relatedProductIds = { 0: 1, 1: 5, 2: 4, 3: 10, 4: 9, 5: 1, 6: 10, 7: 8, 8: 7, 9: 4, 10: 3, 11: 12, 12: 11 };

export default function MineralQuestions({ id, locale }) {
    const entries = questions[id]?.[locale];
    if (!entries) return null;
    const relatedProduct = products.find((product) => product.id === relatedProductIds[id]);
    return <section className="pt-8">
        <h2>{locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}</h2>
        {entries.map(([question, answer]) => <div className="mt-5" key={question}>
            <h3 className="text-lg font-semibold">{question}</h3>
            <p className="mt-2 text-neutral-600">{answer}</p>
        </div>)}
        {relatedProduct && <p className="mt-6"><Link className="underline" href={`/${locale}/product/${relatedProduct.id}-${slugify(relatedProduct.name[locale])}/`}>
            {locale === "tr" ? `${relatedProduct.name[locale]} hakkında da bilgi edinin` : `Learn about ${relatedProduct.name[locale].toLowerCase()}`}
        </Link></p>}
    </section>;
}
