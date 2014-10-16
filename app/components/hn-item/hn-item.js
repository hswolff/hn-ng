'use strict';

class hnItem {
  constructor($scope, $element, $attrs, API) {
    $attrs.$addClass('hnItem');

    API.fetchItem(this.itemId).$asObject().$bindTo($scope, 'item.data');
  }
}
hnItem.$inject = ['$scope', '$element', '$attrs', 'API'];

angular.module('hn-ng').directive('hnItem', () => {
  return {
    templateUrl: '/components/hn-item/hn-item.html',
    restrict: 'E',
    scope: {
      itemId: '='
    },
    controller: hnItem,
    controllerAs: 'item',
    bindToController: true
  };
});
