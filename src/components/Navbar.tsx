type Props = {
    onDownload: () => void;
}

export default function Navbar({ onDownload }: Props) {
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top shadow">
            <div className="container-fluid d-flex align-items-center">
                <a href="/" className="navbar-brand me-4">
                    UCB APOD
                </a>
                <div className="ms-auto d-flex align-items-center gap-3">
                    <a href="/" className="text-white text-decoration-none">Início</a>
                    <button onClick={onDownload} className="btn btn-primary">
                        Baixar a Imagem
                    </button>
                    <a href="#about" className="text-white text-decoration-none">Sobre a Imagem</a>
                    <a href="#ucb" className="text-white text-decoration-none">Sobre a UCB</a>
                    <a href="#contact" className="text-white text-decoration-none">Contato</a>
                </div>
            </div>
        </nav>
    );
}