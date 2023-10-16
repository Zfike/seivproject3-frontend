module.exports = {
    devServer: {
      host: 'localhost',
    },
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/2023/project3/t1/',
    transpileDependencies: ['vuetify'],
  };