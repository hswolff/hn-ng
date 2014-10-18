export default function(m) {
  'use strict';

  m.filter('page', function() {
    return function(input, page, pageSize) {
      var start = Math.max(page * pageSize, 0);
      return input.slice(start, start + pageSize);
    };
  });
}
