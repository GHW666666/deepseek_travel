// travel/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'  // 注意这里使用 path 而不是 resolve
import pxtorem from 'postcss-pxtorem'

export default defineConfig({
  base: '/deepseek_travel/', // GitHub Pages部署路径，替换为你的仓库名
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')  // 正确配置路径别名
    }
  },
   css: {
     postcss: {
      plugins: [
        pxtorem({
         rootValue: 37.5,
         unitPrecision: 3,
         propList: ['*'],
        })
      ] 
     }
   }
})
