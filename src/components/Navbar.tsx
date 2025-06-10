type Props = {
    onDownload: () => void;
}

export default function Navbar({ onDownload }: Props) {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-slate-950/80 backdrop-blur border-b border-slate-800 shadow-md">
            <div className="flex flex-row items-center px-8 py-2 w-full">
                <a href="/" className="text-xl font-bold text-indigo-300 tracking-wide mr-8">
                    UCB APOD
                </a>
                <div className="flex-1" />
                <div className="flex flex-row gap-6 items-center">
                    <a href="/" className="text-gray-200 hover:text-indigo-400 font-semibold transition">Início</a>
                    <button
                        onClick={onDownload}
                        className="px-3 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-800 transition"
                    >
                        Baixar a Imagem
                    </button>
                    <a href="#about" className="text-gray-200 hover:text-indigo-400 font-semibold transition">Sobre a Imagem</a>
                    <a href="#ucb" className="text-gray-200 hover:text-indigo-400 font-semibold transition">Sobre a UCB</a>
                    <a href="#contact" className="text-gray-200 hover:text-indigo-400 font-semibold transition">Contato</a>
                </div>
            </div>
        </nav>
    );
}