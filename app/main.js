import hnItemModuleName from './components/hn-item/';
import paginateControlName from './components/paginate-control/';

import apiService from './services/api.service';

import homepage from './homepage';
import item from './item';
import user from './user';

var m = angular.module('hn-ng', [
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'firebase',
  'angularMoment',
  hnItemModuleName,
  paginateControlName
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
user(m);
