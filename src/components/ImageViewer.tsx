import { useApodWithTranslation } from "../hooks/useApodWithTranslation.ts";

type Props = {
    date?: string;
    language: "en" | "pt";
};

export default function ImageViewer({ date, language }: Props) {
    const { data, translation, loading, error } = useApodWithTranslation(date);

    if (loading)
    return (
        <div className="my-5 d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
            <div className="glow-ring-loader" />
        </div>
    );
    if (error) return <div className="text-danger">{error}</div>;
    if (!data) return null;

    const title = language === "pt" && translation?.title ? translation.title : data.title;
    const explanation = language === "pt" && translation?.explanation ? translation.explanation : data.explanation;

    return (
        <div className="container-fluid px-3">
            <div className="row align-items-center g-4">
                <div className="col-md-6 text-center">
                    {data.media_type === "image" ? (
                        <img
                            src={data.hdurl || data.url}
                            alt={title}
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: '30rem', objectFit: 'cover' }}
                        />
                    ) : (
                        <iframe
                            src={data.url}
                            title={title}
                            allowFullScreen
                            className="w-100 rounded"
                            style={{ height: "20rem" }}
                        />
                    )}
                    <div className="mt-3 d-flex justify-content-center">
                        <span className="badge bg-secondary mt-2">
                            {new Date(data.date + "T00:00:00").toLocaleDateString("pt-BR")}
                        </span>
                    </div>
                </div>

                <div className="col-md-6">
                    <h2 className="h5 fw-bold text-white mb-3 text-center text-md-start">{title}</h2>
                    <p className="text-light text-justify">{explanation}</p>
                    {language === "pt" && !translation && (
                        <p className="text-warning mt-2 text-center text-md-start">
                            Falha ao traduzir. Exibindo original em inglês.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
