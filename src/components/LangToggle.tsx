type Props = {
    language: "en" | "pt";
    onChange: (lang: "en" | "pt") => void;
}

export default function LangToggle({language, onChange}: Props) {
    return (
        <div className="flex items-center gap-2 justify-center mb-4">
            <button
                onClick={() => onChange("pt")}
                className={`px-3 py-1 rounded ${language === "pt" ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-600"}`}
            >
                Português
            </button>
            <button
                onClick={() => onChange("en")}
                className={`px-3 py-1 rounded ${language === "en" ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-600"}`}
            >
                English
            </button>
        </div>
    );
}