if (device.desktop()) {
  window.Tapcentive = angular.module('Tapcentive', ['ngSanitize', 'ui.router', 'btford.socket-io', 'tap.controllers', 'tap.directives']);
} else {
  window.Tapcentive = angular.module("Tapcentive", ["ionic", "btford.socket-io", "tap.controllers", 'tap.directives']).run(function($ionicPlatform) {
    return $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  });
}

Tapcentive.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: 'menu.html'
  }).state('app.home', {
    url: '/',
    views: {
      menuContent: {
        controller: 'HomeCtrl',
        templateUrl: 'home.html'
      }
    }
  }).state('app.legal', {
    url: '/legal',
    views: {
      menuContent: {
        controller: 'LegalCtrl',
        templateUrl: 'legal.html'
      }
    }
  }).state('app.docs', {
    url: '/docs',
    views: {
      menuContent: {
        controller: 'DocsCtrl',
        templateUrl: 'docs/index.html'
      }
    }
  }).state('app.company', {
    url: '/company',
    views: {
      menuContent: {
        controller: 'CompanyCtrl',
        templateUrl: 'company.html'
      }
    }
  }).state('app.recycle', {
    url: '/recycle',
    views: {
      menuContent: {
        controller: 'RecycleCtrl',
        templateUrl: 'recycle.html'
      }
    }
  }).state('app.how', {
    url: '/how',
    views: {
      menuContent: {
        controller: 'HowCtrl',
        templateUrl: 'how.html'
      }
    }
  }).state('app.products', {
    url: '/products',
    views: {
      menuContent: {
        controller: 'ProductsCtrl',
        templateUrl: 'products.html'
      }
    }
  }).state('app.technology', {
    url: '/technology',
    views: {
      menuContent: {
        controller: 'TechnologyCtrl',
        templateUrl: 'technology.html'
      }
    }
  }).state('app.cbdextract', {
    url: '/cbd-extract',
    views: {
      menuContent: {
        controller: 'CbdCtrl',
        templateUrl: 'cbd-extract.html'
      }
    }
  }).state('app.news', {
    url: '/news',
    views: {
      menuContent: {
        controller: 'NewsCtrl',
        templateUrl: 'news.html'
      }
    }
  }).state('app.privacy', {
    url: '/privacy',
    views: {
      menuContent: {
        controller: 'PrivacyCtrl',
        templateUrl: 'privacy.html'
      }
    }
  }).state('app.press', {
    url: '/press',
    views: {
      menuContent: {
        controller: 'PressCtrl',
        templateUrl: 'press.html'
      }
    }
  }).state('app.contact', {
    url: '/contact',
    views: {
      menuContent: {
        controller: 'ContactCtrl',
        templateUrl: 'contact.html'
      }
    }
  }).state('app.doc', {
    url: '/docs/:permalink',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  }).state('app.step', {
    url: '/docs/:permalink/:step',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  });
  $urlRouterProvider.otherwise("/");
  return $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        var type;
        if (config.url.match(/\.html$/) && !config.url.match(/^shared\//)) {
          if (device.tablet()) {
            type = 'tablet';
          } else if (device.mobile()) {
            type = 'mobile';
          } else {
            type = 'desktop';
          }
          config.url = "/" + type + "/" + config.url;
        }
        return config;
      }
    };
  });
});

Tapcentive.run(function($state) {
  return $state.go('app.home');
});

Tapcentive.run(function($rootScope, copy) {
  return $rootScope.copy = copy;
});

Tapcentive.factory('Socket', function(socketFactory) {
  return socketFactory();
});

Tapcentive.factory('Docs', function(Socket) {
  var service;
  service = {
    list: [],
    find: function(permalink) {
      return _.find(service.list, function(doc) {
        return doc.permalink === permalink;
      });
    }
  };
  Socket.on('docs', function(docs) {
    return service.list = docs;
  });
  return service;
});

Tapcentive.controller('HomeCtrl', function($scope) {});

Tapcentive.controller('LegalCtrl', function($scope) {});

Tapcentive.controller('CompanyCtrl', function($scope) {});

Tapcentive.controller('AppCtrl', function($scope) {});

Tapcentive.controller('RecycleCtrl', function($scope) {});

Tapcentive.controller('NewsCtrl', function($scope) {});

Tapcentive.controller('CbdCtrl', function($scope) {});

Tapcentive.controller('PressCtrl', function($scope) {});

Tapcentive.controller('PrivacyCtrl', function($scope) {});

Tapcentive.controller('Technology', function($scope) {});

Tapcentive.controller('ContactCtrl', function($scope) {});

Tapcentive.controller('GetStartedCtrl', function($scope) {});

Tapcentive.controller('DevelopersCtrl', function($scope) {});

Tapcentive.controller('DeveloperCenterCtrl', function($scope) {});

Tapcentive.controller('DocsCtrl', function($scope, Docs) {
  return $scope.$watch((function() {
    return Docs.list;
  }), function() {
    return $scope.docs = Docs.list;
  });
});

Tapcentive.controller('DocCtrl', function($scope, $sce, $stateParams, $timeout, Docs) {
  $scope.index = $stateParams.step ? $stateParams.step - 1 : 0;
  $scope.$watch((function() {
    return Docs.list;
  }), function() {
    $scope.doc = Docs.find($stateParams.permalink);
    if ($scope.doc) {
      $scope.step = $scope.doc.steps[$scope.index];
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url);
      if ($scope.step.type === 'dialog') {
        $scope.messageIndex = 0;
        $scope.messages = [];
        return $timeout($scope.nextMessage, 1000);
      }
    }
  });
  return $scope.hasMoreSteps = function() {
    if ($scope.step) {
      return $scope.step.index < $scope.doc.steps.length;
    }
  };
});

angular.module("tap.controllers", []);

angular.module("tap.directives", []).directive("device", function() {
  return {
    restrict: "A",
    link: function() {
      return device.init();
    }
  };
}).directive("snapscroll", function() {
  return {
    restrict: "A",
    link: function() {
      return device.init();
    }
  };
}).service('copy', function($sce) {
  var copy, trustValues;
  copy = {
    about: {
      heading: "We manufacture the most advanced CBD vapor product available",
      sub_heading: "Manufactured in the United States, the Digital Vaporizor by CBD Technologies is the first to employ state-of-the-art mechanical design.",
      copy: "<p>At CBD Technologies, we focus on the intersection of the highest quality, hand-crafted extract products and the best possible delivery technologies to ensure the experience for our customers is second-to-none.  <br /><br />By utilizing advanced, USA-manufactured vaporizer products, the highest quality CBD-rich Hempstalk oil extracts, and blending all of our e-liquids in a certified GMP facility without the use of Propylene Glycol or other chemicals, the Alcura line of products are not only innovative and effective, but are the safest CBD-rich Hempstalk products available.  We back up every batch of our proprietary e-liquid blends will full testing profiles and maintain the strictest quality control for both our technologies and extracts, guaranteeing a consistent experience every time.  By infusing our e-liquids with just a hint of our all-natural, organic essential oil blends, the entire Alcura product line not only delivers the benefits of CBD-rich Hempstalk extract, but a range of products to fit our customers lifestyles.  <br /><br />From our calming Night lend to our energizing Day blend, the entire Alcura line is designed to delivery maximum care, flavor, and effectiveness. </p>"
    },
    team: {
      heading: "",
      bios: {
        dave_role: "",
        dave_copy: ""
      }
    }
  };
  trustValues = function(values) {
    return _.each(values, function(val, key) {
      switch (typeof val) {
        case 'string':
          return $sce.trustAsHtml(val);
        case 'object':
          return trustValues(val);
      }
    });
  };
  trustValues(copy);
  return copy;
});

var $, cssId, head, link;

if (device.desktop()) {

} else if (device.mobile()) {
  $ = document;
  cssId = 'myCss';
  if (!$.getElementById(cssId)) {
    head = $.getElementsByTagName('head')[0];
    link = $.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/css/ionic.css';
    link.media = 'all';
    head.appendChild(link);
  }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQ0UsRUFBQSxNQUFNLENBQUMsVUFBUCxHQUFvQixPQUFPLENBQUMsTUFBUixDQUFlLFlBQWYsRUFBNkIsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QixrQkFBNUIsRUFBZ0QsaUJBQWhELEVBQW1FLGdCQUFuRSxDQUE3QixDQUFwQixDQURGO0NBQUEsTUFBQTtBQUlFLEVBQUEsTUFBTSxDQUFDLFVBQVAsR0FBb0IsT0FBTyxDQUFDLE1BQVIsQ0FBZSxZQUFmLEVBQTZCLENBQUUsT0FBRixFQUFXLGtCQUFYLEVBQStCLGlCQUEvQixFQUFrRCxnQkFBbEQsQ0FBN0IsQ0FDbEIsQ0FBQyxHQURpQixDQUNiLFNBQUMsY0FBRCxHQUFBO1dBQ0gsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBNEIsTUFBTSxDQUFDLFNBQW5DO2VBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBQSxFQUFBO09BRG1CO0lBQUEsQ0FBckIsRUFERztFQUFBLENBRGEsQ0FBcEIsQ0FKRjtDQUFBOztBQUFBLFVBU1UsQ0FBQyxNQUFYLENBQWtCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDaEIsRUFBQSxjQUNFLENBQUMsS0FESCxDQUNTLEtBRFQsRUFFSTtBQUFBLElBQUEsR0FBQSxFQUFLLEVBQUw7QUFBQSxJQUNBLFFBQUEsRUFBVSxJQURWO0FBQUEsSUFFQSxVQUFBLEVBQVksU0FGWjtBQUFBLElBR0EsV0FBQSxFQUFhLFdBSGI7R0FGSixDQU9FLENBQUMsS0FQSCxDQU9TLFVBUFQsRUFRSTtBQUFBLElBQUEsR0FBQSxFQUFLLEdBQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtB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QSxJQUFHLENBQUEsQ0FBRSxDQUFDLGNBQUYsQ0FBaUIsS0FBakIsQ0FBSjtBQUNJLElBQUEsSUFBQSxHQUFRLENBQUMsQ0FBQyxvQkFBRixDQUF1QixNQUF2QixDQUErQixDQUFBLENBQUEsQ0FBdkMsQ0FBQTtBQUFBLElBQ0EsSUFBQSxHQUFRLENBQUMsQ0FBQyxhQUFGLENBQWdCLE1BQWhCLENBRFIsQ0FBQTtBQUFBLElBRUEsSUFBSSxDQUFDLEVBQUwsR0FBWSxLQUZaLENBQUE7QUFBQSxJQUdBLElBQUksQ0FBQyxHQUFMLEdBQVksWUFIWixDQUFBO0FBQUEsSUFJQSxJQUFJLENBQUMsSUFBTCxHQUFZLFVBSlosQ0FBQTtBQUFBLElBS0EsSUFBSSxDQUFDLElBQUwsR0FBWSxnQkFMWixDQUFBO0FBQUEsSUFNQSxJQUFJLENBQUMsS0FBTCxHQUFhLEtBTmIsQ0FBQTtBQUFBLElBT0EsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsQ0FQQSxDQURKO0dBSkk7Q0FGTCIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIGRldmljZS5kZXNrdG9wKClcbiAgd2luZG93LlRhcGNlbnRpdmUgPSBhbmd1bGFyLm1vZHVsZSgnVGFwY2VudGl2ZScsIFsnbmdTYW5pdGl6ZScsICd1aS5yb3V0ZXInLCAnYnRmb3JkLnNvY2tldC1pbycsICd0YXAuY29udHJvbGxlcnMnLCAndGFwLmRpcmVjdGl2ZXMnXSlcblxuZWxzZVxuICB3aW5kb3cuVGFwY2VudGl2ZSA9IGFuZ3VsYXIubW9kdWxlKFwiVGFwY2VudGl2ZVwiLCBbIFwiaW9uaWNcIiwgXCJidGZvcmQuc29ja2V0LWlvXCIsIFwidGFwLmNvbnRyb2xsZXJzXCIsICd0YXAuZGlyZWN0aXZlcyddKVxuICAgIC5ydW4gKCRpb25pY1BsYXRmb3JtKSAtPlxuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkgLT5cbiAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpIGlmIHdpbmRvdy5TdGF0dXNCYXJcblxuVGFwY2VudGl2ZS5jb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSAtPlxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSAnYXBwJyxcbiAgICAgIHVybDogJydcbiAgICAgIGFic3RyYWN0OiB0cnVlXG4gICAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuaG9tZScsXG4gICAgICB1cmw6ICcvJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmxlZ2FsJyxcbiAgICAgIHVybDogJy9sZWdhbCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnTGVnYWxDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbGVnYWwuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmRvY3MnLFxuICAgICAgdXJsOiAnL2RvY3MnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0RvY3NDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9pbmRleC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuY29tcGFueScsXG4gICAgICB1cmw6ICcvY29tcGFueSdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ29tcGFueUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdjb21wYW55Lmh0bWwnXG4gICAgLnN0YXRlICdhcHAucmVjeWNsZScsXG4gICAgICB1cmw6ICcvcmVjeWNsZSdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVjeWNsZUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZWN5Y2xlLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5ob3cnLFxuICAgICAgdXJsOiAnL2hvdydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSG93Q3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvdy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAucHJvZHVjdHMnLFxuICAgICAgdXJsOiAnL3Byb2R1Y3RzJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0c0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcm9kdWN0cy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAudGVjaG5vbG9neScsXG4gICAgICB1cmw6ICcvdGVjaG5vbG9neSdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnVGVjaG5vbG9neUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZWNobm9sb2d5Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5jYmRleHRyYWN0JyxcbiAgICAgIHVybDogJy9jYmQtZXh0cmFjdCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ2JkQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NiZC1leHRyYWN0Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5uZXdzJyxcbiAgICAgIHVybDogJy9uZXdzJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdzQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ25ld3MuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLnByaXZhY3knLFxuICAgICAgdXJsOiAnL3ByaXZhY3knXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ1ByaXZhY3lDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncHJpdmFjeS5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAucHJlc3MnLFxuICAgICAgdXJsOiAnL3ByZXNzJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcmVzc0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwcmVzcy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuY29udGFjdCcsXG4gICAgICB1cmw6ICcvY29udGFjdCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5kb2MnLFxuICAgICAgdXJsOiAnL2RvY3MvOnBlcm1hbGluaydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnRG9jQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2RvY3Mvc2hvdy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuc3RlcCcsXG4gICAgICB1cmw6ICcvZG9jcy86cGVybWFsaW5rLzpzdGVwJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdEb2NDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9zaG93Lmh0bWwnXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlIFwiL1wiXG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoIC0+XG4gICAgICAgcmVxdWVzdDogKGNvbmZpZykgLT5cbiAgICAgICAgIGlmIGNvbmZpZy51cmwubWF0Y2goL1xcLmh0bWwkLykgJiYgIWNvbmZpZy51cmwubWF0Y2goL15zaGFyZWRcXC8vKVxuICAgICAgICAgICBpZiBkZXZpY2UudGFibGV0KClcbiAgICAgICAgICAgICB0eXBlID0gJ3RhYmxldCdcbiAgICAgICAgICAgZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcbiAgICAgICAgICAgICB0eXBlID0gJ21vYmlsZSdcbiAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgIHR5cGUgPSAnZGVza3RvcCdcblxuICAgICAgICAgICBjb25maWcudXJsID0gXCIvI3t0eXBlfS8je2NvbmZpZy51cmx9XCJcblxuICAgICAgICAgY29uZmlnXG5cblRhcGNlbnRpdmUucnVuICgkc3RhdGUpIC0+XG4gICRzdGF0ZS5nbygnYXBwLmhvbWUnKVxuXG5UYXBjZW50aXZlLnJ1biAoJHJvb3RTY29wZSwgY29weSkgLT5cbiAgJHJvb3RTY29wZS5jb3B5ID0gY29weVxuXG5UYXBjZW50aXZlLmZhY3RvcnkgJ1NvY2tldCcsIChzb2NrZXRGYWN0b3J5KSAtPlxuICBzb2NrZXRGYWN0b3J5KClcblxuVGFwY2VudGl2ZS5mYWN0b3J5ICdEb2NzJywgKFNvY2tldCkgLT5cbiAgc2VydmljZSA9XG4gICAgbGlzdDogW11cbiAgICBmaW5kOiAocGVybWFsaW5rKSAtPlxuICAgICAgXy5maW5kIHNlcnZpY2UubGlzdCwgKGRvYykgLT5cbiAgICAgICAgZG9jLnBlcm1hbGluayA9PSBwZXJtYWxpbmtcblxuICBTb2NrZXQub24gJ2RvY3MnLCAoZG9jcykgLT5cbiAgICBzZXJ2aWNlLmxpc3QgPSBkb2NzXG5cbiAgc2VydmljZVxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0hvbWVDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdMZWdhbEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0NvbXBhbnlDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdBcHBDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdSZWN5Y2xlQ3RybCcsICgkc2NvcGUpIC0+XG5cblRhcGNlbnRpdmUuY29udHJvbGxlciAnTmV3c0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0NiZEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1ByZXNzQ3RybCcsICgkc2NvcGUpIC0+XG5cblRhcGNlbnRpdmUuY29udHJvbGxlciAnUHJpdmFjeUN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1RlY2hub2xvZ3knLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0NvbnRhY3RDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdHZXRTdGFydGVkQ3RybCcsICgkc2NvcGUpIC0+XG5cblRhcGNlbnRpdmUuY29udHJvbGxlciAnRGV2ZWxvcGVyc0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0RldmVsb3BlckNlbnRlckN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0RvY3NDdHJsJywgKCRzY29wZSwgRG9jcykgLT5cbiAgJHNjb3BlLiR3YXRjaCAoLT4gRG9jcy5saXN0KSwgLT5cbiAgICAkc2NvcGUuZG9jcyA9IERvY3MubGlzdFxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0RvY0N0cmwnLCAoJHNjb3BlLCAkc2NlLCAkc3RhdGVQYXJhbXMsICR0aW1lb3V0LCBEb2NzKSAtPlxuICAkc2NvcGUuaW5kZXggPSBpZiAkc3RhdGVQYXJhbXMuc3RlcCB0aGVuICRzdGF0ZVBhcmFtcy5zdGVwLTEgZWxzZSAwXG5cbiAgJHNjb3BlLiR3YXRjaCAoLT4gRG9jcy5saXN0KSwgLT5cbiAgICAkc2NvcGUuZG9jID0gRG9jcy5maW5kKCRzdGF0ZVBhcmFtcy5wZXJtYWxpbmspXG4gICAgaWYgJHNjb3BlLmRvY1xuICAgICAgJHNjb3BlLnN0ZXAgPSAkc2NvcGUuZG9jLnN0ZXBzWyRzY29wZS5pbmRleF1cbiAgICAgICRzY29wZS5zdGVwLnVybCA9ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKCRzY29wZS5zdGVwLnVybClcblxuICAgICAgaWYgJHNjb3BlLnN0ZXAudHlwZSA9PSAnZGlhbG9nJ1xuICAgICAgICAkc2NvcGUubWVzc2FnZUluZGV4ID0gMFxuICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSBbXVxuICAgICAgICAkdGltZW91dCgkc2NvcGUubmV4dE1lc3NhZ2UsIDEwMDApXG5cbiAgJHNjb3BlLmhhc01vcmVTdGVwcyA9IC0+XG4gICAgaWYgJHNjb3BlLnN0ZXBcbiAgICAgICRzY29wZS5zdGVwLmluZGV4IDwgJHNjb3BlLmRvYy5zdGVwcy5sZW5ndGhcbiIsIlxuIyBub3Qgc3VyZSBpZiB0aGVzZSBhcmUgYWN0dWFsbHkgaW5qZWN0aW5nIGludG8gdGhlIGFwcCBtb2R1bGUgcHJvcGVybHlcbmFuZ3VsYXIubW9kdWxlKFwidGFwLmNvbnRyb2xsZXJzXCIsIFtdKVxuXG4jIG1vdmUgY29udHJvbGxlcnMgaGVyZVxuXG5cblxuXG4iLCJhbmd1bGFyLm1vZHVsZShcInRhcC5kaXJlY3RpdmVzXCIsIFtdKVxuICAuZGlyZWN0aXZlIFwiZGV2aWNlXCIsIC0+XG4gICAgcmVzdHJpY3Q6IFwiQVwiXG4gICAgbGluazogLT5cbiAgICAgIGRldmljZS5pbml0KClcblxuICAuZGlyZWN0aXZlIFwic25hcHNjcm9sbFwiLCAtPlxuICAgIHJlc3RyaWN0OiBcIkFcIlxuICAgIGxpbms6IC0+XG4gICAgICBkZXZpY2UuaW5pdCgpXG5cbiAgLnNlcnZpY2UgJ2NvcHknLCAoJHNjZSkgLT5cbiAgICBjb3B5ID1cbiAgICAgIGFib3V0OlxuICAgICAgICBoZWFkaW5nOiBcIldlIG1hbnVmYWN0dXJlIHRoZSBtb3N0IGFkdmFuY2VkIENCRCB2YXBvciBwcm9kdWN0IGF2YWlsYWJsZVwiXG4gICAgICAgIHN1Yl9oZWFkaW5nOiBcIk1hbnVmYWN0dXJlZCBpbiB0aGUgVW5pdGVkIFN0YXRlcywgdGhlIERpZ2l0YWwgVmFwb3Jpem9yIGJ5IENCRCBUZWNobm9sb2dpZXMgaXMgdGhlIGZpcnN0IHRvIGVtcGxveSBzdGF0ZS1vZi10aGUtYXJ0IG1lY2hhbmljYWwgZGVzaWduLlwiXG4gICAgICAgIGNvcHk6IFwiPHA+QXQgQ0JEIFRlY2hub2xvZ2llcywgd2UgZm9jdXMgb24gdGhlIGludGVyc2VjdGlvbiBvZiB0aGUgaGlnaGVzdCBxdWFsaXR5LCBoYW5kLWNyYWZ0ZWQgZXh0cmFjdCBwcm9kdWN0cyBhbmQgdGhlIGJlc3QgcG9zc2libGUgZGVsaXZlcnkgdGVjaG5vbG9naWVzIHRvIGVuc3VyZSB0aGUgZXhwZXJpZW5jZSBmb3Igb3VyIGN1c3RvbWVycyBpcyBzZWNvbmQtdG8tbm9uZS4gIDxiciAvPjxiciAvPkJ5IHV0aWxpemluZyBhZHZhbmNlZCwgVVNBLW1hbnVmYWN0dXJlZCB2YXBvcml6ZXIgcHJvZHVjdHMsIHRoZSBoaWdoZXN0IHF1YWxpdHkgQ0JELXJpY2ggSGVtcHN0YWxrIG9pbCBleHRyYWN0cywgYW5kIGJsZW5kaW5nIGFsbCBvZiBvdXIgZS1saXF1aWRzIGluIGEgY2VydGlmaWVkIEdNUCBmYWNpbGl0eSB3aXRob3V0IHRoZSB1c2Ugb2YgUHJvcHlsZW5lIEdseWNvbCBvciBvdGhlciBjaGVtaWNhbHMsIHRoZSBBbGN1cmEgbGluZSBvZiBwcm9kdWN0cyBhcmUgbm90IG9ubHkgaW5ub3ZhdGl2ZSBhbmQgZWZmZWN0aXZlLCBidXQgYXJlIHRoZSBzYWZlc3QgQ0JELXJpY2ggSGVtcHN0YWxrIHByb2R1Y3RzIGF2YWlsYWJsZS4gIFdlIGJhY2sgdXAgZXZlcnkgYmF0Y2ggb2Ygb3VyIHByb3ByaWV0YXJ5IGUtbGlxdWlkIGJsZW5kcyB3aWxsIGZ1bGwgdGVzdGluZyBwcm9maWxlcyBhbmQgbWFpbnRhaW4gdGhlIHN0cmljdGVzdCBxdWFsaXR5IGNvbnRyb2wgZm9yIGJvdGggb3VyIHRlY2hub2xvZ2llcyBhbmQgZXh0cmFjdHMsIGd1YXJhbnRlZWluZyBhIGNvbnNpc3RlbnQgZXhwZXJpZW5jZSBldmVyeSB0aW1lLiAgQnkgaW5mdXNpbmcgb3VyIGUtbGlxdWlkcyB3aXRoIGp1c3QgYSBoaW50IG9mIG91ciBhbGwtbmF0dXJhbCwgb3JnYW5pYyBlc3NlbnRpYWwgb2lsIGJsZW5kcywgdGhlIGVudGlyZSBBbGN1cmEgcHJvZHVjdCBsaW5lIG5vdCBvbmx5IGRlbGl2ZXJzIHRoZSBiZW5lZml0cyBvZiBDQkQtcmljaCBIZW1wc3RhbGsgZXh0cmFjdCwgYnV0IGEgcmFuZ2Ugb2YgcHJvZHVjdHMgdG8gZml0IG91ciBjdXN0b21lcnMgbGlmZXN0eWxlcy4gIDxiciAvPjxiciAvPkZyb20gb3VyIGNhbG1pbmcgTmlnaHQgbGVuZCB0byBvdXIgZW5lcmdpemluZyBEYXkgYmxlbmQsIHRoZSBlbnRpcmUgQWxjdXJhIGxpbmUgaXMgZGVzaWduZWQgdG8gZGVsaXZlcnkgbWF4aW11bSBjYXJlLCBmbGF2b3IsIGFuZCBlZmZlY3RpdmVuZXNzLiA8L3A+XCJcbiAgICAgIHRlYW06XG4gICAgICAgIGhlYWRpbmc6IFwiXCJcbiAgICAgICAgYmlvczpcbiAgICAgICAgICBkYXZlX3JvbGU6IFwiXCJcbiAgICAgICAgICBkYXZlX2NvcHk6IFwiXCJcbiAgICBcblxuXG4gICAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgICAgXy5lYWNoIHZhbHVlcywgKHZhbCwga2V5KSAtPlxuICAgICAgICBzd2l0Y2ggdHlwZW9mKHZhbClcbiAgICAgICAgICB3aGVuICdzdHJpbmcnXG4gICAgICAgICAgICAkc2NlLnRydXN0QXNIdG1sKHZhbClcbiAgICAgICAgICB3aGVuICdvYmplY3QnXG4gICAgICAgICAgICB0cnVzdFZhbHVlcyh2YWwpXG5cbiAgICB0cnVzdFZhbHVlcyhjb3B5KVxuXG4gICAgY29weVxuIiwiaWYgZGV2aWNlLmRlc2t0b3AoKVxuXG5lbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuXG5cdCQgPSBkb2N1bWVudCAjIHNob3J0Y3V0XG5cdGNzc0lkID0gJ215Q3NzJyAjIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG5cdGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuXHQgICAgaGVhZCAgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cblx0ICAgIGxpbmsgID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblx0ICAgIGxpbmsuaWQgICA9IGNzc0lkXG5cdCAgICBsaW5rLnJlbCAgPSAnc3R5bGVzaGVldCdcblx0ICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcydcblx0ICAgIGxpbmsuaHJlZiA9ICcvY3NzL2lvbmljLmNzcydcblx0ICAgIGxpbmsubWVkaWEgPSAnYWxsJ1xuXHQgICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9