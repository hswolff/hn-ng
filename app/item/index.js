'use strict';

import itemController from './item.controller';

export default function(m) {
  itemController(m);

  m.config(($stateProvider) => {
    $stateProvider.state('item', {
      url: '/item/:itemId',
      controller: 'ItemController',
      controllerAs: 'item',
      templateUrl: '/item/item.html'
    });
  });
}
