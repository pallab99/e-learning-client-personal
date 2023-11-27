import react from "@vitejs/plugin-react";
import million from "million/compiler";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), qrcode()],
  server: {
    host: true,
  },
  define: {
    global: {},
  },
});
