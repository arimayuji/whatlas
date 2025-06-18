export const schema = {
  type: "object",
  required: ["GOOGLE_APPLICATION_CREDENTIALS_JSON", "NODE_ENV", "PORT"],
  properties: {
    GOOGLE_APPLICATION_CREDENTIALS_JSON: { type: "string" },
    NODE_ENV: { type: "string" },
    PORT: { type: "string" },
  },
} as const;
