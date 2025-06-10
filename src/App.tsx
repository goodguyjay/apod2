import './App.css'
import ImageViewer from "./components/ImageViewer.tsx";
import {useState} from "react";
import SearchBar from "./components/SearchBar.tsx";
import LangToggle from "./components/LangToggle.tsx";
import ThreeJSViewer from "./components/ThreeJSViewer.tsx";
import type {ApodData} from "./types/apod.ts";
import Navbar from "./components/Navbar.tsx";

function App() {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
    const [language, setLanguage] = useState<"en" | "pt">("pt");
    const [apodData, setApodData] = useState<ApodData | null>(null);

    function handleDownload() {
        if (!apodData || !apodData.url) return;

        if (apodData.media_type === "image") {
            const link = document.createElement("a");
            link.href = apodData.hdurl || apodData.url;
            link.download = apodData.title?.replace(/[^a-z0-9]/gi, "_") || "apod.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("A imagem do dia não está disponível para download.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 pt-24">
            <Navbar onDownload={handleDownload}/>
            <h1 className="text-4xl font-bold text-white text-center pt-8 mb-6">
                Portal APOD UCB
            </h1>
            <div className="flex flex-col items-center">
                <SearchBar onDateChange={setSelectedDate}/>
                <LangToggle language={language} onChange={setLanguage}/>
                <ImageViewer date={selectedDate} language={language}/>
                <ThreeJSViewer/>
            </div>
        </div>
    )
}

export default App
