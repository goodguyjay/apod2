type Props = {
    language: "en" | "pt";
    onChange: (lang: "en" | "pt") => void;
};

export default function LangToggle({ language, onChange }: Props) {
    const handleToggle = () => {
        onChange(language === "pt" ? "en" : "pt");
    };

    return (
        <div className="d-flex align-items-center gap-2 ms-3 mb-3 justify-content-center">
            <span className="text-light small">PT</span>
            <div className="form-check form-switch m-0">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="langSwitch"
                    checked={language === "en"}
                    onChange={handleToggle}
                    style={{ cursor: "pointer" }}
                />
            </div>
            <span className="text-light small">EN</span>
        </div>
    );
}
