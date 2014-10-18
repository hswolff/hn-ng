import hnItemModuleName from './components/hn-item/';

import apiService from './services/api.service';

import homepage from './homepage';
import item from './item';

var m = angular.module('hn-ng', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'angularMoment',
  hnItemModuleName
]);

m.config($urlRouterProvider => {
  'use strict';
  $urlRouterProvider.otherwise('/');
});

// Services
apiService(m);

// Views
homepage(m);
item(m);
