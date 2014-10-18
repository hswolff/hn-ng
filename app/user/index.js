'use strict';

import userController from './user.controller';

export default function(m) {
  userController(m);

  m.config(($stateProvider) => {
    $stateProvider.state('user', {
      url: '/user/:userId',
      controller: 'UserController',
      controllerAs: 'user',
      templateUrl: '/user/user.html'
    });
  });
}
