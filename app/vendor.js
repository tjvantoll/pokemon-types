require("./vendor-platform");

require("bundle-entry-points");

global.registerModule("data", function() {
  return require("./data");
});
global.registerModule("main-page", function() {
  return require("./main-page");
});
global.registerModule("detail-page", function() {
  return require("./detail-page");
});
