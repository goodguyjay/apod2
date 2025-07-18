﻿import {useState} from "react";

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
        <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center gap-2 mb-4 w-25">
            <input
                type="date"
                value={date}
                max={new Date().toISOString().split("T")[0]}
                onChange={e => setDate(e.target.value)}
                className="form-control bg-dark text-light border-secondary"
            />
            <button type="submit" className="btn btn-outline-light" disabled={!date}>
                Buscar
            </button>
        </form>
    )
}   