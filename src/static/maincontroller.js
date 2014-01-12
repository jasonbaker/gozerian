var ngblog = {};

(function() {
  var mod = angular.module('ngblog.index', ['ngRoute']);

  mod.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/posts/:postId', {
      controller: PostCtrl,
      template: '<div ng-include="currentPage"></div>'
    })
  })

  function PostCtrl($scope, $routeParams) {
    var template = '/post-templates/' + $routeParams.postId + '.ng';
    $scope.currentPage = template;
  }

  mod.directive('ngblogLink', ['$rootScope', '$location', function($rootScope, $location) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        post: '@postId',
        activePost: '='
      },
      template: '<li class="menu-li"><a ng-href="/posts/{{post}}" ng-transclude></a></li>',
      transclude: true
    };
  }]);

  mod.directive('ngblogList', function() {
    return {
      replace: true,
      restrict: 'E',
      template: '<ul ng-transclude></ul>',
      transclude: true
    }
  })
})();