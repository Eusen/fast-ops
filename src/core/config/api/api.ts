export interface SwaggerDef {
  name?: string;
  url?: string;
  groups?: string[];
}

export interface ApiConfigDef {
  root?: string;
  swaggers?: SwaggerDef[];
}

export class ApiConfig {
  static create = (def: ApiConfigDef) => def;
}
