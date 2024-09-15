import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [react()],
})
export default config