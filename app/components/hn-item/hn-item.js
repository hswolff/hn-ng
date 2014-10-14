'use strict';

class hnItem {
  constructor($scope, $element, $attrs, API) {
    $attrs.$addClass('hnItem');

    API.fetchItem(this.item.$value).$asObject().$bindTo($scope, 'itemData');
  }
}
hnItem.$inject = ['$scope', '$element', '$attrs', 'API'];

angular.module('hn-ng').directive('hnItem', () => {
  return {
    templateUrl: '/components/hn-item/hn-item.html',
    restrict: 'E',
    scope: {
      item: '='
    },
    controller: hnItem,
    controllerAs: 'item',
    bindToController: true
  };
});
