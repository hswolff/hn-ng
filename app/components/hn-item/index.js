'use strict';
import domainFilter from './domain.filter';
import directive from './hn-item.directive';

var moduleName = 'hnItem';
var m = angular.module(moduleName, []);

domainFilter(m);
directive(m);

export default moduleName;
