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

  fetchUser(userId) {
    return this._$firebase(connection.child('user/' + userId));
  }
}
API.$inject = ['$firebase'];

export default function(m) {
  m.service('API', API);
}

