import {useEffect, useState} from "react";
import {fetchApod} from "../services/apodService.ts";
import type {ApodData} from "../types/apod.ts";

interface UseApodDataResult {
    data: ApodData | null;
    loading: boolean;
    error: string | null;
}

export function useApodData(date?: string): UseApodDataResult {
    const [data, setData] = useState<ApodData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchApod(date)
            .then(setData)
            .catch(() => setError("Erro ao buscar dados da APOD"))
            .finally(() => setLoading(false));
    }, [date]);

    return {data, loading, error};
}