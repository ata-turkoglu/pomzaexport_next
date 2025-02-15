module.exports = {
    slugify: (text) => {
        const turkishChars = {
            ı: "i",
            ğ: "g",
            ü: "u",
            ş: "s",
            ö: "o",
            ç: "c",
            İ: "I",
            Ğ: "G",
            Ü: "U",
            Ş: "S",
            Ö: "O",
            Ç: "C",
        };

        return text
            .toLowerCase() // Tüm karakterleri küçük harfe çevir
            .replace(/[^a-z0-9\s]/g, (char) => turkishChars[char] || "") // Türkçe karakterleri dönüştür
            .trim() // Baş ve sondaki boşlukları temizle
            .replace(/\s+/g, "-") // Boşlukları "-" ile değiştir
            .replace(/-+/g, "-") // Birden fazla "-" işaretini tek "-" yap
            .replace(/^-+|-+$/g, ""); // Baş veya sondaki "-" işaretlerini temizle
    },
};
