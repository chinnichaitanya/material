angular
  .module('material.components.chips')
  .directive('mdChipTransclude', MdChipTransclude);

function MdChipTransclude($compile) {
  return {
    restrict: 'EA',
    terminal: true,
    link: link,
    scope: false,
    require: '^mdChips'
  };
  function link(scope, element, attr, ctrl) {
    ctrl.chipTransclude = function() {
      console.log(' *** firing transclude start: ', ctrl, scope, ctrl.$scope, ctrl.parent, scope.$parent);
      var newScope = scope.$parent.$new(false, scope.$parent);

      newScope.$$replacedScope = scope;
      newScope.$chip = scope.$chip;
      newScope.$mdChipsCtrl = ctrl;

      var newHtml = scope.$eval(attr.mdChipTransclude);
      console.log(' *** firing transclude: ', attr.mdChipTransclude, newHtml);

      element.html(newHtml);
      $compile(element.contents())(newScope);
    };
  }
}
