'use strict';

class hnItem {
  constructor($scope, $element, $attrs, API) {
    $attrs.$addClass('hnItem');

    $attrs.$observe('loadChildren', val => {
      this.loadChildren = val !== 'false';
    });

    var firebasePromise;

    // Watch for changes and update our synched item.
    $scope.$watch(() => this.itemId, () => {
      // If we already have a firebase connection destroy it
      // so we can re-bind it.
      if (firebasePromise) {
        firebasePromise.$destroy();
      }
      firebasePromise = API.fetchItem(this.itemId).$asObject();
      firebasePromise.$bindTo($scope, 'item.data');
    });
  }
}
hnItem.$inject = ['$scope', '$element', '$attrs', 'API'];

export default function(m) {
  m.directive('hnItem', () => {
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
}
