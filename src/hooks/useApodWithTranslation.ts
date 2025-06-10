import {useEffect, useState} from "react";
import type {ApodData} from "../types/apod.ts";
import {fetchApod} from "../services/apodService.ts";
import {translateText} from "../services/translationService.ts";
import {getCachedTranslation, setCachedTranslation} from "../services/translationCache.ts";

export function useApodWithTranslation(date?: string) {
    const [data, setData] = useState<ApodData | null>(null);
    const [translation, setTranslation] = useState<{ title: string; explanation: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setTranslation(null);

        fetchApod(date)
            .then(async (d) => {
                setData(d);

                if (!d) return;

                const cached = date ? getCachedTranslation(date) : null;
                if (cached?.pt && cached.pt.title && cached.pt.explanation) {
                    setTranslation(cached.pt);
                    return;
                }

                try {
                    const [title, explanation] = await Promise.all([
                        translateText(d.title),
                        translateText(d.explanation),
                    ]);
                    setTranslation({title, explanation});

                    if (date) setCachedTranslation(date, "pt", {title, explanation});
                } catch {
                    setTranslation(null); // se falhar, exibe original
                }
            })
            .catch(() => setError("Erro ao buscar dados da APOD"))
            .finally(() => setLoading(false));
    }, [date]);

    return {data, translation, loading, error};
}