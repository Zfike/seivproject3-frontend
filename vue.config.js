module.exports = {
    devServer: {
      host: 'localhost',
    },
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/seivproject3-frontend/',
    transpileDependencies: ['vuetify'],
  };