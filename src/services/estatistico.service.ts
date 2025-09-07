import { apiAbitus } from "../environments/base.api";
import type { EstatisticoPessoas } from "../interfaces/estatistico.interface";

export async function getPessoasEstatistico(): Promise<EstatisticoPessoas> {
  try {
    const response = await apiAbitus.get<EstatisticoPessoas>(
      `/v1/pessoas/aberto/estatistico`
    );
    return response.data;
  } catch {
    throw new Error("Erro ao buscar estatísticas de pessoas.");
  }
}
