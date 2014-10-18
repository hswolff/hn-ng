'use strict';

class ItemController {
  constructor($scope, API, $stateParams) {
    this.itemId = $stateParams.itemId;

    API.fetchItem($stateParams.itemId).$asObject().$bindTo($scope, 'item.data');
  }
}
ItemController.$inject = ['$scope', 'API', '$stateParams'];

export default function(m) {
  m.controller('ItemController', ItemController);
}
