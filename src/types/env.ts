declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ALLOWED_USERS: string;
        DATABASE_URL: string;
        NV_TOKEN: string;
        TOKEN: string;
        ADMIN_ID: string;
        WEBAPP: string;
      }
    }
}

export {}