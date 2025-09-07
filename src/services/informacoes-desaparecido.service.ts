import { apiAbitus } from "../environments/base.api";
import type {
  InformacaoRequest,
  InformacaoResponse,
} from "../interfaces/informacoes-desaparecido.interface";

export async function postInformacaoDesaparecido(
  payload: InformacaoRequest
): Promise<InformacaoResponse> {
  try {
    const formData = new FormData();
    formData.append("ocoId", payload.ocoId.toString());
    formData.append("informacao", payload.informacao);
    formData.append("data", payload.data);

    if (payload.anexos) {
      formData.append("anexos", payload.anexos);
    }

    const response = await apiAbitus.post<InformacaoResponse>(
      `/v1/ocorrencias/informacoes-desaparecido`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao enviar informação:", error);
    throw new Error("Erro ao enviar informações do desaparecido.");
  }
}
