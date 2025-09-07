import { Search, Users, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { EstatisticoPessoas } from "../../interfaces/estatistico.interface";
import { getPessoasEstatistico } from "../../services/estatistico.service";

const HeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [estatisticas, setEstatisticas] = useState<EstatisticoPessoas>({
    quantPessoasDesaparecidas: 0,
    quantPessoasEncontradas: 0,
  });

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const dados = await getPessoasEstatistico();
        setEstatisticas(dados);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstatisticas();
  }, []);

  return (
    <section className="relative bg-light-50 dark:bg-dark-900 w-full overflow-hidden font-inter">
      <div className="max-w-8xl mx-auto relative z-10 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between pt-20 sm:pt-24 lg:pt-32 gap-8 lg:gap-0">
          <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-dark-900 dark:text-light-50 leading-tight font-poppins">
                Busca
                <span className="block font-semibold text-secondary-500 dark:text-secondary-300">
                  especializada
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-dark-600 dark:text-light-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Plataforma colaborativa para reunir famílias e encontrar pessoas
                desaparecidas através da tecnologia.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => {
                  window.scrollTo({ top: 500, behavior: "smooth" });
                }}
                className="bg-secondary-300 hover:bg-secondary-300/90 cursor-pointer text-dark-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base"
              >
                Reportar caso
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="bg-gradient-to-br from-white dark:from-dark-800/50 dark:to-dark-900/30 backdrop-blur-sm border border-gray-300 dark:border-dark-600/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-secondary-500/50 dark:hover:border-secondary-500/30 transition-all duration-300 group w-full sm:min-w-[280px] lg:min-w-[320px]">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-gradient-to-br from-secondary-500/20 to-secondary-600/10 rounded-xl sm:rounded-2xl group-hover:from-secondary-500/30 group-hover:to-secondary-600/20 transition-all">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-500 dark:text-secondary-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-dark-800 dark:text-light-200 mb-1 font-poppins whitespace-nowrap">
                      Pessoas Desaparecidas
                    </h3>
                    <p className="text-xs sm:text-sm text-dark-600 dark:text-light-400">
                      Casos ativos
                    </p>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-light-50 tracking-tight font-poppins">
                  {loading
                    ? "..."
                    : estatisticas?.quantPessoasEncontradas?.toLocaleString() ??
                      "0"}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white dark:from-dark-800/50 dark:to-dark-900/30 backdrop-blur-sm border border-gray-300 dark:border-dark-600/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-success-600/50 dark:hover:border-success-500/30 transition-all duration-300 group w-full sm:min-w-[280px] lg:min-w-[320px]">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-gradient-to-br from-success-600/20 dark:from-success-500/20 to-success-800/10 dark:to-success-600/10 rounded-xl sm:rounded-2xl group-hover:from-success-600/30 dark:group-hover:from-success-500/30 group-hover:to-success-800/20 dark:group-hover:to-success-600/20 transition-all">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-dark-800 dark:text-light-200 mb-1 font-poppins">
                      Pessoas Encontradas
                    </h3>
                    <p className="text-xs sm:text-sm text-dark-600 dark:text-light-400">
                      Casos resolvidos
                    </p>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-light-50 tracking-tight font-poppins">
                  {loading
                    ? "..."
                    : estatisticas?.quantPessoasDesaparecidas?.toLocaleString() ??
                      "0"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
