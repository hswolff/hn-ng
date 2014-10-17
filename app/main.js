import hnItem from './components/hn-item/';

var dependencies = [
  'ui.router',
  'ngAnimate',
  'firebase',
  'angularMoment'
];

dependencies.push(hnItem);

angular.module('hn-ng', dependencies);

import './services/api.service';
import {state as homepageState} from './homepage';
import {state as itemState} from './item';

angular.module('hn-ng').config(function($stateProvider, $urlRouterProvider) {
  'use strict';

  $urlRouterProvider
    .otherwise('/');

  // Dynamically create all states.
  [homepageState, itemState].forEach((state) => {
    $stateProvider.state.apply($stateProvider, state);
  });
});