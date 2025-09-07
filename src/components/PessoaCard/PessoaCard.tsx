import { Link } from "react-router-dom";
import type { Pessoa } from "../../interfaces/pessoa.interface";
import { Calendar, MapPin, User, Search, Clock } from "lucide-react";
import { calculateTimeDisappeared } from "../../utils/time-utils";
import { formatDate } from "../../utils/format-date";

interface PessoaCardProps {
  pessoa: Pessoa;
}

const PessoaCard = ({ pessoa }: PessoaCardProps) => {
  const isFound = pessoa.ultimaOcorrencia.dataLocalizacao;

  return (
    <div className="group relative w-full md:w-72 bg-light-50 dark:bg-dark-800 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-300 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-500">
      <div className="relative aspect-[4/5] overflow-hidden bg-light-200 dark:bg-dark-700">
        {pessoa.urlFoto ? (
          <img
            src={pessoa.urlFoto}
            alt={`Foto de ${pessoa.nome}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/brand/user-avatar.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-light-300 dark:bg-dark-600">
            <User className="w-12 h-12 sm:w-16 sm:h-16 text-light-500 dark:text-dark-400" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-start z-20 gap-2">
          <div
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-bold shadow-lg border border-white/30 flex items-center gap-1 sm:gap-1.5 ${
              isFound ? "bg-success-600 text-white" : "bg-alert-600 text-white"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                isFound ? "bg-success-300" : "bg-alert-300"
              }`}
            />
            <span className="hidden sm:inline">
              {isFound ? "ENCONTRADO" : "DESAPARECIDO"}
            </span>
            <span className="sm:hidden">{isFound ? "ENCONTR." : "DESAP."}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 text-white">
          <h3 className="text-lg sm:text-xl font-bold mb-2 font-poppins line-clamp-1">
            {pessoa.nome}
          </h3>

          <div className="flex items-center gap-2 sm:gap-3 text-sm opacity-90 mb-2 sm:mb-3">
            <span className="font-medium">{pessoa.idade} anos</span>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <span className="truncate">
              {pessoa.sexo === "MASCULINO" ? "Masculino" : "Feminino"}
            </span>
          </div>

          <div className="flex items-start gap-2 text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 text-primary-300" />
            <p className="line-clamp-2 leading-relaxed">
              {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-xs opacity-80">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-300" />
              <span className="font-medium">
                {formatDate(pessoa.ultimaOcorrencia.dtDesaparecimento)}
              </span>
            </div>

            {!isFound && (
              <div className="flex items-center gap-2 text-xs opacity-80">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-alert-300" />
                <span className="font-medium text-alert-200">
                  {calculateTimeDisappeared(
                    pessoa.ultimaOcorrencia.dtDesaparecimento
                  )}
                </span>
              </div>
            )}
          </div>

          <Link
            to={`/pessoas/${pessoa.id}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/20 text-white border border-white/30 hover:border-white/50 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm group-hover:bg-primary-500/80 group-hover:border-primary-300  text-center no-underline"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Detalhes do Caso</span>
            <span className="sm:hidden">Detalhes</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PessoaCard;
