'use strict';

import './item.controller';

export var state = ['item', {
  url: '/item/:itemId',
  controller: 'ItemController',
  controllerAs: 'item',
  templateUrl: '/item/item.html'
}];