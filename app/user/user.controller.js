'use strict';

class UserController {
  constructor($scope, API, $stateParams) {
    this.userId = $stateParams.userId;

    API.fetchUser($stateParams.userId).$asObject().$bindTo($scope, 'user.data');

    this.pageSize = 30;
  }
}
UserController.$inject = ['$scope', 'API', '$stateParams'];

export default function(m) {
  m.controller('UserController', UserController);
}
