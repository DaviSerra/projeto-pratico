import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-300 dark:border-dark-700/60 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between md:flex-row gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/design/policia-civil-logo.svg" />
            </div>
            <div className="flex flex-col">
              <span className="text-primary dark:text-secondary-300 font-medium text-base leading-tight tracking-wide">
                Pessoas Desaparecidas
              </span>
              <span className="text-gray-400 font-normal text-sm leading-tight">
                Polícia Judiciária Civil | MT
              </span>
            </div>
          </div>

          <nav className="flex flex-col md:flex-row items-center gap-4 text-sm text-dark-600 dark:text-blue-100">
            <Link
              to="/"
              className="hover:text-primary dark:hover:text-blue-200"
            >
              Termos de uso
            </Link>
            <Link
              to="/"
              className="hover:text-primary dark:hover:text-blue-200"
            >
              Política de privacidade
            </Link>
            <Link
              to="/"
              className="hover:text-primary dark:hover:text-blue-200"
            >
              Enviar feedback
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
