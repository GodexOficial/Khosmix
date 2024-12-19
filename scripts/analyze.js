const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const config = require('../webpack.config.js');

// Adiciona o plugin do analyzer
config.plugins.push(new BundleAnalyzerPlugin());

// Executa o webpack com a configuração atualizada
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.toString());
    process.exit(1);
  }
  console.log(stats.toString({ colors: true }));
}); 