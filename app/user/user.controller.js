'use strict';

class UserController {
  constructor($scope, API, $stateParams) {
    this.userId = $stateParams.userId;

    API.fetchUser($stateParams.userId).$asObject().$bindTo($scope, 'user.data');

    this.currentPage = 0;
  }

  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 0);
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }
}
UserController.$inject = ['$scope', 'API', '$stateParams'];

export default function(m) {
  m.controller('UserController', UserController);
}
