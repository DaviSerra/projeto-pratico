import { apiAbitus } from "../environments/base.api";
import type { Pessoa } from "../interfaces/pessoa.interface";

export async function getPessoaById(id: string | number): Promise<Pessoa> {
  try {
    const response = await apiAbitus.get<Pessoa>(`/v1/pessoas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pessoa por ID:", error);
    throw new Error("Erro ao buscar dados da pessoa.");
  }
}
