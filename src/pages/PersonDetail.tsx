import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Info,
  Shirt,
  Plus,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import type { Pessoa } from "../interfaces/pessoa.interface";
import { getPessoaById } from "../services/pessoa-detalhe.service";

import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { calculateTimeDisappeared } from "../utils/time-utils";
import CaseInformation from "../components/CaseInformation/CaseInformation";
import { formatDate } from "../utils/format-date";

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPessoa = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getPessoaById(id);
        setPessoa(data);
      } catch {
        setError("Erro ao carregar informações da pessoa.");
      } finally {
        setLoading(false);
      }
    };

    fetchPessoa();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  if (!pessoa) {
    return (
      <div className="min-h-screen bg-light-100 dark:bg-dark-900 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-light-200 dark:bg-dark-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-dark-500" />
          </div>
          <h1 className="text-xl font-bold text-dark-900 dark:text-light-50 mb-2">
            Pessoa não encontrada
          </h1>
          <p className="text-dark-500 dark:text-light-300 mb-6">
            O registro solicitado não existe ou foi removido
          </p>
          <Link
            to="/pessoas"
            className="inline-flex items-center gap-2 px-4 py-2 bg-dark-900 dark:bg-light-50 text-light-50 dark:text-dark-900 rounded-md hover:bg-dark-800 dark:hover:bg-light-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  const isFound = pessoa.ultimaOcorrencia.dataLocalizacao;

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-900 pt-16">
      <div className="bg-light-50 dark:bg-dark-900 border-b border-light-300 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-dark-500 dark:text-light-300 hover:text-dark-900 dark:hover:text-light-50 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-full h-full lg:w-56 lg:h-72 rounded-lg overflow-hidden bg-light-200 dark:bg-dark-700 border border-light-200 dark:border-dark-600">
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
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-dark-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                    isFound
                      ? "bg-success-100 dark:bg-success-800 text-success-600 dark:text-success-300"
                      : "bg-alert-100 dark:bg-alert-800 text-alert-600 dark:text-alert-300"
                  }`}
                >
                  {isFound ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {isFound ? "ENCONTRADO" : "DESAPARECIDO"}
                </div>
                <span className="px-3 py-1 bg-light-200 dark:bg-dark-800 text-dark-600 dark:text-light-300 rounded-full text-sm font-mono">
                  #{pessoa.id}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 dark:text-light-50 mb-6">
                {pessoa.nome}
              </h1>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-dark-500 dark:text-light-300 mb-1">
                    Idade
                  </p>
                  <p className="text-lg font-semibold text-dark-900 dark:text-light-50">
                    {pessoa.idade} anos
                  </p>
                </div>
                <div>
                  <p className="text-sm text-dark-500 dark:text-light-300 mb-1">
                    Sexo
                  </p>
                  <p className="text-lg font-semibold text-dark-900 dark:text-light-50">
                    {pessoa.sexo === "MASCULINO" ? "Masculino" : "Feminino"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-dark-500 dark:text-light-300 mb-1">
                    Status
                  </p>
                  <p className="text-lg font-semibold text-dark-900 dark:text-light-50">
                    {pessoa.vivo ? "Ativo" : "Inativo"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5 text-primary-500" />
                <h2 className="text-xl font-bold text-dark-900 dark:text-light-50">
                  Informações do Caso
                </h2>
              </div>

              <div className="bg-light-50 dark:bg-dark-900 border border-light-300 dark:border-dark-700 rounded-lg divide-y divide-light-200 dark:divide-dark-700">
                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 bg-alert-100 dark:bg-alert-800 rounded-md flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-alert-600 dark:text-alert-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-dark-900 dark:text-light-50 mb-1">
                      Local do Desaparecimento
                    </p>
                    <p className="text-sm text-dark-600 dark:text-light-300">
                      {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
                    </p>
                  </div>
                </div>

                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 bg-primary-300 dark:bg-primary-700 rounded-md flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary-900 dark:text-primary-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-dark-900 dark:text-light-50 mb-1">
                      Data do Desaparecimento
                    </p>
                    <p className="text-sm text-dark-600 dark:text-light-300">
                      {formatDate(pessoa.ultimaOcorrencia.dtDesaparecimento)}
                    </p>
                  </div>
                </div>

                {!isFound ? (
                  <div className="p-4 flex gap-3">
                    <div className="w-8 h-8 bg-secondary-300 dark:bg-secondary-700 rounded-md flex items-center justify-center">
                      <Clock className="w-4 h-4 text-secondary-900 dark:text-secondary-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-dark-900 dark:text-light-50 mb-1">
                        Tempo Desaparecido
                      </p>
                      <p className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                        {calculateTimeDisappeared(
                          pessoa.ultimaOcorrencia.dtDesaparecimento
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex gap-3">
                    <div className="w-8 h-8 bg-success-100 dark:bg-success-800 rounded-md flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-dark-900 dark:text-light-50 mb-1">
                        Data da Localização
                      </p>
                      <p className="text-sm font-semibold text-success-600 dark:text-success-300">
                        {formatDate(pessoa.ultimaOcorrencia.dataLocalizacao)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 bg-primary-300 dark:bg-primary-700 rounded-md flex items-center justify-center">
                    <Shirt className="w-4 h-4 text-primary-900 dark:text-primary-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-dark-900 dark:text-light-50 mb-1">
                      Vestimenta
                    </p>
                    <p className="text-sm text-dark-600 dark:text-light-300">
                      {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                        ?.vestimentasDesaparecido || "Não informado"}
                    </p>
                  </div>
                </div>

                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 bg-light-200 dark:bg-dark-800 rounded-md flex items-center justify-center">
                    <Plus className="w-4 h-4 text-dark-600 dark:text-light-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-dark-900 dark:text-light-50 mb-1">
                      Informações adicionais
                    </p>
                    <p className="text-sm text-dark-600 dark:text-light-300">
                      {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                        ?.informacao ||
                        "Nenhuma informação adicional disponível"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-light-50 dark:bg-dark-900 border border-light-300 dark:border-dark-700 rounded-lg shadow-sm h-full">
                <div className="px-6 py-4 border-b border-light-200 dark:border-dark-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-success-500 rounded-md flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-900 dark:text-light-50">
                        Como Ajudar
                      </h3>
                      <p className="text-sm text-dark-500 dark:text-light-300">
                        Informações para colaborar com o caso
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  <p className="text-sm text-dark-600 dark:text-light-300 mb-4">
                    Se você tem informações que podem ajudar, entre em contato
                    conosco:
                  </p>

                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-green-700 dark:text-green-300 font-medium">
                        WhatsApp
                      </div>
                      <div className="text-sm font-mono text-green-800 dark:text-green-200">
                        (69) 99999-9999
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-dark-500 dark:text-light-400 mt-3">
                    Todas as informações são tratadas com confidencialidade
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CaseInformation ocoId={pessoa.ultimaOcorrencia.ocoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
