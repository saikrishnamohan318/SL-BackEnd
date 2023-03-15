const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/email', createProxyMiddleware({
    target: 'https://sl-back-end.vercel.app',
    changeOrigin: true,
    pathRewrite: {
      '^/email': ''
    }
  }));
};
