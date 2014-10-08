(function() {
'use strict';


function HomepageController() {
  this.name = 'bob';
}

angular.module('hn-ng').controller('HomepageController', HomepageController);
})();