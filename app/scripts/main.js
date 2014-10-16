angular.module('hn-ng', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'angularMoment'
]);

angular.module('hn-ng').config(function($locationProvider) {
  'use strict';
  $locationProvider.html5Mode(true);
});

import './routes';
import './filters/domain';
import './services/api';
import './controllers/homepage';
import '../components/hn-item/hn-item';