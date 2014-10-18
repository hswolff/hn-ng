'use strict';
import filter from './domain.filter';
import directive from './hn-item.directive';

var moduleName = 'hnItem';
var m = angular.module(moduleName, []);

filter(m);
directive(m);

export default moduleName;
