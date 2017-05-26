var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;

var data = require("./data");

var page;
var pageData = new Observable();

pageData.set("types", data.types);

exports.onNavigatingTo = function(args) {
  page = args.object;
  page.bindingContext = pageData;
};

exports.navigate = function(args) {
  frameModule.topmost().navigate({
    moduleName: "detail-page",
    context: {
      type: args.object.bindingContext
    }
  });
}
