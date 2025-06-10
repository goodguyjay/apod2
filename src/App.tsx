import './App.css'
import ImageViewer from "./components/ImageViewer.tsx";
import {useState} from "react";
import SearchBar from "./components/SearchBar.tsx";
import LangToggle from "./components/LangToggle.tsx";
import ThreeJSViewer from "./components/ThreeJSViewer.tsx";
import {fetchApod} from "./services/apodService.ts";
import Navbar from "./components/Navbar.tsx";

function App() {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
    const [language, setLanguage] = useState<"en" | "pt">("pt");
    async function handleDownload() {
        const data = await fetchApod(selectedDate);
        if (!data || !data.url) return;

        if (data.media_type === "image") {
            const link = document.createElement("a");
            link.href = data.hdurl || data.url;
            link.download = data.title?.replace(/[^a-z0-9]/gi, "_") || "apod.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("A imagem do dia não está disponível para download.");
        }
    }

    return (
        <div className="bg-universe text-light min-vh-100 pt-5 d-flex flex-column">
            <Navbar onDownload={handleDownload} />
            <h1 className="text-center fw-bold display-4 pt-5 mb-4">Portal APOD UCB</h1>
            <div className="container-fluid flex-grow-1 d-flex flex-column align-items-center w-100">
                <SearchBar onDateChange={setSelectedDate} />
                <LangToggle language={language} onChange={setLanguage} />
                <ImageViewer date={selectedDate} language={language} />
                <ThreeJSViewer />
            </div>
        </div>
    )
}

export default App
