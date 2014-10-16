angular.module('hn-ng', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'angularMoment'
]);

import './routes';
import './filters/domain';
import './services/api';
import './controllers/homepage';
import './controllers/item';
import '../components/hn-item/hn-item';
