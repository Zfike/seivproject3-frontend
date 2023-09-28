module.exports = {
    devServer: {
      host: 'localhost',
    },
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/seivproject2-frontend/',
    transpileDependencies: ['vuetify'],
  };