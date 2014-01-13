var ngblog = {};

(function() {
  var mod = angular.module('ngblog.index', ['ngRoute']);

  mod.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/posts/:postId', {
      controller: PostCtrl,
      template: '<div ng-include="currentPage"></div>'
    });

    $routeProvider.when('/', {
      templateUrl: '/post-templates/home.ng'
    })
  })

  function PostCtrl($scope, $routeParams) {
    var template = '/post-templates/' + $routeParams.postId + '.ng';
    $scope.currentPage = template;
  }

  mod.directive('ngblogLink', function($location) {
    return {
      replace: true,
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.postUrl = "/posts/" + scope.post;
        function changeClass() {
          if ($location.path() === scope.postUrl) {
            element.addClass('active-item');
          } else {
            element.removeClass('active-item');
          }
        } 
        changeClass($location.path());
        scope.$on('$locationChangeSuccess', function(e, newUrl) {
          changeClass(newUrl);
        });
      },
      scope: {
        post: '@postId',
        activePost: '='
      },
      template: '<li class="menu-li"><a ng-href="{{postUrl}}" ng-transclude></a></li>',
      transclude: true
    };
  });

  mod.directive('ngblogList', function() {
    return {
      replace: true,
      restrict: 'E',
      template: '<ul class="postlist" ng-transclude></ul>',
      transclude: true
    }
  });

  mod.directive('ngblogSideNav', function() {
    return {
      templateUrl: '/static/'
    }
  });
})();