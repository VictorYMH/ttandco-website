export default defineNuxtConfig({
  app: {
    head: {
      title: 'TT&CO China', // default fallback title
      htmlAttrs: {
        lang: 'cn',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-03-22'
})