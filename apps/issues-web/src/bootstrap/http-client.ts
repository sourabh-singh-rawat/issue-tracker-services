import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  // Without this, relative paths like `/identity/me` hit the Vite origin (e.g. :3000).
  console.error(
    "[issues-web] VITE_API_BASE_URL is not set. API calls will target the web app origin instead of the API gateway.",
  );
}

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
