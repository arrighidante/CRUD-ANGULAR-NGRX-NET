export interface Pais {
  name?: string;
  code?: string;
}

export interface Agente {
  name?: string;
  image?: string;
}

export interface User {
  id?: number;
  name?: string;
  country?: Pais;
  company?: string;
  date?: string | Date;
  status?: string;
  getHiredChance?: number;
  representative?: Agente;
  verified?: boolean;
  balance?: number;
}
