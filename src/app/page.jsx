import { redirect } from "next/navigation";

export default async function Main() {
    redirect("/tr");
    return (
        <main style={{ display: "none" }}>
            <h1>Pomza Export</h1>
            <p>Pomza Export Madencilik</p>
            <p>Pomza Export Mining Company</p>
        </main>
    );
}
