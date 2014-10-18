'use strict';
import pageFilter from './page.filter';
import directive from './paginate-control.directive';

var moduleName = 'paginateControl';
var m = angular.module(moduleName, []);

pageFilter(m);
directive(m);

export default moduleName;
