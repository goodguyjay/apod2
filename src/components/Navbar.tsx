type Props = {
    onDownload: () => void;
}

export default function Navbar({ onDownload }: Props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black bg-opacity-75 fixed-top shadow-sm border-bottom border-secondary">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">UCB APOD</a>
                <div className="ms-auto d-flex align-items-center gap-3">
                    <a href="/" className="text-light text-decoration-none">Início</a>
                    <a href="#about" className="text-light text-decoration-none">Sobre a Imagem</a>
                    <a href="#ucb" className="text-light text-decoration-none">Sobre a UCB</a>
                    <a href="#contact" className="text-light text-decoration-none">Contato</a>
                    <button onClick={onDownload} className="btn btn-outline-light">
                        Baixar Imagem
                    </button>
                </div>
            </div>
        </nav>
    );
}