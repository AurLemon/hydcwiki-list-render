const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,

    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
        output: {
            filename: "bundle.js",
        },
    },

    css: {
        extract: {
            filename: "styles.css",
        },
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
