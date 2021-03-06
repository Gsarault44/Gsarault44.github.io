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
  .config(["$routeProvider", function ($routeProvider) {
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
  }]).animation('.page', function(){
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

'use strict';

/**
 * @ngdoc function
 * @name gsarault44githubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gsarault44githubioApp
 */
angular.module('gsarault44githubioApp').controller('MainCtrl', ["$scope", "$rootScope", "$location", "$window", "$timeout", function ($scope, $rootScope, $location, $window, $timeout) {

	var screenHeight = $( window ).height();
	var screenWidth = $( window ).width();
	var listOffTop = screenHeight-300
	var move = 0
	var width = $(document).width();
	var littleOffTheTop = '50px'
	var someOffTheTop = '100px'

	if (width < 640) {
       	listOffTop = screenHeight-145
		littleOffTheTop = '35px'
		someOffTheTop = '70px'
    }
	$(window).resize(function() {
	    
	    if (width < 640) {
	       listOffTop = screenHeight-145
	    }
	});

	TweenMax.set($('.page'), {height:screenHeight});
	TweenMax.set($('.intro'), {height:screenHeight});
	TweenMax.set($('.spotlight'), {top:'100%', height:screenHeight});
	TweenMax.set($('.project-index'), {top:'100%', height:screenHeight});
	TweenMax.set($('.p-list'), {height:listOffTop+'px'});


	$scope.openThisSucka = function(e) {
  		
  		var project = "."+e 
  		TweenMax.to($('.p-spotlight'), 1, {autoAlpha:1,zIndex:1,ease:Expo.easeOut});
  		TweenMax.to($(project), 1, {autoAlpha:1,zIndex:1,ease:Expo.easeOut});
  	}
  	$scope.closeThisSucka = function(e) {
  		TweenMax.to($('.p-spotlight'), 1, {autoAlpha:0,zIndex:-1,ease:Expo.easeOut});
  		TweenMax.to($('.spot-wrap'), 1, {zIndex:0,ease:Expo.easeOut});
  		TweenMax.to($('.spot-pop'), 1, {autoAlpha:0,zIndex:-1,ease:Expo.easeOut});
  	}
    function scrolling() {
    	
    	console.log
    	document.addEventListener('scroll', function (event) {
		   
		}, true);
    	$(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta) {
    		var $elm = $(event.target);
    			if($elm.is('.p-spotlight *')) { 
			    	return
		    	}
		    	if($elm.is('.p-spotlight')) { 
			    	return
		    	}
    			if($elm.is('.p-list *')) { 
		        	var subScrollParent = $('.p-list').offset().top + 40
	    			var subScroll = $('#first').offset().top
	    			if(subScrollParent != subScroll){
			    		return
			    	}
		    	}

	    		if (event.originalEvent.wheelDelta < 0) {
	    			if(move > 100) return
			        move++
			    }
			    else {
			        if(move < 0){ 
			        	return
			        }else {
			        	move--	
			        }
			    }
	    		if (move > 25 && move < 75) { 
					TweenMax.to($('.intro'), 1, {scaleZ:0.975,ease:Expo.easeOut});
					TweenMax.to($('.intro .heading'), 2, {autoAlpha:1,ease:Expo.easeOut});
					TweenMax.to($('.spotlight'), 1, {top:littleOffTheTop,ease:Expo.easeOut});
					TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:0,ease:Expo.easeOut});
					TweenMax.to($('.project-index'), 1, {top:'100%',ease:Expo.easeOut});
				}
				if (move > 75) {
					var setSubScroll = $('.p-list').offset().top
					TweenMax.to($('.projects'), 1, {scaleZ:0.95,ease:Expo.easeOut});
					TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:1,ease:Expo.easeOut});
					TweenMax.to($('.project-index'), 1, {top:someOffTheTop,ease:Expo.easeOut});
				}
				if (move < 25) {
					TweenMax.to($('.intro'), 1, {scale:1,ease:Expo.easeOut});
					TweenMax.to($('.heading'), 2, {autoAlpha:0,ease:Expo.easeOut});
					TweenMax.to($('.spotlight'), 1, {top:'100%',ease:Expo.easeOut});
					TweenMax.to($('.project-index'), 1, {top:'100%',ease:Expo.easeOut});
				}
		})
    }
    $scope.navClick = function(part) {
      		//var part = element.attr('part')
      		console.log(part.part)
      		if (part.part == 'about') { 
      			move = 0
      			console.log('about')	
      			TweenMax.to($('.intro'), 1, {scale:1,ease:Expo.easeOut});
				TweenMax.to($('.heading'), 2, {autoAlpha:0,ease:Expo.easeOut});
				TweenMax.to($('.spotlight'), 1, {top:'100%',ease:Expo.easeOut});
				TweenMax.to($('.project-index'), 1, {top:'100%',ease:Expo.easeOut});

			}
			if (part.part == 'spotlight') {
				move = 26
				TweenMax.to($('.intro'), 1, {scaleZ:0.975,ease:Expo.easeOut});
				TweenMax.to($('.intro .heading'), 2, {autoAlpha:1,ease:Expo.easeOut});
				TweenMax.to($('.spotlight'), 1, {top:littleOffTheTop,ease:Expo.easeOut});
				TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:0,ease:Expo.easeOut});
				TweenMax.to($('.project-index'), 1, {top:'100%',ease:Expo.easeOut});
				console.log('spotlight')
				
			}
			if (part.part == 'index') {
				move = 76
				console.log('index')
				TweenMax.to($('.projects'), 1, {scaleZ:0.95,ease:Expo.easeOut});
				TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:1,ease:Expo.easeOut});
				TweenMax.to($('.project-index'), 1, {top:someOffTheTop,ease:Expo.easeOut});
			console.log('Just to see if Real Deveploers are looking, I Like Fart jokes!')	
			}
      	}

      	
    scrolling()

}]);

'use strict';

/**
 * @ngdoc function
 * @name gsarault44githubioApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gsarault44githubioApp
 */
angular.module('gsarault44githubioApp').controller('AboutCtrl', function () {

});

'use strict';

/**
 * @ngdoc function
 * @name gsarault44githubioApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gsarault44githubioApp
 */
angular.module('gsarault44githubioApp').controller('ResumeCtrl', function () {

});

'use strict';

/**
 * @ngdoc directive
 * @name moArDwApp.directive:trayDir
 * @description
 * # tile
 */
angular.module('gsarault44githubioApp')
  .directive('navTouch', ["$rootScope", function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      	
      	
    }}    
  }]);

angular.module('gsarault44githubioApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<section class=\"p-spotlight\"> <div class=\"spot-wrap longwood\"> <img src=\"images/longwood1.png\"> <img src=\"images/longwood2.png\"> </div> <div class=\"spot-wrap ford\"> <img src=\"images/ford1.jpg\"> <img src=\"images/ford2.png\"> </div> <div class=\"spot-wrap gates\"> <img src=\"images/gates1.png\"> <img src=\"images/gates2.png\"> <img src=\"images/gates3.png\"> </div> </section>"
  );


  $templateCache.put('views/main.html',
    "<section class=\"intro-page\"> <section class=\"intro row\"> <div class=\"heading\" nav-touch ng-click=\"navClick({part: 'about'})\" part=\"about\"> <h1>About Me</h1> </div> <div class=\"logo\"> <img class=\"intro-logo-image\" src=\"data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MTIuOTg5IiBoZWlnaHQ9IjY4LjY5NCIgdmlld0JveD0iMi44MDggOC4zNDcgNDEyLjk4OSA2OC42OTQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMi44MDggOC4zNDcgNDEyLjk4OSA2OC42OTQiPjxwYXRoIGQ9Ik0zOC41MjMgNjIuNjR2LTUuMjU3aC0uMTQ0Yy0zLjA5NiA0LjAzMy02Ljk4NSA2LjI2NS0xMi45NjEgNi4yNjUtMTIuODE3IDAtMjIuNjEtOS40MzMtMjIuNjEtMjcuNTc4czguOTI5LTI3LjcyMyAyNC42OTgtMjcuNzIzYzEzLjAzMyAwIDE4Ljc5MyA2Ljg0MSAyMC45NTQgMTUuOTE0bC0xMy40NjUgMy4zODRjLTEuNTg0LTQuNzUyLTMuODE2LTYuOTEyLTcuOTkzLTYuOTEyLTYuNjI1IDAtOS41MDUgNS42MTYtOS41MDUgMTUuMjY1IDAgMTAuMjI2IDMuNDU2IDE1LjQ4MSA5LjU3NyAxNS40ODEgNS42ODggMCA4LjI4MS0zLjM4NCA5Ljg2NS03LjM0NWgtMTEuNjY1di0xMC44MDFoMjQuNDgydjI5LjMwN2gtMTEuMjMzek04MS45MzggMzcuNTgxYy00LjAzMiAwLTguMjA4IDEuMzY4LTExLjUyMSAzLjYwMXYyMS40NThoLTEzLjg5N3YtMzcuODA0aDEzLjg5N3Y3LjIwMWguMTQ0YzIuNTkyLTQuNjgxIDcuMDU3LTcuOTkzIDExLjM3Ny03Ljk5M2guMjE2djEzLjUzN2gtLjIxNnpNMTE5Ljc0NiA0Ni42NTRoLTIzLjExNGMuNTA0IDQuOTY5IDIuODggNi45ODQgNi45MTMgNi45ODQgMy4wOTYgMCA3LjA1Ny0xLjY1NiAxMC4zNjktNC4yNDhsNS42ODggNy40MTdjLTQuMjQ5IDMuODE1LTkuODY1IDYuNjI0LTE3LjEzOCA2LjYyNC0xMi44ODkgMC0xOS4wODItNy43NzYtMTkuMDgyLTE5LjY1NyAwLTEwLjgwMiA1LjQtMTkuNzMgMTguNzIyLTE5LjczIDEyLjA5NyAwIDE3Ljc4NiA5LjI4OSAxNy43ODYgMTkuMDgyIDAgMS40NC0uMDcyIDIuNDQ4LS4xNDQgMy41Mjh6bS0xOC4yMTctMTMuOTdjLTIuNTkyIDAtNC4zMiAxLjY1Ni00Ljg5NiA2LjQ4MWgxMC4wMDljLS40MzMtNC42MDgtMi4wMTctNi40ODEtNS4xMTMtNi40ODF6TTE1Ni4xMDUgMzQuNDEzYy4yMTYuODY0LjI4OCAxLjg3Mi4yODggMi44ODEgMCA5LTcuNDg5IDEzLjI0OS0xNi42MzMgMTMuMjQ5LTEuNjU2IDAtMy4zMTItLjE0NS00Ljc1Mi0uNDMzLS4zNi40MzMtLjY0OC45MzctLjY0OCAxLjU4NCAwIDEuMTUyLjkzNiAxLjUxMyAyLjk1MiAxLjU4NWw2LjEyMS41MDRjMTEuNTkzLjkzNiAxNy40MjUgNC4zMiAxNy40MjUgMTAuODAxIDAgOS4wNzItOC43MTMgMTIuNDU3LTIxLjMxNCAxMi40NTctMTIuODg5IDAtMTkuNzI5LTIuNTkzLTE5LjcyOS04LjI4MSAwLTMuMzEyIDIuMjMyLTYuMDQ4IDYuMTIxLTcuOTItMS4zNjgtMS4xNTItMi4xNi0yLjUyMS0yLjE2LTQuMDMyIDAtMy43NDUgMi4xNi02LjE5MyA2LjA0OC04LjQ5Ny00LjE3Ni0yLjE2LTYuNjI1LTUuOTA0LTYuNjI1LTExLjAxNyAwLTkuMDAxIDcuNTYxLTEzLjI1IDE2LjU2Mi0xMy4yNSA1LjExMiAwIDkuNzIxIDEuMzY4IDEyLjY3MyA0LjAzMyAyLjM3Ni0yLjQ0OCA1LjMyOS00LjAzMyA4LjY0MS00LjAzM3Y5Ljg2NWMtMS44MDEgMC0zLjYwMi4xNDQtNC45Ny41MDR6bS0xMy4zMjEgMzAuNjAzbC02LjEyLS40MzJjLTEuNTEyLS4xNDUtMi44OC0uMzYtNC4yNDktLjY0OC0uMjg4LjY0OC0uNTA0IDEuMjk2LS41MDQgMi4yMzIgMCAyLjIzMiAyLjQ0OCAzLjc0NCAxMC4wMDkgMy43NDQgNy4wNTcgMCA4Ljc4NS0xLjE1MiA4Ljc4NS0yLjU5MiAwLTEuMjk2LS45MzYtMS44MDEtNy45MjEtMi4zMDR6bS0zLjAyNC0zMy40MTJjLTIuNTIxIDAtNC4wMzIgMi4wMTctNC4wMzIgNS42ODlzMS41MTIgNS42ODggNC4wMzIgNS42ODhjMi42NjQgMCA0LjEwNC0yLjAxNyA0LjEwNC01LjY4OC4wMDEtMy42NzItMS40NC01LjY4OS00LjEwNC01LjY4OXpNMjAxLjc0MyA2My42NDdjLTEwLjE1MyAwLTE2Ljc3Ny0zLjI0LTIxLjg5LTkuNTA1bDkuOTM3LTguMTM3YzMuODE2IDQuMzIgNy40ODkgNi40OCAxMy4wMzMgNi40OCA0LjEwNSAwIDYuMjY1LTEuNjU1IDYuMjY1LTQuMzkyIDAtMi41MjEtMS42NTYtMy42NzMtNi40MDktNS4wNDEtMTQuNTQ1LTQuMDMyLTIxLjYwMi03LjkyMS0yMS42MDItMTguNDM0IDAtMTAuODAxIDkuMzYxLTE2LjI3MyAyMC4zNzgtMTYuMjczIDkuNjQ5IDAgMTUuODQxIDIuODA5IDIwLjY2NyA4LjY0MWwtOS44NjUgOC4yMDljLTMuMTY4LTMuNjcyLTYuNzY5LTUuNjg4LTEwLjk0NS01LjY4OC00LjAzMiAwLTUuNzYgMS41ODQtNS43NiAzLjg4OSAwIDIuMTYgMS41MTIgMy40NTYgNi4zMzYgNC44MjQgMTYuNDE4IDQuNTM2IDIxLjYwMiA5LjE0NSAyMS42MDIgMTguNjQ5LS4wMDEgOC42NDItNi40MSAxNi43NzgtMjEuNzQ3IDE2Ljc3OHpNMjQ2LjU5OSA2Mi42NGMtLjUwNC0xLjE1Mi0uNzkyLTIuMjMyLTEuMDA4LTMuNTI4LTIuNzM2IDIuNTIxLTUuOTc3IDQuMzItMTAuNzI5IDQuMzItNi4wNDggMC0xMS4wMTctMy4xNjgtMTEuMDE3LTEwLjQ0IDAtOS41NzcgOS40MzMtMTMuODk3IDIxLjc0Ni0xNC45MDV2LS41MDVjMC0yLjU5Mi0xLjIyNS0zLjgxNS00LjgyNC0zLjgxNS0zLjI0IDAtNi4zMzcgMS4yOTYtOS42NDkgMy43NDRsLTYuMTItNy40ODljNC4wMzItMy42IDkuODY0LTUuOTc3IDE4LjA3My01Ljk3NyAxMC40NDEgMCAxNi4wNTggMy42MDEgMTYuMDU4IDE0LjMzdjE0Ljk3NWMwIDMuOTYxLjI4OCA3LjQxNyAxLjE1MiA5LjI4OWgtMTMuNjgyem0tMS4wMDgtMTcuNDI2Yy01LjU0NS42NDgtOC40MjUgMi43MzYtOC40MjUgNi4wNDkgMCAyLjAxNyAxLjA4IDMuNDU2IDMuMzEyIDMuNDU2IDEuNzI4IDAgMy42LS45MzYgNS4xMTItMi4zNzZ2LTcuMTI5ek0yODkuOTQ0IDM3LjU4MWMtNC4wMzIgMC04LjIwOSAxLjM2OC0xMS41MjEgMy42MDF2MjEuNDU4aC0xMy44OTZ2LTM3LjgwNGgxMy44OTZ2Ny4yMDFoLjE0NWMyLjU5Mi00LjY4MSA3LjA1Ny03Ljk5MyAxMS4zNzctNy45OTNoLjIxNnYxMy41MzdoLS4yMTd6TTMxMi41NSA2Mi42NGMtLjUwNC0xLjE1Mi0uNzkyLTIuMjMyLTEuMDA4LTMuNTI4LTIuNzM2IDIuNTIxLTUuOTc3IDQuMzItMTAuNzI5IDQuMzItNi4wNDggMC0xMS4wMTctMy4xNjgtMTEuMDE3LTEwLjQ0IDAtOS41NzcgOS40MzMtMTMuODk3IDIxLjc0Ni0xNC45MDV2LS41MDVjMC0yLjU5Mi0xLjIyNS0zLjgxNS00LjgyNC0zLjgxNS0zLjI0IDAtNi4zMzcgMS4yOTYtOS42NDkgMy43NDRsLTYuMTItNy40ODljNC4wMzItMy42IDkuODY0LTUuOTc3IDE4LjA3My01Ljk3NyAxMC40NDEgMCAxNi4wNTggMy42MDEgMTYuMDU4IDE0LjMzdjE0Ljk3NWMwIDMuOTYxLjI4OCA3LjQxNyAxLjE1MiA5LjI4OWgtMTMuNjgyem0tMS4wMDgtMTcuNDI2Yy01LjU0NS42NDgtOC40MjUgMi43MzYtOC40MjUgNi4wNDkgMCAyLjAxNyAxLjA4IDMuNDU2IDMuMzEyIDMuNDU2IDEuNzI4IDAgMy42LS45MzYgNS4xMTItMi4zNzZ2LTcuMTI5ek0zNTIuNzI2IDYyLjY0di00LjYwOGMtNC4yNDkgMy4zODUtOC4xMzcgNS40LTEyLjg5IDUuNC01LjY4OCAwLTguNTY4LTMuMDk3LTguNTY4LTkuNjQ4di0yOC45NDhoMTMuODk3djI1LjI3NGMwIDEuNTg0LjU3NiAyLjUyMSAyLjA4OCAyLjUyMXMzLjI0LS45MzcgNS40NzMtMi41MjF2LTI1LjI3NGgxMy44OTd2MzcuODA0aC0xMy44OTd6TTM3My4xIDYyLjY0di01My4yODVoMTMuODk3djUzLjI4NWgtMTMuODk3ek00MDcuODc3IDYzLjE0M2MtOC4xMzcgMC0xMy4xMDUtMy4yNC0xMy4xMDUtMTEuOTUzdi0xNi44NWgtMy45NnYtOS41MDVoMy45NnYtMTIuMzg0aDEzLjgyNXYxMi4zODVoNi44NDF2OS41MDVoLTYuODQxdjE0LjgzNGMwIDIuOTUyIDEuMzY4IDQuMTA0IDMuNjcyIDQuMTA0IDEuNTEzIDAgMi41OTMtLjA3MiAzLjUyOC0uMjg4djkuNzIxYy0xLjcyNy4yODgtNC4wMzIuNDMxLTcuOTIuNDMxeiIvPjwvc3ZnPg==\" alt=\"Greg Sarault\"> </div> <div class=\"wrapper\"> <div class=\"intro-image\"> </div> <div class=\"intro-text\"> <p>I am a Philadelphia based Front End Web Developer</p> <p>HTML, CSS, and JavaScript are a second nature to me, I enjoy critical thinking and coming up with elegant solutions for challenging problems.</p> <p>I take a lot of pride in my work and the immersive story telling created from it.</p> <p><a href=\"mailto:gregsarault@gmail.com\">Lets Chat</a></p> </div> </div>   <div class=\"next\" ng-click=\"navClick({part: 'spotlight'})\"></div> </section> <section class=\"spotlight row\"> <div class=\"heading\" nav-touch ng-click=\"navClick({part: 'spotlight'})\" part=\"spotlight\"> <h1>Spotlight Projects</h1> </div> <div class=\"wrapper\"> <div class=\"spotlight-intro\"> <h1>Spotlight Work</h1> <p>Here are a few recent projects that I have worked on.</p> </div> <div class=\"spot\"> <div class=\"spot-wrap longwood\" ng-click=\"openThisSucka('longwood')\"> <!-- <h2>Longwood Gardens.</h2> --> </div> </div> <div class=\"spot\"> <div class=\"spot-wrap ford\" ng-click=\"openThisSucka('ford')\"> <!-- <h2>Gerald Ford for Museum</h2> --> </div> </div> <div class=\"spot\"> <div class=\"spot-wrap gates\" ng-click=\"openThisSucka('gates')\"> <!-- <h2>Bill and Milinda Gates Foundation.</h2> --> </div> </div> </div> <div class=\"next\" ng-click=\"navClick({part: 'index'})\"></div> </section> <section class=\"project-index row\"> <div class=\"heading\" nav-touch ng-click=\"navClick({part: 'index'})\" part=\"index\"> <h1>Project Index</h1> </div> <div class=\"wrapper\"> <div class=\"project-intro\"> <h1>Project's I have worked on</h1> </div> <div class=\"p-list\"> <ul> <li id=\"first\"> <span class=\"date\">2016</span> <article class=\"p-item\"> <h1>Florida Humanities Council</h1> <p>Phyical installation, Angular, Touch Screen Not released</p> </article> </li> <li> <span class=\"date\">2016</span> <article class=\"p-item\"> <h1>Museum of the American Revolution</h1> <p>Web, Drupal, Gulp</p> </article> </li> <li> <span class=\"date\">2016</span> <article class=\"p-item\"> <h1>Gates Foundation</h1> <p>Phyical installation, Multiple Projects, Node Server, Angular</p> </article> </li> <li> <span class=\"date\">2016</span> <article class=\"p-item\"> <h1>Please Touch Museum</h1> <p>Web App, Not released</p> </article> </li> <li> <span class=\"date\">2015</span> <article class=\"p-item\"> <a href=\"http://newheights.longwoodgardens.org/#/\"> <h1>Longwood Gardens New Heights</h1> <p>Angular</p> </a> </article> </li> <li> <span class=\"date\">2015</span> <article class=\"p-item\"> <a href=\"https://longwoodgardens.org\"> <h1>Longwood Gardens</h1> <p>Style Guide, Web</p> </a> </article> </li> <li> <span class=\"date\">2016</span> <article class=\"p-item\"> <a href=\"https://www.albrightknox.org/\"> <h1>Albright Knox</h1> <p>Web, Drupal</p> </a> </article> </li> <li> <span class=\"date\">2016</span> <article class=\"p-item\"> <h1>Gerald Ford Museum</h1> <p>9 Applications, Angular</p> </article> </li> <li> <span class=\"date\">2015</span> <article class=\"p-item\"> <a href=\"http://www.ias.edu\"> <h1>Institute for Advanced Study</h1> <p>Web, Drupal</p> </a> </article> </li> <li> <span class=\"date\">2015</span> <article class=\"p-item\"> <a href=\"http://www.harukimurakami.com/\"> <h1>Haruki Murakami</h1> <p>Web, Angular, 2015 Webby Award Winner</p> </a> </article> </li> <li> <span class=\"date\">2015</span> <article class=\"p-item\"> <a href=\"https://www.pafa.org/\"> <h1>Pennsylvania Academy of the Fine Arts</h1> <p>Web</p> </a> </article> </li> <li> <span class=\"date\">2014</span> <article class=\"p-item\"> <a href=\"http://oceana.org/\"> <h1>Oceania</h1> <p>Web, Drupal, Multilingual</p> </a> </article> </li> <li> <span class=\"date\">2014</span> <article class=\"p-item\"> <a href=\"http://laphamsquarterly.org/\"> <h1>Lapham's Quarterly</h1> <p>Web, Drupal</p> </a> </article> </li> <li> <span class=\"date\">2014</span> <article class=\"p-item\"> <a href=\"http://pci.upenn.edu/\"> <h1>Penn Center for Innovation</h1> <p>Web, WordPress</p> </a> </article> </li> <li> <span class=\"date\">2013</span> <article class=\"p-item\"> <a href=\"https://www.fi.edu/\"> <h1>The Franklin Institute</h1> <p>Web, Drupal</p> </a> </article> </li> <li> <span class=\"date\">2013</span> <article class=\"p-item\"> <a href=\"http://www.newsworks.org/\"> <h1>Newsworks</h1> <p>Web</p> </a> </article> </li> <li> <span class=\"date\">2013</span> <article class=\"p-item\"> <a href=\"https://techcrunch.com/\"> <h1>Techcrunch</h1> <p>Web</p> </a> </article> </li> <li> <span class=\"date\">2013</span> <article class=\"p-item\"> <a href=\"http://www.bearskinrug.co.uk/\"> <h1>BearSkinRug</h1> <p>Web, Wordpress</p> </a> </article> </li> <li> <span class=\"date\">2013</span> <article class=\"p-item\"> <a href=\"http://www.businessology.biz/\"> <h1>The Businessology Show</h1> <p>Web, Wordpress</p> </a> </article> </li> <li> <span class=\"date\">2013</span> <article class=\"p-item\"> <a href=\"http://www.pixelingo.com/\"> <h1>Pixelingo</h1> <p>Web</p> </a> </article> </li> <li> <span class=\"date\">2013</span> <article class=\"p-item\"> <a href=\"http://typedia.com/\"> <h1>Typedia</h1> <p>Web</p> </a> </article> </li> </ul> </div> </div> </section>  <section class=\"p-spotlight\"> <div class=\"closer\" ng-click=\"closeThisSucka()\"></div> <div class=\"spot-pop longwood\"> <h1>Longwood Gardens New Heights</h1> <p>This was developed in Angular, populated the content via json feed, Slideshows, scrolling, and videos were all custom creations. This project was an Honerable Mention for Awwwards, and a SXSW – Finalist: Innovation Awards, Responsive Design (2016)</p> <img src=\"images/longwood1.png\"> <img src=\"images/longwood2.png\"> <img src=\"images/longwood3.png\"> </div> <div class=\"spot-pop ford\"> <h1>Gerald Ford Museum</h1> <p>This Project was a tight timeline with only 5 months of development. We were able to prototype early on for to find out if we could accept multiple touches in chrome</p> <img src=\"images/ford3.png\"> <img src=\"images/ford1.jpg\"> <img src=\"images/ford2.png\"> </div> <div class=\"spot-pop gates\"> <h1>Bill and Melinda Gates Foundation.</h1> <p>This was also a tight timeline almost in tandem with the Ford project. There are 3 different applications, a Photobooth, Display wall, and Portrait media station. We created a node server on the display wall to immediately display photos and other data from photo booth.</p> <img src=\"images/gates3.png\"> <img src=\"images/gates1.png\"> <img src=\"images/gates2.png\"> </div> </section></section>"
  );


  $templateCache.put('views/resume.html',
    "<div class=\"resume\"> <div class=\"page-wrap\"> <heading class=\"the-man\"> <h1 class=\"title fn\">Greg Sarault</h1> <p class=\"slogan\">Jack of All Trades Master of Some</p> <div class=\"personal-info\"> <span class=\"street-address\">123 Holly Rd.</span> <span class=\"locality\">Hatboro, PA 19040</span> <span class=\"email\">E-Mail:GregSarault@gmail.com</span> <span class=\"phone\">Cell: 215-720-6200</span> <span class=\"website\"><a href=\"http://gregsarault.com/\">GregSarault.com</a></span> <p class=\"website\"><a onclick=\"this.href='data:text/html;charset=UTF-8,'+encodeURIComponent(document.documentElement.outerHTML)\" href=\"#\" download=\"resume.html\">Download</a></p> </div> </heading><!-- .heading --> <section> <h1>A little bit about me</h1> <p>I am husband to an amazing wife, and a dog dad to a super energetic dog. I have been a Devloper since 2013, and love what I do. I rarely get sick, and always enjoy Whiskey. I'm constantly trying to learn new thing to keep me sharp. My free time is spent with my family or just downtime at the beach.</p> </section> <section class=\"exerience\"> <h1 class=\"section-heading clearfix\">Experience</h1> <h2 class=\"company clearfix\">Company: <a href=\"#\" class=\"company-link\">Bluecadet</a></h2> <div class=\"position\"> <p class=\"experence-subtitle\">Position: Developer</p> <h3 class=\"position-achivements section-subheading\">Accomplishments</h3> <p class=\"position-achivements-content\">Started taking on challenges and finding solutions that work. My real talent lies in my determination and creative problem-solving. Here I have honed my development skills by learning many frameworks, and prototyping my projects very early on in the project.</p> <p class=\"position-skills-content\"></p> <p class=\"experence-subtitle\">Responsibilities:</p> <ul class=\"position-abilities\"> <li class=\"position-abilities-content\">Working with Designers, Project Managers, Content Strategist, and award winning standards.</li> <li>Developed websites in the LAMP stack</li> <li class=\"position-abilities-content\">Conducted interviews on behalf of the Development team.</li> <li class=\"position-abilities-content\">Currently mentoring a high school student in frontend development once a week</li> <li class=\"position-abilities-content\">Running morning stand-up, and Scrums</li> <li class=\"position-abilities-content\">Building Websites, Touchscreens applications.</li> <li class=\"position-abilities-content\">Setting up in-house hardware for testing</li> <li class=\"position-abilities-content\">On site installations - working with third-party A/V integrators</li> <li class=\"position-abilities-content\">Wrote extensive Documentation most in-house.</li> </ul> </div> <h2 class=\"company clearfix\">Company: <a href=\"http://superfriend.ly/\" class=\"company-link\">SuperFriendly</a></h2> <!-- <p class=\"intro\">Winner of .net Magazine's Awards \"Best New Agency!\" of 2013</p> --> <div class=\"position\"> <p class=\"experence-subtitle\">Position: Developer Apprentice</p> <h3 class=\"position-achivements section-subheading\">Accomplishments</h3> <p class=\"position-achivements-content\"> Throughout my 9 month apprenticeship, I have worked on 7 projects of all different varieties. Some of them start to finish (back-end CMS included). And some of them, I was brought on in the middle of the project. I developed a skill at Ping Pong only winning 3 out of 75+, But ending every game with a smile.</p> <p class=\"experence-subtitle\">Responsibilities:</p> <ul class=\"position-abilities\"> <li class=\"position-abilities-content\">Built customized websites to the highest specifications.</li> <li class=\"position-abilities-content\">Worked closely with designers, Converting Photoshop and PDF images into HTML/CSS</li> <li class=\"position-abilities-content\">Work to under pressure and tight deadlines.</li> <li class=\"position-abilities-content\">Organize and manage multiple priorities/projects simultaneously.</li> <li class=\"position-abilities-content\">Quickly fit into any existing team of developers.</li> </ul> </div><!-- .position --> </section> <section class=\"projects\"> <h1 class=\"section-heading\">Projects I've Worked On</h1> <ul class=\"project-list clearfix\"> <li class=\"project-list-sites pixelingo\"><a href=\"http://www.pixelingo.com/\">Pixelingo</a></li> <li class=\"project-list-sites tc\"><a href=\"https://techcrunch.com/\">TechCrunch</a></li> <li class=\"project-list-sites carolina-painting\"><a href=\"http://carolinapainting.com/\">Carolina Painting</a></li> <li class=\"project-list-sites bearskinrug\"><a href=\"http://bearskinrug.co.uk/\">BearSkinRun</a></li> <li class=\"project-list-sites tbs\"><a href=\"http://businessologyshow.biz/\">The Businessology Show</a></li> <li class=\"project-list-sites typedia\"><a href=\"http://typedia.com/\">Typedia</a></li> <li class=\"project-list-sites newsworks\"><a href=\"http://www.newsworks.org/\">NewsWorks (Story Page)</a></li> <li class=\"project-list-sites\">Florida Humanities Council<supper>*</supper></li> <li class=\"project-list-sites\"><a href=\"https://www.amrevmuseum.org/\">Museum of the American Revolution</a></li> <li class=\"project-list-sites\">Bill and Melinda Gates Foundation<supper>*</supper></li> <li class=\"project-list-sites\">Please Touch Museum<supper>*</supper></li> <li class=\"project-list-sites\"><a href=\"http://newheights.longwoodgardens.org/#/\">Longwood Gardens New Heights</a></li> <li class=\"project-list-sites\"><a href=\"https://longwoodgardens.org\">Longwood Gardens</a></li> <li class=\"project-list-sites\"><a href=\"https://www.albrightknox.org/\">Albright Knox</a></li> <li class=\"project-list-sites\">Gerald Ford Museum<supper>*</supper></li> <li class=\"project-list-sites\"><a href=\"http://www.ias.edu\">Institute for Advanced Study</a></li> <li class=\"project-list-sites\"><a href=\"http://www.harukimurakami.com/\">Haruki Murakami</a></li> <li class=\"project-list-sites\"><a href=\"https://www.pafa.org/\">Pennsylvania Academy of the Fine Arts</a></li> <li class=\"project-list-sites\"><a href=\"http://oceana.org/\">Oceania</a></li> <li class=\"project-list-sites\"><a href=\"http://laphamsquarterly.org/\">Lapham's Quarterly</a></li> <li class=\"project-list-sites\"><a href=\"http://pci.upenn.edu/\">Penn Center for Innovation</a></li> <li class=\"project-list-sites\"><a href=\"https://www.fi.edu/\">The Franklin Institute</a></li> </ul><!-- .project-list --> <div class=\"legend\"> <p>* Kiosk Installations</p> </div> </section><!-- .projects --> <section class=\"skills clearfix\"> <h1 class=\"section-heading\">Language's, Program's, and Practice's I've learned</h1> <ul class=\"all-my-skills\"> <li class=\"all-my-skills-content\"><a href=\"http://www.w3.org/html/logo/\">HTML5</a></li> <li class=\"all-my-skills-content\"><a href=\"http://www.w3.org/Style/CSS/Overview.en.html\">CSS/CSS3</a></li> <li class=\"all-my-skills-content\">Trained in Agile</li> <li class=\"all-my-skills-content\">Roadmapping projects</li> <li class=\"all-my-skills-content\"><a href=\"https://angularjs.org/\">Angular</a></li> <li class=\"all-my-skills-content\">Refilling the kegs</li> <li class=\"all-my-skills-content\">Starting board-game nights after work.</li> <li class=\"all-my-skills-content\"><a href=\"http://sass-lang.com/\">SASS</a></li> <li class=\"all-my-skills-content\"><a href=\"http://us.php.net/\">PHP</a></li> <li class=\"all-my-skills-content\"><a href=\"http://jquery.com/\">JavaScript(Jquery)</a></li> <li class=\"all-my-skills-content\"><a href=\"https://www.drupal.org/\">Drupal 7 &amp; 8</a></li> <li class=\"all-my-skills-content\"><a href=\"http://wordpress.org/\">WordPress</a></li> <li class=\"all-my-skills-content\"><a href=\"https://github.com/\">GitHub</a> <a href=\"https://github.com/diaspora/diaspora/wiki/Git-Workflow\">trained in development work-flow</a></li> <li class=\"all-my-skills-content\"><a href=\"http://www.photoshop.com/\">Photoshop</a></li> <li class=\"all-my-skills-content\"><a href=\"http://www.mamp.info/en/index.html\">MAMP</a></li> <li class=\"all-my-skills-content\"><a href=\"http://smacss.com/\">SMACCS</a></li> <li class=\"all-my-skills-content\"><a href=\"http://getbootstrap.com/2.3.2/\">BootStrap</a></li> <li class=\"all-my-skills-content\"><a href=\"http://microformats.org/wiki/benefits\">Microformats</a></li> <li class=\"all-my-skills-content\">Dabbled in some Three JS and 3D CSS</li> </ul><!-- .all-my-skills --> </section><!-- .skills --> <section class=\"education\"> <h1 class=\"section-heading\">Education</h1> <h2 class=\"company\">Lincoln Technical Institute, Philadelphia, PA</h2> <p class=\"intro\">Network Communications and Information Systems with Microsoft Systems</p> <p class=\"intro\">4.0 GPA, Excellent Attendance</p> <span class=\"date\">June 2010</span> </section><!-- .education --> </div><!-- .page-wrap --> </div>"
  );


  $templateCache.put('views/resumeDownload.html',
    "<!DOCTYPE html><!--[if lt IE 7]>      <html class=\"no-js lt-ie9 lt-ie8 lt-ie7\"> <![endif]--><!--[if IE 7]>         <html class=\"no-js lt-ie9 lt-ie8\"> <![endif]--><!--[if IE 8]>         <html class=\"no-js lt-ie9\"> <![endif]--><!--[if gt IE 8]><!--> <html class=\"no-js\"> <!--<![endif]--> <head> <title>Greg Sarault</title> <meta charset=\"utf-8\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"> <!-- <link rel=\"stylesheet\" media=\"all\" href=\"style.css\" /> --> <!-- This is the description that shows up in your google search. --> <meta name=\"description\" content=\"Greg Sarault a Competent Front End Web Developer\"> <!-- http://blog.javierusobiaga.com/stop-using-the-viewport-tag-until-you-know-ho --> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"> <!-- Facebook stuff --> <meta property=\"og:title\" content=\"Greg Sarault: Jack of all trades, Master of some!\"> <meta property=\"og:type\" content=\"website\"> <meta property=\"og:url\" content=\"http://www.Gregsarault.com\"> <meta property=\"og:image\" content=\"\"> <meta property=\"og:site_name\" content=\"Greg Sarault\"> <meta property=\"og:description\" content=\"Greg Sarault is a competent Web Developer, Seeking New opportunities in the agency world\"> <!-- Developed By Greg Sarault --> <style>* { margin: 0 0; padding: 0 0; }\n" +
    "h1,h2,h3,h4,h5,h6 { margin:0 0 1em;}\n" +
    "body { font-size:100%; font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n" +
    "p, ul, ol { margin: 0 0 1em; font-size: 1em; display: block; }\n" +
    "ul,ol { list-style: none; margin:0 0 1em;}\n" +
    "a { text-decoration: none; color:#589b00;}\n" +
    "a:hover { color:green; border-bottom:1px solid green;}\n" +
    ".clearfix:after { content: \".\"; display: block; height: 0; clear: both; visibility: hidden; }\n" +
    ".page { background:#ccc; width:95%; }\n" +
    ".page-wrap { margin:0 auto; max-width:760px; padding:1em; }\n" +
    ".the-man { text-align: left; display: block; border-bottom: 1px solid #000; padding-bottom: 3em; margin: 0 0 2em; }\n" +
    ".slogan { margin: 0 0 1em;}\n" +
    ".title { font-size: 3em; margin-bottom: 0; }\n" +
    ".stree-address, .locality { display: inline-block; }\n" +
    ".email { display: block; }\n" +
    ".section-heading { font-size: 2em; background:transparent; display:block; margin-bottom:1em; }\n" +
    ".company { margin:0; display:inline-block; font-size: 1.5em; }\n" +
    ".intro { margin:0; }\n" +
    ".project-list li:nth-child(odd), .all-my-skills li:nth-child(odd) { float:left; width:50%; }\n" +
    ".project-list li:nth-child(even), .all-my-skills li:nth-child(even) { float:left; width:50%; }\n" +
    ".project-list-sites { display: block; padding: 0.5em 0; }\n" +
    ".all-my-skills-content, .position-abilities-content { margin-bottom: 0.25em; }\n" +
    ".tech-skills, .skills, .projects, .exerience, .education { margin-bottom: 2em; border-bottom: 1px solid #000; padding-bottom: 1em; }</style> </head> <body class=\"page\"> <div class=\"page-wrap\"> <heading class=\"the-man\"> <h1 class=\"title fn\">Greg Sarault</h1> <p class=\"slogan\">Jack of All Trades Master of Some</p> <div class=\"personal-info\"> <span class=\"street-address\">2968 Sunnycrest Rd.</span> <span class=\"locality\">Willow Grove, PA 19090</span> <span class=\"email\">E-Mail:GregSarault@gmail.com</span> <span class=\"phone\">Cell: 215-720-6200</span> <span class=\"website\"><a href=\"http://gregsarault.com/\">GregSarault.com</a></span> </div> </heading><!-- .heading --> <section class=\"exerience\"> <h1 class=\"section-heading clearfix\">Experience</h1> <h2 class=\"company clearfix\"><a href=\"http://superfriend.ly/\" class=\"company-link\">SuperFriendly</a></h2> <p class=\"intro\">Winner of .net Magazine's Awards \"Best New Agency!\" of 2013</p> <div class=\"position\"> <p class=\"experence-subtitle\">Position: Web-developer Apprentice</p> <h3 class=\"position-achivements section-subheading\">Accomplishments</h3> <p class=\"position-achivements-content\"> Through out my 9 month apprenticeship, I have worked on 7 projects of all different varieties, Some of them start to finish (back-end CMS included). And some of them, I was brought on in the middle of the project. I developed a skill at Ping Pong only winning 3 out of 75+, But ending every game with a smile.</p> <p class=\"position-skills-content\">Bonus: I was able to sit 1 foot away from Dan Mall.(Owner of SuperFriendly). Able to take if all of his advice and teaching's, but also to listen in every business meeting and every potential partner. And soak up all the information that I could.</p> <p class=\"experence-subtitle\">Responsibilities:</p> <ul class=\"position-abilities\"> <li class=\"position-abilities-content\">Built customized websites to the highest specifications.</li> <li class=\"position-abilities-content\">Worked closely with designers, Converting Photoshop and PDF images into HTML/CSS</li> <li class=\"position-abilities-content\">Work to under pressure and tight deadlines.</li> <li class=\"position-abilities-content\">Organize and manage multiple priorities/ projects simultaneously.</li> <li class=\"position-abilities-content\">Quickly fit into any existing team of developers.</li> </ul> </div><!-- .position --> </section> <section class=\"projects\"> <h1 class=\"section-heading\">Projects I've Worked On</h1> <ul class=\"project-list clearfix\"> <li class=\"project-list-sites pixelingo\"><a href=\"http://www.pixelingo.com/\">Pixelingo</a></li> <li class=\"project-list-sites tc\"><a href=\"#\">Sorry Cant Say Till NOV but its good</a></li> <li class=\"project-list-sites carolina-painting\"><a href=\"http://carolinapainting.com/\">Carolina Painting</a></li> <li class=\"project-list-sites bearskinrug\"><a href=\"http://bearskinrug.co.uk/\">BearSkinRun</a></li> <li class=\"project-list-sites tbs\"><a href=\"http://businessologyshow.biz/\">The Businessology Show</a></li> <li class=\"project-list-sites typedia\"><a href=\"http://typedia.com/\">Typedia</a></li> <li class=\"project-list-sites newsworks\"><a href=\"http://www.newsworks.org/\">NewsWorks (Story Page)</a></li> </ul><!-- .project-list --> </section><!-- .projects --> <section class=\"skills clearfix\"> <h1 class=\"section-heading\">Language's, Program's, and Practice's I've learned</h1> <ul class=\"all-my-skills\"> <li class=\"all-my-skills-content\"><a href=\"http://www.w3.org/html/logo/\">HTML5</a></li> <li class=\"all-my-skills-content\"><a href=\"http://www.w3.org/Style/CSS/Overview.en.html\">CSS/CSS3</a></li> <li class=\"all-my-skills-content\"><a href=\"http://sass-lang.com/\">SASS</a></li> <li class=\"all-my-skills-content\"><a href=\"http://us.php.net/\">PHP</a></li> <li class=\"all-my-skills-content\"><a href=\"http://jquery.com/\">JavaScript(Jquery)</a></li> <li class=\"all-my-skills-content\"><a href=\"http://ellislab.com/expressionengine\">Expression Engine</a></li> <li class=\"all-my-skills-content\"><a href=\"http://wordpress.org/\">WordPress</a></li> <li class=\"all-my-skills-content\"><a href=\"https://github.com/\">GitHub</a> - via terminal -<a href=\"https://github.com/diaspora/diaspora/wiki/Git-Workflow\">(development work-flow)</a></li> <li class=\"all-my-skills-content\"><a href=\"http://www.photoshop.com/\">Photoshop</a></li> <li class=\"all-my-skills-content\"><a href=\"http://www.mamp.info/en/index.html\">MAMP</a></li> <li class=\"all-my-skills-content\"><a href=\"https://sifterapp.com/\">Sifter (issue tracking system)</a></li> <li class=\"all-my-skills-content\"><a href=\"http://smacss.com/\">SMACCS</a></li> <li class=\"all-my-skills-content\"><a href=\"http://getbootstrap.com/2.3.2/\">BootStrap</a></li> <li class=\"all-my-skills-content\"><a href=\"http://microformats.org/wiki/benefits\">Microformats</a></li> <li class=\"all-my-skills-content\">Practicing building all site to work with out JavaScript. Then Enhance!!</li> <li class=\"all-my-skills-content\">Religious user of <a href=\"http://css-tricks.com/\">CSS Tricks</a> and <a href=\"http://stackoverflow.com/\">Stackoverflow</a></li> <li class=\"all-my-skills-content\">Recently dabbled in some Three JS and CSS 3D</li> </ul><!-- .all-my-skills --> <p class=\"all-my-skills-post\">What ever else is out there I am sure I can learn it.</p> </section><!-- .skills --> <section class=\"education\"> <h1 class=\"section-heading\">Education</h1> <h2 class=\"company\">Lincoln Technical Institute, Philadelphia, PA</h2> <p class=\"intro\">Network Communications and Information Systems with Microsoft Systems</p> <p class=\"intro\">4.0 GPA, Excellent Attendance</p> <span class=\"date\">June 2010</span> </section><!-- .education --> <section class=\"tech-skills clearfix\"> <h1 class=\"section-subheading\">Tech Skills</h1> <ul class=\"all-my-skills\"> <li class=\"all-my-skills-content\">Excellent soft skills required for effective customer service and support</li> <li class=\"all-my-skills-content\">Examined operating system functions and computer architecture</li> <li class=\"all-my-skills-content\">Hands-on PC troubleshooting, repair and maintenance</li> <li class=\"all-my-skills-content\">Networking concepts: LANs, WANs, protocols, topologies, media, security and TCP/IP</li> <li class=\"all-my-skills-content\">Implemented and administered DNS, WINS, DHCP, RRAS, IP Routing</li> <li class=\"all-my-skills-content\">Studied security solutions (access control and auditing, authentication, encryption)</li> <li class=\"all-my-skills-content\">Capable with Microsoft 2008 Office Suite applications</li> <li class=\"all-my-skills-content\">Operating Systems: Mac, Windows 98, 2000, XP, Vista, Win7, 2003 Server</li> </ul><!-- .all-my-skills --> </section><!-- .tech-skills --> </div><!-- .page-wrap --> <!--[if lt IE 7]>\n" +
    "        <p class=\"chromeframe\">You are using an <strong>outdated</strong> browser. Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> or <a href=\"http://www.google.com/chromeframe/?redirect=true\">activate Google Chrome Frame</a> to improve your experience.</p>\n" +
    "    <![endif]--> </body> </html>"
  );

}]);
