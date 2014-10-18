'use strict';
import filter from './domain.filter';
import directive from './hn-item.directive';

var m = angular.module('hnItem', []);

filter(m);
directive(m);

export default 'hnItem';
