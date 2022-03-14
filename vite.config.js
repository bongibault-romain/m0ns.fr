import compress from 'vite-plugin-compress'
import htmlPurge from 'vite-plugin-html-purgecss'
import { createHtmlPlugin } from 'vite-plugin-html'

import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true
  },
  build: {
    minify: true,
    sourcemap: true,
    manifest: true,
  },
  assetsInclude: ['**/*.eot', '**/*.ttf', '**/*.woff', '**/*.woff2'],
  plugins: [
    compress({
        quality: 11,
        brotli: false,
    }),
    htmlPurge({
      deep: [/category$/, /sub-category$/, /skeleton-box$/],
      greedy: [/category$/, /sub-category$/, /skeleton-box$/],
      standard: [/category$/, /sub-category$/, /skeleton-box$/]
    }),
    createHtmlPlugin({
      minify: true,
    })
  ]
})
