import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), react()],
	server: {
		proxy: {
			"/api": {
				target: "http://wavefinderapi.test",
				changeOrigin: true,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			}
		}
	}
});
