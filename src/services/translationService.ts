export async function translateText(text: string): Promise<string> {
    const resp = await fetch("https://goodguyjay.pythonanywhere.com/translate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text}),
    });
    if (!resp.ok) throw new Error("Erro ao traduzir o texto");
    const data = await resp.json();
    return data.translated_text;
}