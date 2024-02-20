/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly API_URL: string;
    readonly TEMPORARY_TOKEN: string;
  }
}
