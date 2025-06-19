import axios from "axios";

const SPTRANS_BASE_URL = "https://api.olhovivo.sptrans.com.br/v2.1";
const SPTRANS_TOKEN = process.env.SPTRANS_TOKEN; 

let sessionCookie: string | null = null;

async function authenticate() {
  const res = await axios.post(
    `${SPTRANS_BASE_URL}/Login/Autenticar?token=${SPTRANS_TOKEN}`,
    null,
    {
      withCredentials: true,
    }
  );

  const setCookie = res.headers["set-cookie"]?.[0];
  if (setCookie) {
    sessionCookie = setCookie.split(";")[0]; 
  } else {
    throw new Error("Falha ao autenticar com SPTrans.");
  }
}

export const http = axios.create({
  baseURL: SPTRANS_BASE_URL,
});

http.interceptors.request.use(async (config) => {
  if (!sessionCookie) await authenticate();
  config.headers = config.headers || {};
  config.headers.Cookie = sessionCookie!;
  return config;
});
