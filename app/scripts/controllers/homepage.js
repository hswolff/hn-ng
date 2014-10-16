'use strict';

class HomepageController {
  constructor(API) {
    this.items = API.fetchHomepage().$asArray();
  }
}
HomepageController.$inject = ['API'];

angular.module('hn-ng').controller('HomepageController', HomepageController);
