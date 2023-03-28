const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app/",
      changeOrigin: true,
    })
  );
};
