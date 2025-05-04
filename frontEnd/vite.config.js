import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths"


const PORT = process.env.PORT
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),jsconfigPaths()],
  server: {
    proxy: {
      "/api":{ 
        target:"http://localhost:7001"
      }
    }
  }
})
