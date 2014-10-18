'use strict';
import domainFilter from './domain.filter';
import pageFilter from './page.filter';
import directive from './hn-item.directive';

var moduleName = 'hnItem';
var m = angular.module(moduleName, []);

domainFilter(m);
pageFilter(m);
directive(m);

export default moduleName;
