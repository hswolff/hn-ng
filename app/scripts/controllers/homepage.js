(function() {
'use strict';

/**
 * @ngInject
 */
function HomepageController($firebase, API) {
  var self = this;

  this.items = [];

  var ref = new Firebase(API.TOP_STORIES);

  // create an AngularFire reference to the data
  var sync = $firebase(ref);

  // download the data into a local object
  sync.$asArray().$loaded().then(function(items) {
    items.forEach(function (item) {
      var ref = new Firebase(API.ITEM + item.$value);
      $firebase(ref).$asObject().$loaded().then(function (item) {
        self.items.push(item);
      });
    });
  });
}

angular.module('hn-ng').controller('HomepageController', HomepageController);
})();