export interface ApodData {
    title: string;
    explanation: string;
    date: string;
    url: string;
    hdurl?: string;
    media_type: "image" | "video";
}