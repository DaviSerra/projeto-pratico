import { apiAbitus } from "../environments/base.api";
import type {
  FiltroParams,
  PaginatedPessoas,
} from "../interfaces/pessoa.interface";

export async function getPessoasFiltro(
  params?: FiltroParams
): Promise<PaginatedPessoas> {
  try {
    const requestParams = {
      pagina: params?.pagina || 0,
      porPagina: params?.porPagina || 10,
      faixaIdadeInicial: params?.faixaIdadeInicial || 0,
      faixaIdadeFinal: params?.faixaIdadeFinal || 0,
      ...params,
    };

    const response = await apiAbitus.get<PaginatedPessoas>(
      `/v1/pessoas/aberto/filtro`,
      { params: requestParams }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pessoas:", error);
    throw new Error("Erro ao buscar pessoas desaparecidas.");
  }
}
