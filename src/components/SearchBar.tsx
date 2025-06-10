import {useState} from "react";

type Props = {
    onDateChange: (date: string) => void;
};

export default function SearchBar({onDateChange}: Props) {
    const [date, setDate] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (date) onDateChange(date);
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4 justify-center">
            <input
                type="date"
                value={date}
                max={new Date().toISOString().split("T")[0]} // impede datas futuras
                onChange={e => setDate(e.target.value)}
                className="p-2 rounded border text-black"
            />
            <button
                type="submit"
                className="px-4 py-2 rounded bg-indigo-700 text-white font-bold hover:bg-indigo-800"
                disabled={!date}
            >
                Buscar
            </button>
        </form>
    )
}