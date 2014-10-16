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
    })
    .state('item', {
      url: '/item/:itemId',
      controller: 'ItemController',
      controllerAs: 'item',
      templateUrl: '/views/item.html'
    });
});