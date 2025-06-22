import './App.css'
import ImageViewer from "./components/ImageViewer.tsx";
import { useState } from "react";
import SearchBar from "./components/SearchBar.tsx";
import LangToggle from "./components/LangToggle.tsx";
import SolarSystemViewer from "./components/SolarSystemViewer.tsx";
import { fetchApod } from "./services/apodService.ts";
import Navbar from "./components/Navbar.tsx";

function App() {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
    const [language, setLanguage] = useState<"en" | "pt">("pt");
    async function handleDownload() {
        const data = await fetchApod(selectedDate);
        if (!data || !data.url) return;

        if (data.media_type === "image") {
            const imageUrl = data.hdurl || data.url;
            window.open(imageUrl, "_blank");
        } else {
            alert("A imagem do dia não está disponível para download.");
        }
    }

    return (
        <div className="bg-dark text-light min-vh-100 min-vw-100 pt-5 d-flex flex-column">
            <Navbar onDownload={handleDownload} />

            <main className="flex-grow-1">
                <div className="container-fluid px-5">
                    <h1 className="fw-bold display-5 mb-3 mt-5 text-center">Portal APOD UCB</h1>

                    {/* Seção da imagem do dia */}
                    <section className="my-5 p-5 rounded shadow-sm">
                        <div className="mb-4 d-flex flex-wrap justify-content-center align-items-center gap-3">
                            <SearchBar onDateChange={setSelectedDate} />
                            <LangToggle language={language} onChange={setLanguage} />
                        </div>

                        <ImageViewer date={selectedDate} language={language} />
                    </section>

                    {/* Seção da simulação 3D */}
                    <section className="my-5 py-4 rounded shadow-sm">
                        <div className="row align-items-center text-light px-2 px-md-5">
                            <div className="col-md-6 text-center">
                                <h4 className="mb-3">Quer explorar o sistema solar em mais detalhes?</h4>
                                <p>
                                    Acesse uma simulação completa com zoom, órbitas reais, visualização de planetas em tempo real e navegação interativa.
                                </p>
                                <a
                                    href="https://www.solarsystemscope.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-info mb-3"
                                >
                                    Acessar Simulação Completa
                                </a>
                            </div>
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div className="border border-primary bg-black rounded overflow-hidden">
                                    <SolarSystemViewer />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer com seção de contato */}
            <footer id='contact' className="bg-black bg-opacity-75 py-4 border-top border-secondary mt-auto">
                <div className="container">
                    <h5 className="text-center mb-4">Entre em contato com os desenvolvedores</h5>
                    <div className="row justify-content-center g-3">
                        {[
                            { name: "DKRANGEL", user: "DKRANGEL" },
                            { name: "goodguyjay", user: "goodguyjay" }
                        ].map(({ name, user }) => (
                            <div key={user} className="col-md-6 col-lg-5">
                                <div className="card bg-dark text-light border border-secondary shadow-sm p-2">
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={`https://github.com/${user}.png`}
                                            alt={`${name} GitHub avatar`}
                                            className="rounded-circle"
                                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                        />
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-1">{name}</h6>
                                            <a
                                                href={`https://github.com/${user}`}
                                                className="btn btn-outline-light btn-sm"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Visitar GitHub
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App
