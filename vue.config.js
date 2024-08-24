const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,
    publicPath: '/static/list/',

    configureWebpack: {
        optimization: {
            splitChunks: false,
            runtimeChunk: false
        },
        output: {
            filename: "bundle.js",
        },
    },

    css: {
        extract: process.env.NODE_ENV === 'production' ? { filename: "styles.css" } : false,
    },

    devServer: {
        proxy: {
            "/api": {
                target: "https://api.hydcraft.cn",
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
            },
        },
    },
});