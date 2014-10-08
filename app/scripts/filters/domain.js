angular.module('hn-ng').filter('domain', function() {
  'use strict';

  return function(input) {
    return input.split('/')[2];
  };
});
