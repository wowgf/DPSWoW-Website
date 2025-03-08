// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import { defineNuxtConfig } from 'nuxt/config'

import path from 'path'
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    head: {
      title: '魔兽DPS模拟器',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' },
        { hid: 'description', name: 'description', content: '小白都会用的魔兽DPS模拟器' },
        { name: 'keywords', content: '魔兽世界, 魔兽世界低保, 魔兽世界正式服, 魔兽世界伤害模拟, 魔兽DPS模拟器, 魔兽制造业代工, 魔兽代工网站, 魔兽代工平台, 魔兽制造业平台, 魔兽工匠平台, 魔兽制造业订单, 魔兽订单系统, 魔兽做装备, 魔兽组队招募平台, 魔兽金币交易网站, 魔兽11.0' },
        { name: 'author', content: '魔兽工坊团队' },
        { name: 'robots', content: 'index, follow' },
        { name: 'og:title', content: '魔兽DPS模拟-魔兽世界玩家需求供给平台' },
        { name: 'og:description', content: '小白都会用的魔兽DPS模拟器' },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: 'https://dps.wowgf.com' },
      ],
      script: [
      ],
    },
  },
  vite: {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons/svg')]
      }),
      AutoImport({
        resolvers: [ArcoResolver()],
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      }),
      vitePluginForArco({
        style: 'css'
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/variables.scss" as *;
          `,
        },
      },
    },
  },
  css: [
    "~/assets/styles/init.scss",
    "~/assets/styles/global.scss",
    "~/assets/styles/tailwind.css",
    "~/assets/styles/arco.scss",
    "~/assets/styles/element-theme-1.scss",
    "~/assets/styles/element-plus.scss",
    '~/assets/styles/item-tooltip.scss',
    "element-plus/theme-chalk/dark/css-vars.css",
    "@arco-design/web-vue/dist/arco.less",

  ],
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@vite-pwa/nuxt'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pwa: {
    manifest: {
      name: '魔兽DPS模拟器',
      short_name: '魔兽DPS',
      description: '小白都会用的魔兽DPS模拟器',
      lang: 'zh-CN',
      theme_color: '#FFF',
      // background_color: '#030812',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/home',
      icons: [
        {
          src: '/icons/icon_192x192.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/icons/icon_192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon_512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: ({ url }) => ['/', '/gear'].includes(url.pathname), // 匹配 index.html
          handler: 'NetworkFirst', // 强制从网络获取最新的 index.html 
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
