seajs.config({
  alias: {
    "jquery": "jquery-1.9.0.min.js"
  },
  preload:"jquery"
});

seajs.use("./js/newbbs-page/main.js");