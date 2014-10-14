'use strict';

var PATHS = {};
PATHS.ROOT = 'https://hacker-news.firebaseio.com/v0/';
PATHS.TOP_STORIES = PATHS.ROOT + 'topstories/';
PATHS.ITEM = PATHS.ROOT + 'item/';

class API {
  constructor($firebase) {
    this._$firebase = $firebase;
  }

  fetchHomepage() {
    return this._$firebase(new Firebase(PATHS.TOP_STORIES));
  }

  fetchItem(itemId) {
    return this._$firebase(new Firebase(PATHS.ITEM + itemId));
  }
}
API.$inject = ['$firebase'];

angular.module('hn-ng').service('API', API);
