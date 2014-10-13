angular.module('hn-ng', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'angularMoment'
]);

import {domain} from './filters/domain';
import {api} from './services/api';
import {homepage} from './controllers/homepage';
