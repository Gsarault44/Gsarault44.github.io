'use strict';

/**
 * @ngdoc overview
 * @name gsarault44githubioApp
 * @description
 * # gsarault44githubioApp
 *
 * Main module of the application.
 */
angular
  .module('gsarault44githubioApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/resume', {
        templateUrl: 'views/resume.html',
        controller: 'ResumeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).animation('.page', function(){
  return{
    //animate in
    enter: function(element, done){
      var scope = getScope(element);
      var style = 'default';
      switch(style){ 
        case "default":
          fadeIn(element, done);
        break;
      }
      
    },
    //animate out
    leave: function(element, done){
      var scope = getScope(element);
      var style = 'default';
      switch(style){ 
        case "default":
          fadeOut(element, done);
        break;
      }
    }    
  };
  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

  

});

function fadeIn(element, done){
  TweenMax.set(element, {autoAlpha:0});
  TweenMax.to(element, 1.5, {autoAlpha:1, ease:Expo.easeOut, onComplete:function(){
      done();
    }
  });

}
function fadeOut(element, done){
  TweenMax.set(element, {autoAlpha:1});
  TweenMax.to(element, 1.5, {autoAlpha:0, ease:Expo.easeOut, onComplete:function(){
      done();
    }
  });

}

var getScope = function(e) {
    return angular.element(e).scope();
};
