'use strict';

import homepageController from './homepage.controller';

export default function(m) {
  homepageController(m);

  m.config(($stateProvider) => {
    $stateProvider.state('homepage', {
      url: '/',
      controller: 'HomepageController',
      controllerAs: 'home',
      templateUrl: '/homepage/homepage.html'
    });
  });
}
