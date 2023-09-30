// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JSDOM } = require("jsdom");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Handlebars = require("handlebars");

const { window } = new JSDOM('<div id="root"></div>', {
  url: "http://localhost:3000",
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions[".hbs"] = function extensions(module, filename) {
  const contents = fs.readFileSync(filename, "utf-8");

  // eslint-disable-next-line no-param-reassign
  module.exports = Handlebars.compile(contents);
};
require.extensions[".scss"] = function extensions() {
  module.exports = () => ({});
};
