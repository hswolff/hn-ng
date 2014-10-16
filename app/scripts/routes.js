angular.module('hn-ng').config(function($stateProvider, $urlRouterProvider) {
  'use strict';

  $urlRouterProvider
    .otherwise('/');

  $stateProvider
    .state('homepage', {
      url: '/',
      controller: 'HomepageController',
      controllerAs: 'home',
      templateUrl: '/views/main.html'
    });
});