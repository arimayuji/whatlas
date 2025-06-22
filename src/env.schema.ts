export const schema = {
  type: "object",
  required: [
    "NODE_ENV",
    "PORT",
    "SPTRANS_TOKEN",
    "GOOGLE_API_KEY",
  ],
  properties: {
    NODE_ENV: { type: "string" },
    PORT: { type: "string" },
    SPTRANS_TOKEN: { type: "string" },
    GOOGLE_API_KEY: { type: "string" },
  },
} as const;
