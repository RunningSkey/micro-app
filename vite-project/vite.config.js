import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import { name } from './package.json'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')
  return {
    //对应nginx的目录
    base: env.VITE_BASE_URL,
    define: {
      env: JSON.stringify(env)
    },
    build: {
      // eslint-disable-next-line no-undef
      outDir: path.join(__dirname, '../build/child/vite-project')
    },
    plugins: [
      vue(),
      qiankun(name, {
        useDevMode: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
