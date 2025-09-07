import { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import type { FiltroParams } from "../../interfaces/pessoa.interface";

interface PessoaFilterProps {
  onFilter: (params: FiltroParams) => void;
  isLoading?: boolean;
}

const PessoaFilter = ({ onFilter, isLoading = false }: PessoaFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltroParams>({
    nome: "",
    faixaIdadeInicial: undefined,
    faixaIdadeFinal: undefined,
    sexo: undefined,
  });

  const handleInputChange = (field: keyof FiltroParams, value: unknown) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    const cleanedFilters: FiltroParams = {};
    if (filters.nome?.trim()) cleanedFilters.nome = filters.nome.trim();
    if (filters.faixaIdadeInicial && filters.faixaIdadeInicial > 0) {
      cleanedFilters.faixaIdadeInicial = filters.faixaIdadeInicial;
    }
    if (filters.faixaIdadeFinal && filters.faixaIdadeFinal > 0) {
      cleanedFilters.faixaIdadeFinal = filters.faixaIdadeFinal;
    }
    if (filters.sexo) cleanedFilters.sexo = filters.sexo;
    onFilter(cleanedFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      nome: "",
      faixaIdadeInicial: undefined,
      faixaIdadeFinal: undefined,
      sexo: undefined,
    };
    setFilters(emptyFilters);
    onFilter({});
  };

  const handleClearSpecificFilter = (
    field: keyof FiltroParams,
    additionalFields?: (keyof FiltroParams)[]
  ) => {
    const fieldsToUpdate = [field, ...(additionalFields || [])];

    setFilters((prev) => {
      const updated = { ...prev };
      fieldsToUpdate.forEach((f) => {
        if (f === "nome") {
          updated[f] = "";
        } else {
          updated[f] = undefined;
        }
      });
      return updated;
    });

    const cleanedFilters: FiltroParams = {};
    const tempFilters = { ...filters };

    fieldsToUpdate.forEach((f) => {
      if (f === "nome") {
        tempFilters[f] = "";
      } else {
        tempFilters[f] = undefined;
      }
    });

    if (tempFilters.nome?.trim()) cleanedFilters.nome = tempFilters.nome.trim();
    if (tempFilters.faixaIdadeInicial && tempFilters.faixaIdadeInicial > 0) {
      cleanedFilters.faixaIdadeInicial = tempFilters.faixaIdadeInicial;
    }
    if (tempFilters.faixaIdadeFinal && tempFilters.faixaIdadeFinal > 0) {
      cleanedFilters.faixaIdadeFinal = tempFilters.faixaIdadeFinal;
    }
    if (tempFilters.sexo) cleanedFilters.sexo = tempFilters.sexo;

    onFilter(cleanedFilters);
  };

  const hasActiveFilters =
    filters.nome ||
    filters.faixaIdadeInicial ||
    filters.faixaIdadeFinal ||
    filters.sexo;

  return (
    <div className="relative mb-8">
      <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={filters.nome || ""}
            onChange={(e) => handleInputChange("nome", e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleApplyFilters()}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-xl focus:border-primary-400 dark:focus:border-primary-500 focus:outline-none text-dark-800 dark:text-light-100 placeholder-dark-400 dark:placeholder-light-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-xl border transition-all duration-200 font-medium ${
            hasActiveFilters
              ? "bg-primary-50 dark:bg-primary-900/30 border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300"
              : "bg-white dark:bg-dark-800 border-gray-300 dark:border-dark-700 text-dark-600 dark:text-light-300 hover:border-primary-300 dark:hover:border-primary-500"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filtros</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 mx-4 sm:mx-6">
          <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-300 dark:border-dark-700 shadow-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-700 dark:text-light-200">
                  Idade Mínima
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  placeholder="Ex: 18"
                  value={filters.faixaIdadeInicial || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "faixaIdadeInicial",
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="w-full px-4 py-2.5 bg-light-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:border-primary-400 dark:focus:border-primary-500 focus:outline-none text-dark-800 dark:text-light-100 placeholder-dark-400 dark:placeholder-light-500"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-700 dark:text-light-200">
                  Idade Máxima
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  placeholder="Ex: 65"
                  value={filters.faixaIdadeFinal || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "faixaIdadeFinal",
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="w-full px-4 py-2.5 bg-light-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:border-primary-400 dark:focus:border-primary-500 focus:outline-none text-dark-800 dark:text-light-100 placeholder-dark-400 dark:placeholder-light-500"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-700 dark:text-light-200">
                  Sexo
                </label>
                <select
                  value={filters.sexo || ""}
                  onChange={(e) =>
                    handleInputChange("sexo", e.target.value || undefined)
                  }
                  className="w-full px-4 py-2.5 bg-light-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:border-primary-400 dark:focus:border-primary-500 focus:outline-none text-dark-800 dark:text-light-100"
                  disabled={isLoading}
                >
                  <option value="">Todos</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-dark-600">
              <button
                onClick={handleClearFilters}
                disabled={isLoading || !hasActiveFilters}
                className="flex items-center justify-center cursor-pointer gap-2 px-4 py-2.5 text-dark-600 dark:text-light-300 hover:text-dark-800 dark:hover:text-light-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <X className="w-4 h-4" />
                Limpar Filtros
              </button>
              <button
                onClick={handleApplyFilters}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-success-600 hover:text-gray-300 cursor-pointer text-gray-500 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Search className="w-4 h-4" />
                {isLoading ? "Aplicando..." : "Aplicar Filtros"}
              </button>
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && !isOpen && (
        <div className="flex flex-wrap gap-2 px-4 sm:px-6 mt-4">
          {filters.nome && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
              Nome: "{filters.nome}"
              <button
                onClick={() => handleClearSpecificFilter("nome")}
                className="hover:bg-primary-200 cursor-pointer dark:hover:bg-primary-800/50 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(filters.faixaIdadeInicial || filters.faixaIdadeFinal) && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
              Idade: {filters.faixaIdadeInicial || "0"} -{" "}
              {filters.faixaIdadeFinal || "120"}
              <button
                onClick={() =>
                  handleClearSpecificFilter("faixaIdadeInicial", [
                    "faixaIdadeFinal",
                  ])
                }
                className="hover:bg-primary-200 dark:hover:bg-primary-800/50 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.sexo && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
              {filters.sexo === "MASCULINO" ? "Masculino" : "Feminino"}
              <button
                onClick={() => handleClearSpecificFilter("sexo")}
                className="hover:bg-primary-200 cursor-pointer dark:hover:bg-primary-800/50 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PessoaFilter;
