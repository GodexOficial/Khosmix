module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,js,css,webp,woff2}',
    'assets/images/*.webp',
    'icons/*.png'
  ],
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ],
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /\.(?:webp|jpg|jpeg|png|gif|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 ano
        },
      },
    }
  ]
}; 