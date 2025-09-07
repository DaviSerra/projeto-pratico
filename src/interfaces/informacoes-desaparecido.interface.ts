export interface InformacaoRequest {
  ocoId: number;
  informacao: string;
  data: string;
  anexos?: File | null;
}

export interface InformacaoResponse {
  ocoId: number;
  informacao: string;
  data: string;
  id: number;
  anexos: string[] | null;
}
