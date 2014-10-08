(function() {
'use strict';

/**
 * @ngInject
 */
function HomepageController($scope) {
  this.name = 'bob';
  $scope.bob = 'cool';
}

angular.module('hn-ng').controller('HomepageController', HomepageController);
})();