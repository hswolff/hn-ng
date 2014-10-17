'use strict';

var m = angular.module('hnItem', []);
export default 'hnItem';

import filter from './domain.filter';
m.filter.apply(m, filter);

import directive from './hn-item.directive';
m.directive.apply(m, directive);
