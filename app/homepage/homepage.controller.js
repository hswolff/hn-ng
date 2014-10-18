'use strict';

class HomepageController {
  constructor($scope, API) {
    this.itemIds = API.fetchHomepage().$asArray();

    // Watch for changes on our synchronized array so we can re-sort our array.
    this.itemIds.$watch(() => {
      this.itemIds.sort(sortItems);
    });

    /**
     * Sort items based on their server-side id.
     * @param  {Object} a
     * @param  {Object} b
     * @return {boolean}
     */
    function sortItems(a, b) {
      return parseInt(a.$id, 10) - parseInt(b.$id, 10);
    }

    this.pageSize = 30;
  }
}
HomepageController.$inject = ['$scope', 'API'];

export default function(m) {
  m.controller('HomepageController', HomepageController);
}
