import {useApodWithTranslation} from "../hooks/useApodWithTranslation.ts";

type Props = {
    date?: string;
    language: "en" | "pt";
};

export default function ImageViewer({date, language}: Props) {
    const {data, translation, loading, error} = useApodWithTranslation(date);

    if (loading) return <div className="text-gray-200 text-xl">Carregando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!data) return null;

    const title = language === "pt" && translation?.title ? translation.title : data.title;
    const explanation = language === "pt" && translation?.explanation ? translation.explanation : data.explanation;

    return (
        <div className="flex flex-col items-center p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            {data.media_type === "image" ? (
                <img
                    src={data.hdurl || data.url}
                    alt={title}
                    className="rounded shadow-lg w-full max-h-96 object-cover mb-4"
                />
            ) : (
                <iframe
                    src={data.url}
                    title={title}
                    allowFullScreen
                    className="w-full h-96 mb-4 rounded"
                />
            )}
            <p className="text-gray-200">{explanation}</p>
            <span className="mt-2 text-gray-400">{data.date}</span>
            {language === "pt" && !translation && (
                <p className="text-yellow-400-mt-2">Falha ao traduzir. Exibindo original em inglês.</p>
            )}
        </div>
    );
}