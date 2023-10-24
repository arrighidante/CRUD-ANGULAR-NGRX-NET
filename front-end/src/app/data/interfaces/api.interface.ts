export interface ConfigExternal {
  apiSettings: ApiSettings;
}

export interface ApiSettings {
  authentication: ApiProperties;
  apiProducts: ApiProperties;
}

export interface ApiProperties {
  url: string;
}
