export async function fetchApod(date?: string) {
    const apiKey = "kk8XIrZkoapbPOnaIFiZTMbKW0Fo6OKw2wTbSJbo";
    const url = date
        ? `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`
        : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Erro ao buscar dados da APOD");
    return resp.json();
}