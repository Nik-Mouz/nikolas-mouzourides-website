const fs = require('fs');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    hello () {
      console.log("hi");
      return "hello world";
    },
    getBlogsInFileSystem () {
      return fs.readdirSync(__dirname + '/../../blogs').length;
    }
  })

};
