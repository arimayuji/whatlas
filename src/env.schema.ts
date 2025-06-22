export const schema = {
  type: "object",
  required: [
    "GOOGLE_APPLICATION_CREDENTIALS_JSON",
    "NODE_ENV",
    "PORT",
    "SPTRANS_TOKEN",
    "GOOGLE_API_KEY",
  ],
  properties: {
    GOOGLE_APPLICATION_CREDENTIALS_JSON: { type: "string" },
    NODE_ENV: { type: "string" },
    PORT: { type: "string" },
    SPTRANS_TOKEN: { type: "string" },
    GOOGLE_API_KEY: { type: "string" },
  },
} as const;
