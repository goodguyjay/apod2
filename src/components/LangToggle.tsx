type Props = {
    language: "en" | "pt";
    onChange: (lang: "en" | "pt") => void;
}

export default function LangToggle({language, onChange}: Props) {
    return (
        <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <button
                onClick={() => onChange("pt")}
                className={`btn ${language === "pt" ? "btn-light" : "btn-outline-light"}`}
            >
                Português
            </button>
            <button
                onClick={() => onChange("en")}
                className={`btn ${language === "en" ? "btn-light" : "btn-outline-light"}`}
            >
                English
            </button>
        </div>
    );
}