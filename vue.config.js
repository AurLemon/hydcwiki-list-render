const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  
  configureWebpack: {
    optimization: {
      splitChunks: false, // 禁用代码拆分
    },
    output: {
      filename: 'bundle.js', // 生成一个 JS 文件
    }
  },
  
  css: {
    extract: {
      filename: 'styles.css', // 将 CSS 提取到一个文件中
    },
  },
});
