var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;

var data = require("./data");
var types = data.types;

var page;
var pageData;

var attackSuperEffective;
var attackEffective;
var attackNotEffective;
var attackNoEffect;
var defenseSuperEffective;
var defenseEffective;
var defenseNotEffective;
var defenseNoEffect;

exports.onNavigatingTo = function(args) {
  page = args.object;
  pageData = new Observable(page.navigationContext);
  page.bindingContext = pageData;

  attackSuperEffective = [];
  attackEffective = [];
  attackNotEffective = [];
  attackNoEffect = [];
  defenseSuperEffective = [];
  defenseEffective = [];
  defenseNotEffective = [];
  defenseNoEffect = [];

  var selectedTypeIndex = types.indexOf(page.navigationContext.type);
  types.forEach(function(referenceType, referenceTypeIndex) {
    var attackEffectiveness = data.effectiveness[(selectedTypeIndex * 18) + referenceTypeIndex];
    if (attackEffectiveness === 0) {
      attackNoEffect.push(referenceType);
    } else if (attackEffectiveness === 0.5) {
      attackNotEffective.push(referenceType);
    } else if (attackEffectiveness === 1) {
      attackEffective.push(referenceType);
    } else if (attackEffectiveness === 2) {
      attackSuperEffective.push(referenceType);
    }

    var defenseEffectiveness = data.effectiveness[(referenceTypeIndex * 18) + selectedTypeIndex];
    if (defenseEffectiveness === 0) {
      defenseNoEffect.push(referenceType);
    } else if (defenseEffectiveness === 0.5) {
      defenseNotEffective.push(referenceType);
    } else if (defenseEffectiveness === 1) {
      defenseEffective.push(referenceType);
    } else if (defenseEffectiveness === 2) {
      defenseSuperEffective.push(referenceType);
    }
  });

  pageData.set("attackSuperEffective", attackSuperEffective);
  pageData.set("attackEffective", attackEffective);
  pageData.set("attackNotEffective", attackNotEffective);
  pageData.set("attackNoEffect", attackNoEffect);
  pageData.set("defenseSuperEffective", defenseSuperEffective);
  pageData.set("defenseEffective", defenseEffective);
  pageData.set("defenseNotEffective", defenseNotEffective);
  pageData.set("defenseNoEffect", defenseNoEffect);
};

exports.navigateToNewType = function(args) {
  frameModule.topmost().navigate({
    moduleName: "detail-page",
    context: {
      type: args.object.bindingContext
    }
  });
}
