type TranslationData = {
    pt?: { title: string; explanation: string };
    en?: { title: string; explanation: string };
};

export function getCachedTranslation(date: string): TranslationData | null {
    const raw = localStorage.getItem("apod-translation-" + date);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function setCachedTranslation(date: string, lang: "pt" | "en", data: { title: string; explanation: string }) {
    const cache = getCachedTranslation(date) || {};
    cache[lang] = data;
    localStorage.setItem("apod-translation-" + date, JSON.stringify(cache));
}