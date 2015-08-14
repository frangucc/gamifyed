if device.desktop()
  window.Tapcentive = angular.module('Tapcentive', ['ngSanitize', 'ui.router', 'btford.socket-io', 'tap.controllers', 'tap.directives'])

else
  window.Tapcentive = angular.module("Tapcentive", [ "ionic", "btford.socket-io", "tap.controllers", 'tap.directives'])
    .run ($ionicPlatform) ->
      $ionicPlatform.ready ->
        StatusBar.styleDefault() if window.StatusBar

Tapcentive.config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) ->
  $stateProvider
    .state 'app',
      url: ''
      abstract: true
      controller: 'AppCtrl'
      templateUrl: 'menu.html'

    .state 'app.home',
      url: '/'
      views:
        menuContent:
          controller: 'HomeCtrl'
          templateUrl: 'home.html'

    .state 'app.legal',
      url: '/legal'
      views:
        menuContent:
          controller: 'LegalCtrl'
          templateUrl: 'legal.html'

    .state 'app.docs',
      url: '/docs'
      views:
        menuContent:
          controller: 'DocsCtrl'
          templateUrl: 'docs/index.html'

    .state 'app.company',
      url: '/company'
      views:
        menuContent:
          controller: 'CompanyCtrl'
          templateUrl: 'company.html'
    .state 'app.recycle',
      url: '/recycle'
      views:
        menuContent:
          controller: 'RecycleCtrl'
          templateUrl: 'recycle.html'

    .state 'app.how',
      url: '/how'
      views:
        menuContent:
          controller: 'HowCtrl'
          templateUrl: 'how.html'

    .state 'app.products',
      url: '/products'
      views:
        menuContent:
          controller: 'ProductsCtrl'
          templateUrl: 'products.html'

    .state 'app.technology',
      url: '/technology'
      views:
        menuContent:
          controller: 'TechnologyCtrl'
          templateUrl: 'technology.html'

    .state 'app.cbdextract',
      url: '/cbd-extract'
      views:
        menuContent:
          controller: 'CbdCtrl'
          templateUrl: 'cbd-extract.html'

    .state 'app.news',
      url: '/news'
      views:
        menuContent:
          controller: 'NewsCtrl'
          templateUrl: 'news.html'

    .state 'app.privacy',
      url: '/privacy'
      views:
        menuContent:
          controller: 'PrivacyCtrl'
          templateUrl: 'privacy.html'

    .state 'app.press',
      url: '/press'
      views:
        menuContent:
          controller: 'PressCtrl'
          templateUrl: 'press.html'

    .state 'app.contact',
      url: '/contact'
      views:
        menuContent:
          controller: 'ContactCtrl'
          templateUrl: 'contact.html'

    .state 'app.doc',
      url: '/docs/:permalink'
      views:
        menuContent:
          controller: 'DocCtrl'
          templateUrl: 'docs/show.html'

    .state 'app.step',
      url: '/docs/:permalink/:step'
      views:
        menuContent:
          controller: 'DocCtrl'
          templateUrl: 'docs/show.html'

    $urlRouterProvider.otherwise "/"

    $httpProvider.interceptors.push ->
       request: (config) ->
         if config.url.match(/\.html$/) && !config.url.match(/^shared\//)
           if device.tablet()
             type = 'tablet'
           else if device.mobile()
             type = 'mobile'
           else
             type = 'desktop'

           config.url = "/#{type}/#{config.url}"

         config

Tapcentive.run ($state) ->
  $state.go('app.home')

Tapcentive.run ($rootScope, copy) ->
  $rootScope.copy = copy

Tapcentive.factory 'Socket', (socketFactory) ->
  socketFactory()

Tapcentive.factory 'Docs', (Socket) ->
  service =
    list: []
    find: (permalink) ->
      _.find service.list, (doc) ->
        doc.permalink == permalink

  Socket.on 'docs', (docs) ->
    service.list = docs

  service

Tapcentive.controller 'HomeCtrl', ($scope) ->

Tapcentive.controller 'LegalCtrl', ($scope) ->

Tapcentive.controller 'CompanyCtrl', ($scope) ->

Tapcentive.controller 'AppCtrl', ($scope) ->

Tapcentive.controller 'RecycleCtrl', ($scope) ->

Tapcentive.controller 'NewsCtrl', ($scope) ->

Tapcentive.controller 'CbdCtrl', ($scope) ->

Tapcentive.controller 'PressCtrl', ($scope) ->

Tapcentive.controller 'PrivacyCtrl', ($scope) ->

Tapcentive.controller 'Technology', ($scope) ->

Tapcentive.controller 'ContactCtrl', ($scope) ->

Tapcentive.controller 'GetStartedCtrl', ($scope) ->

Tapcentive.controller 'DevelopersCtrl', ($scope) ->

Tapcentive.controller 'DeveloperCenterCtrl', ($scope) ->

Tapcentive.controller 'DocsCtrl', ($scope, Docs) ->
  $scope.$watch (-> Docs.list), ->
    $scope.docs = Docs.list

Tapcentive.controller 'DocCtrl', ($scope, $sce, $stateParams, $timeout, Docs) ->
  $scope.index = if $stateParams.step then $stateParams.step-1 else 0

  $scope.$watch (-> Docs.list), ->
    $scope.doc = Docs.find($stateParams.permalink)
    if $scope.doc
      $scope.step = $scope.doc.steps[$scope.index]
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url)

      if $scope.step.type == 'dialog'
        $scope.messageIndex = 0
        $scope.messages = []
        $timeout($scope.nextMessage, 1000)

  $scope.hasMoreSteps = ->
    if $scope.step
      $scope.step.index < $scope.doc.steps.length
