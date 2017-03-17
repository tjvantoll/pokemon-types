var Observable = require("data/observable").Observable;

var data = require("./data");
var types = data.types;

var page;
var pageData;

var attackSuperEffective;
var attackNotEffective;
var attackNoEffect;
var defenseSuperEffective;
var defenseNotEffective;
var defenseNoEffect;

exports.onNavigatingTo = function(args) {
  page = args.object;
  pageData = new Observable(page.navigationContext);
  page.bindingContext = pageData;

  attackSuperEffective = [];
  attackNotEffective = [];
  attackNoEffect = [];
  defenseSuperEffective = [];
  defenseNotEffective = [];
  defenseNoEffect = [];

  var selectedTypeIndex = types.indexOf(page.navigationContext.type);
  types.forEach(function(referenceType, referenceTypeIndex) {
    var attackEffectiveness = data.effectiveness[(selectedTypeIndex * 18) + referenceTypeIndex];
    if (attackEffectiveness === 0) {
      attackNoEffect.push(referenceType);
    } else if (attackEffectiveness === 0.5) {
      attackNotEffective.push(referenceType);
    } else if (attackEffectiveness === 2) {
      attackSuperEffective.push(referenceType);
    }

    var defenseEffectiveness = data.effectiveness[(referenceTypeIndex * 18) + selectedTypeIndex];
    if (defenseEffectiveness === 0) {
      defenseNoEffect.push(referenceType);
    } else if (defenseEffectiveness === 0.5) {
      defenseNotEffective.push(referenceType);
    } else if (defenseEffectiveness === 2) {
      defenseSuperEffective.push(referenceType);
    }
  });

  pageData.set("attackSuperEffective", attackSuperEffective);
  pageData.set("attackNotEffective", attackNotEffective);
  pageData.set("attackNoEffect", attackNoEffect);
  pageData.set("defenseSuperEffective", defenseSuperEffective);
  pageData.set("defenseNotEffective", defenseNotEffective);
  pageData.set("defenseNoEffect", defenseNoEffect);
};
