import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    // get avoild the CORS error 
    proxy:{
      "/api":{
        target:"https://automotive-project-server.vercel.app/",
        changeOrigin:true,
        secure:false,
      }
    }
  }
})