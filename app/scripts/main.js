angular.module('hn-ng', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'angularMoment'
]);

import './filters/domain';
import './services/api';
import './controllers/homepage';
