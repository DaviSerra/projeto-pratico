import React, { useState } from "react";
import {
  Calendar,
  Upload,
  Send,
  X,
  Loader2,
  FileText,
  MessageSquarePlus,
} from "lucide-react";
import { toast } from "sonner";
import { postInformacaoDesaparecido } from "../../services/informacoes-desaparecido.service";

interface Props {
  ocoId: number;
  onSuccess?: () => void;
}

const CaseInformation = ({ ocoId, onSuccess }: Props) => {
  const [informacao, setInformacao] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!informacao.trim() || !data) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      await postInformacaoDesaparecido({
        ocoId,
        informacao,
        data,
        anexos: arquivo,
      });

      toast.success("Informação enviada com sucesso!");
      setInformacao("");
      setData(new Date().toISOString().split("T")[0]);
      setArquivo(null);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Erro ao enviar informação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light-50 mt-10 dark:bg-dark-900 border border-light-300 dark:border-dark-700 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-light-200 dark:border-dark-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
            <MessageSquarePlus className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-dark-900 dark:text-light-50">
              Adicionar
            </h3>
            <p className="text-sm text-dark-500 dark:text-light-300">
              Compartilhe informações relevantes sobre o caso
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-light-200 mb-2">
              <Calendar className="w-4 h-4" />
              Data da Informação
            </label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-3 py-2 border border-light-300 dark:border-dark-600 bg-light-50 dark:bg-dark-800 rounded-md text-dark-900 dark:text-light-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-light-200 mb-2">
              Informação <span className="text-alert-600">*</span>
            </label>
            <textarea
              value={informacao}
              onChange={(e) => setInformacao(e.target.value)}
              placeholder="Digite qualquer informação relevante sobre o caso..."
              className="w-full px-3 py-2 border border-light-300 dark:border-dark-600 bg-light-50 dark:bg-dark-800 rounded-md text-dark-900 dark:text-light-50 placeholder-dark-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-colors"
              rows={4}
              maxLength={500}
              required
            />
            <div className="text-xs text-dark-500 mt-1">
              {informacao.length}/500 caracteres
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-light-200 mb-2">
              Anexo{" "}
              <span className="text-dark-500 dark:text-light-300">
                (opcional)
              </span>
            </label>

            {!arquivo ? (
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <div className="border-2 border-dashed border-light-300 dark:border-dark-600 rounded-md p-6 text-center hover:border-primary-300 hover:bg-light-100 dark:hover:bg-dark-800 transition-colors">
                  <Upload className="w-8 h-8 text-dark-500 mx-auto mb-2" />
                  <p className="text-sm text-dark-600 dark:text-light-300">
                    Clique para adicionar arquivo
                  </p>
                  <p className="text-xs text-dark-500 mt-1">
                    PDF, DOC, DOCX ou imagens até 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-light-100 dark:bg-dark-800 border border-light-200 dark:border-dark-700 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-300 dark:bg-primary-700 rounded-md flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary-900 dark:text-primary-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-900 dark:text-light-50 truncate max-w-48">
                      {arquivo.name}
                    </p>
                    <p className="text-xs text-dark-500">
                      {(arquivo.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setArquivo(null)}
                  className="w-8 h-8 bg-alert-100 dark:bg-alert-800 rounded-md flex items-center justify-center text-alert-600 dark:text-alert-300 hover:bg-alert-300 dark:hover:bg-alert-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !informacao.trim()}
            className="w-full py-2.5 px-4 bg-primary-500 hover:bg-primary-700 disabled:bg-dark-600 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center justify-center gap-2 font-medium"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {loading ? "Enviando..." : "Enviar Informação"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaseInformation;
