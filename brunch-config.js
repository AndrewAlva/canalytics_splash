// brunch-config.js
module.exports = {
  files: {
    javascripts: {joinTo: 'js/app.js'},
    stylesheets: {joinTo: 'css/app.css'}
  },
  plugins: {
    pug: {

    },
    sass: {
      options: {
        includePaths: [
          'node_modules/bootstrap/scss'
        ]
      }
    }
  }
}
