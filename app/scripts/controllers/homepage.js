'use strict';

class HomepageController {
  constructor($firebase, API) {
    this.items = API.fetchHomepage().$asArray();
  }
}
HomepageController.$inject = ['$firebase', 'API'];

angular.module('hn-ng').controller('HomepageController', HomepageController);
