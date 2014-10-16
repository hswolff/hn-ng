'use strict';

var connection = new Firebase('https://hacker-news.firebaseio.com/v0/');

class API {
  constructor($firebase) {
    this._$firebase = $firebase;
  }

  fetchHomepage() {
    return this._$firebase(connection.child('topstories/'));
  }

  fetchItem(itemId) {
    return this._$firebase(connection.child('item/' + itemId));
  }
}
API.$inject = ['$firebase'];

angular.module('hn-ng').service('API', API);
