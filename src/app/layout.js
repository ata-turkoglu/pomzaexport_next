import Header from "@/components/header";
import "../globals.css";
import Footer from "@/components/footer";

export const metadata = {
    title: "Pomza Export",
    description: "Mining",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased w-full h-full overflow-auto">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
