import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    
    // get avoild the CORS error 
    proxy:{
      "/api":{
        target:"https://automotive-project-server.onrender.com/",
        changeOrigin:true,
        secure:false,
      }
    }
  }
})