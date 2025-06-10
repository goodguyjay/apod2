import {useApodWithTranslation} from "../hooks/useApodWithTranslation.ts";

type Props = {
    date?: string;
    language: "en" | "pt";
};

export default function ImageViewer({date, language}: Props) {
    const {data, translation, loading, error} = useApodWithTranslation(date);

    if (loading)
        return (
            <div className="my-5 d-flex justify-content-center">
                <span className="star-loader" />
            </div>
        );
    if (error) return <div className="text-danger">{error}</div>;
    if (!data) return null;

    const title = language === "pt" && translation?.title ? translation.title : data.title;
    const explanation = language === "pt" && translation?.explanation ? translation.explanation : data.explanation;

    return (
        <div className="d-flex flex-column align-items-center p-4 mx-auto" style={{maxWidth: '40rem'}}>
            <h2 className="h4 text-white fw-bold mb-2">{title}</h2>
            {data.media_type === "image" ? (
                <img
                    src={data.hdurl || data.url}
                    alt={title}
                    className="img-fluid rounded shadow mb-4"
                    style={{maxHeight: '24rem', objectFit: 'cover'}}
                />
            ) : (
                <iframe
                    src={data.url}
                    title={title}
                    allowFullScreen
                    className="w-100 mb-4 rounded"
                    />
            )}
            <p className="text-light">{explanation}</p>
            <span className="mt-2 text-secondary">{data.date}</span>
            {language === "pt" && !translation && (
                <p className="text-warning mt-2">Falha ao traduzir. Exibindo original em inglês.</p>
            )}
        </div>
    );
}