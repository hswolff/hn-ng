'use strict';

class paginateControl {
  constructor($scope) {
    this.page = this.page || 0;

    this.show = {};

    $scope.$watch(() => this.page, this.calculateState.bind(this));
  }

  calculateState() {
    this.currentPage = this.page + 1;

    this.show.prevPage = this.page !== 0;
    this.show.nextPage = this.pageSize * (this.page + 1) < this.totalItems;
  }

  prevPage() {
    this.page = Math.max(this.page - 1, 0);
  }

  nextPage() {
    this.page = this.page + 1;
  }
}
paginateControl.$inject = ['$scope'];

export default function(m) {
  m.directive('paginateControl', () => {
    return {
      templateUrl: '/components/paginate-control/paginate-control.html',
      restrict: 'E',
      scope: {
        page: '=',
        pageSize: '=',
        totalItems: '='
      },
      controller: paginateControl,
      controllerAs: 'paginate',
      bindToController: true
    };
  });
}
