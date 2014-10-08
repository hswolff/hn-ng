(function() {
'use strict';

var API = {};

API.ROOT = 'https://hacker-news.firebaseio.com/v0/';

API.TOP_STORIES = API.ROOT + 'topstories/';

API.ITEM = API.ROOT + 'item/';

angular.module('hn-ng').factory('API', function() {
  return API;
});
})();