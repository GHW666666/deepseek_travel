// travel/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'  // 注意这里使用 path 而不是 resolve
import pxtorem from 'postcss-pxtorem'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')  // 正确配置路径别名
    }
  },
  // css: {
  //   postcss: {
  //    plugins: [
  //      pxtorem({
  //       rootValue: 37.5,
  //       unitPrecision: 3,
  //       propList: ['*'],
  //      })
  //    ] 
  //   }
  // }
})