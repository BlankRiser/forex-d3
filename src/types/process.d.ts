declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXT_PUBLIC_FINHUB_BASE_URL: string;
    NEXT_PUBLIC_FINHUB_TOKEN: string;
  }
}
