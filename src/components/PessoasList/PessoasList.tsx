import { useState, useEffect } from "react";
import type {
  PaginatedPessoas,
  FiltroParams,
} from "../../interfaces/pessoa.interface";
import { getPessoasFiltro } from "../../services/pessoa.service";
import PessoaCard from "../PessoaCard/PessoaCard";
import Pagination from "../Pagination/Pagination";
import { Archive } from "lucide-react";
import Loading from "../../Loading/Loading";
import PessoaFilter from "../PersonFilter/PersonFilter";
import ErrorFeedback from "../../ErrorFeedback/ErrorFeedback";

const PessoasList = () => {
  const [paginatedData, setPaginatedData] = useState<PaginatedPessoas | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFilters, setActiveFilters] = useState<FiltroParams>({});

  const fetchPessoas = async (page: number = 0, filters: FiltroParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPessoasFiltro({
        pagina: page,
        porPagina: 10,
        ...filters,
      });
      setPaginatedData(data);
      setCurrentPage(page);
    } catch {
      setError("Erro ao carregar dados das pessoas desaparecidas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPessoas(0, activeFilters);
  }, [activeFilters]);

  const handleFilter = (filters: FiltroParams) => {
    setActiveFilters(filters);
    setCurrentPage(0);
    fetchPessoas(0, filters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPessoas(page, activeFilters);
    window.scrollTo({ top: 475, behavior: "smooth" });
  };

  if (loading && !paginatedData) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorFeedback
        message={error}
        onRetry={() => fetchPessoas(currentPage, activeFilters)}
      />
    );
  }

  if (!paginatedData) {
    return null;
  }

  const { content: pessoas, totalElements, totalPages } = paginatedData;

  return (
    <div className="bg-light-50 dark:bg-dark-900 min-h-screen font-inter">
      <div className="max-w-8xl mx-auto pt-16 sm:pt-20 pb-8">
        <div className="text-center mb-16 sm:mb-20 px-4 sm:px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-dark-900 dark:text-light-50 leading-[0.9] font-poppins mb-6">
            Pessoas
            <span className="block font-semibold text-secondary-500 dark:text-secondary-300">
              Desaparecidas
            </span>
          </h1>
          <div className="w-72 h-px bg-gradient-to-r from-transparent via-secondary-500 dark:via-secondary-300 to-transparent mx-auto" />
        </div>

        <PessoaFilter onFilter={handleFilter} isLoading={loading} />

        {pessoas && pessoas.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
              {pessoas.map((pessoa) => (
                <div key={pessoa.id} className="w-full">
                  <PessoaCard pessoa={pessoa} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={12}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-light-200 dark:from-dark-700 to-light-300 dark:to-dark-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Archive className="w-10 h-10 sm:w-12 sm:h-12 text-dark-500 dark:text-light-300" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-dark-700 dark:text-light-200 mb-3 font-poppins">
              Nenhuma pessoa encontrada
            </h3>
            <p className="text-dark-500 dark:text-light-400 text-base sm:text-lg max-w-md mx-auto px-4">
              {activeFilters && Object.keys(activeFilters).length > 0
                ? "Não foram encontradas pessoas com os filtros aplicados. Tente ajustar os critérios de busca."
                : "Não há pessoas cadastradas no momento. Volte mais tarde para verificar novos registros."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PessoasList;
