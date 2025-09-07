export interface FiltroParams {
  pagina?: number;
  porPagina?: number;
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: "MASCULINO" | "FEMININO";
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO";
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao: string;
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO?: {
      informacao: string;
      vestimentasDesaparecido: string;
    };
    listaCartaz: null;
    ocoId: number;
  };
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PaginatedPessoas {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  content: Pessoa[];
  number: number;
  sort: Sort;
  empty: boolean;
}
