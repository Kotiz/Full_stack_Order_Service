module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://localhost:3000/',
          changeOrigin: true,
          pathRewrite: { '^/api': ''},
        },
      }
    }
  }