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
	TweenMax.set($('.page'), {height:screenHeight});
	TweenMax.set($('.intro'), {height:screenHeight});
	TweenMax.set($('.spotlight'), {top:'100%', height:screenHeight});
	TweenMax.set($('.project-index'), {top:'100%', height:screenHeight});
	TweenMax.set($('.p-list'), {height:listOffTop+'px'});
	

    function scrolling() {
    	
    	console.log
    	document.addEventListener('scroll', function (event) {
		   
		}, true);
    	$(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta) {
    		console.log(move)
    		var $elm = $(event.target);
    			if($elm.is('.p-list *')) { 
		        	var subScrollParent = $('.p-list').offset().top + 20
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
					TweenMax.to($('.spotlight'), 1, {top:'50px',ease:Expo.easeOut});
					TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:0,ease:Expo.easeOut});
					TweenMax.to($('.project-index'), 1, {top:'100%',ease:Expo.easeOut});
				}
				if (move > 75) {
					var setSubScroll = $('.p-list').offset().top
					TweenMax.to($('.projects'), 1, {scaleZ:0.95,ease:Expo.easeOut});
					TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:1,ease:Expo.easeOut});
					TweenMax.to($('.project-index'), 1, {top:'100px',ease:Expo.easeOut});
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
				TweenMax.to($('.spotlight'), 1, {top:'50px',ease:Expo.easeOut});
				TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:0,ease:Expo.easeOut});
				TweenMax.to($('.project-index'), 1, {top:'100%',ease:Expo.easeOut});
				console.log('spotlight')
				
			}
			if (part.part == 'index') {
				move = 76
				console.log('index')
				TweenMax.to($('.projects'), 1, {scaleZ:0.95,ease:Expo.easeOut});
				TweenMax.to($('.spotlight .heading'), 2, {autoAlpha:1,ease:Expo.easeOut});
				TweenMax.to($('.project-index'), 1, {top:'100px',ease:Expo.easeOut});
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
    "<section class=\"intro-page\"> <section class=\"intro row\"> <div class=\"heading\" nav-touch ng-click=\"navClick({part: 'about'})\" part=\"about\"> <h1>About Me</h1> </div> <div class=\"logo\"> <img class=\"intro-logo-image\" src=\"data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MTIuOTg5IiBoZWlnaHQ9IjY4LjY5NCIgdmlld0JveD0iMi44MDggOC4zNDcgNDEyLjk4OSA2OC42OTQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMi44MDggOC4zNDcgNDEyLjk4OSA2OC42OTQiPjxwYXRoIGQ9Ik0zOC41MjMgNjIuNjR2LTUuMjU3aC0uMTQ0Yy0zLjA5NiA0LjAzMy02Ljk4NSA2LjI2NS0xMi45NjEgNi4yNjUtMTIuODE3IDAtMjIuNjEtOS40MzMtMjIuNjEtMjcuNTc4czguOTI5LTI3LjcyMyAyNC42OTgtMjcuNzIzYzEzLjAzMyAwIDE4Ljc5MyA2Ljg0MSAyMC45NTQgMTUuOTE0bC0xMy40NjUgMy4zODRjLTEuNTg0LTQuNzUyLTMuODE2LTYuOTEyLTcuOTkzLTYuOTEyLTYuNjI1IDAtOS41MDUgNS42MTYtOS41MDUgMTUuMjY1IDAgMTAuMjI2IDMuNDU2IDE1LjQ4MSA5LjU3NyAxNS40ODEgNS42ODggMCA4LjI4MS0zLjM4NCA5Ljg2NS03LjM0NWgtMTEuNjY1di0xMC44MDFoMjQuNDgydjI5LjMwN2gtMTEuMjMzek04MS45MzggMzcuNTgxYy00LjAzMiAwLTguMjA4IDEuMzY4LTExLjUyMSAzLjYwMXYyMS40NThoLTEzLjg5N3YtMzcuODA0aDEzLjg5N3Y3LjIwMWguMTQ0YzIuNTkyLTQuNjgxIDcuMDU3LTcuOTkzIDExLjM3Ny03Ljk5M2guMjE2djEzLjUzN2gtLjIxNnpNMTE5Ljc0NiA0Ni42NTRoLTIzLjExNGMuNTA0IDQuOTY5IDIuODggNi45ODQgNi45MTMgNi45ODQgMy4wOTYgMCA3LjA1Ny0xLjY1NiAxMC4zNjktNC4yNDhsNS42ODggNy40MTdjLTQuMjQ5IDMuODE1LTkuODY1IDYuNjI0LTE3LjEzOCA2LjYyNC0xMi44ODkgMC0xOS4wODItNy43NzYtMTkuMDgyLTE5LjY1NyAwLTEwLjgwMiA1LjQtMTkuNzMgMTguNzIyLTE5LjczIDEyLjA5NyAwIDE3Ljc4NiA5LjI4OSAxNy43ODYgMTkuMDgyIDAgMS40NC0uMDcyIDIuNDQ4LS4xNDQgMy41Mjh6bS0xOC4yMTctMTMuOTdjLTIuNTkyIDAtNC4zMiAxLjY1Ni00Ljg5NiA2LjQ4MWgxMC4wMDljLS40MzMtNC42MDgtMi4wMTctNi40ODEtNS4xMTMtNi40ODF6TTE1Ni4xMDUgMzQuNDEzYy4yMTYuODY0LjI4OCAxLjg3Mi4yODggMi44ODEgMCA5LTcuNDg5IDEzLjI0OS0xNi42MzMgMTMuMjQ5LTEuNjU2IDAtMy4zMTItLjE0NS00Ljc1Mi0uNDMzLS4zNi40MzMtLjY0OC45MzctLjY0OCAxLjU4NCAwIDEuMTUyLjkzNiAxLjUxMyAyLjk1MiAxLjU4NWw2LjEyMS41MDRjMTEuNTkzLjkzNiAxNy40MjUgNC4zMiAxNy40MjUgMTAuODAxIDAgOS4wNzItOC43MTMgMTIuNDU3LTIxLjMxNCAxMi40NTctMTIuODg5IDAtMTkuNzI5LTIuNTkzLTE5LjcyOS04LjI4MSAwLTMuMzEyIDIuMjMyLTYuMDQ4IDYuMTIxLTcuOTItMS4zNjgtMS4xNTItMi4xNi0yLjUyMS0yLjE2LTQuMDMyIDAtMy43NDUgMi4xNi02LjE5MyA2LjA0OC04LjQ5Ny00LjE3Ni0yLjE2LTYuNjI1LTUuOTA0LTYuNjI1LTExLjAxNyAwLTkuMDAxIDcuNTYxLTEzLjI1IDE2LjU2Mi0xMy4yNSA1LjExMiAwIDkuNzIxIDEuMzY4IDEyLjY3MyA0LjAzMyAyLjM3Ni0yLjQ0OCA1LjMyOS00LjAzMyA4LjY0MS00LjAzM3Y5Ljg2NWMtMS44MDEgMC0zLjYwMi4xNDQtNC45Ny41MDR6bS0xMy4zMjEgMzAuNjAzbC02LjEyLS40MzJjLTEuNTEyLS4xNDUtMi44OC0uMzYtNC4yNDktLjY0OC0uMjg4LjY0OC0uNTA0IDEuMjk2LS41MDQgMi4yMzIgMCAyLjIzMiAyLjQ0OCAzLjc0NCAxMC4wMDkgMy43NDQgNy4wNTcgMCA4Ljc4NS0xLjE1MiA4Ljc4NS0yLjU5MiAwLTEuMjk2LS45MzYtMS44MDEtNy45MjEtMi4zMDR6bS0zLjAyNC0zMy40MTJjLTIuNTIxIDAtNC4wMzIgMi4wMTctNC4wMzIgNS42ODlzMS41MTIgNS42ODggNC4wMzIgNS42ODhjMi42NjQgMCA0LjEwNC0yLjAxNyA0LjEwNC01LjY4OC4wMDEtMy42NzItMS40NC01LjY4OS00LjEwNC01LjY4OXpNMjAxLjc0MyA2My42NDdjLTEwLjE1MyAwLTE2Ljc3Ny0zLjI0LTIxLjg5LTkuNTA1bDkuOTM3LTguMTM3YzMuODE2IDQuMzIgNy40ODkgNi40OCAxMy4wMzMgNi40OCA0LjEwNSAwIDYuMjY1LTEuNjU1IDYuMjY1LTQuMzkyIDAtMi41MjEtMS42NTYtMy42NzMtNi40MDktNS4wNDEtMTQuNTQ1LTQuMDMyLTIxLjYwMi03LjkyMS0yMS42MDItMTguNDM0IDAtMTAuODAxIDkuMzYxLTE2LjI3MyAyMC4zNzgtMTYuMjczIDkuNjQ5IDAgMTUuODQxIDIuODA5IDIwLjY2NyA4LjY0MWwtOS44NjUgOC4yMDljLTMuMTY4LTMuNjcyLTYuNzY5LTUuNjg4LTEwLjk0NS01LjY4OC00LjAzMiAwLTUuNzYgMS41ODQtNS43NiAzLjg4OSAwIDIuMTYgMS41MTIgMy40NTYgNi4zMzYgNC44MjQgMTYuNDE4IDQuNTM2IDIxLjYwMiA5LjE0NSAyMS42MDIgMTguNjQ5LS4wMDEgOC42NDItNi40MSAxNi43NzgtMjEuNzQ3IDE2Ljc3OHpNMjQ2LjU5OSA2Mi42NGMtLjUwNC0xLjE1Mi0uNzkyLTIuMjMyLTEuMDA4LTMuNTI4LTIuNzM2IDIuNTIxLTUuOTc3IDQuMzItMTAuNzI5IDQuMzItNi4wNDggMC0xMS4wMTctMy4xNjgtMTEuMDE3LTEwLjQ0IDAtOS41NzcgOS40MzMtMTMuODk3IDIxLjc0Ni0xNC45MDV2LS41MDVjMC0yLjU5Mi0xLjIyNS0zLjgxNS00LjgyNC0zLjgxNS0zLjI0IDAtNi4zMzcgMS4yOTYtOS42NDkgMy43NDRsLTYuMTItNy40ODljNC4wMzItMy42IDkuODY0LTUuOTc3IDE4LjA3My01Ljk3NyAxMC40NDEgMCAxNi4wNTggMy42MDEgMTYuMDU4IDE0LjMzdjE0Ljk3NWMwIDMuOTYxLjI4OCA3LjQxNyAxLjE1MiA5LjI4OWgtMTMuNjgyem0tMS4wMDgtMTcuNDI2Yy01LjU0NS42NDgtOC40MjUgMi43MzYtOC40MjUgNi4wNDkgMCAyLjAxNyAxLjA4IDMuNDU2IDMuMzEyIDMuNDU2IDEuNzI4IDAgMy42LS45MzYgNS4xMTItMi4zNzZ2LTcuMTI5ek0yODkuOTQ0IDM3LjU4MWMtNC4wMzIgMC04LjIwOSAxLjM2OC0xMS41MjEgMy42MDF2MjEuNDU4aC0xMy44OTZ2LTM3LjgwNGgxMy44OTZ2Ny4yMDFoLjE0NWMyLjU5Mi00LjY4MSA3LjA1Ny03Ljk5MyAxMS4zNzctNy45OTNoLjIxNnYxMy41MzdoLS4yMTd6TTMxMi41NSA2Mi42NGMtLjUwNC0xLjE1Mi0uNzkyLTIuMjMyLTEuMDA4LTMuNTI4LTIuNzM2IDIuNTIxLTUuOTc3IDQuMzItMTAuNzI5IDQuMzItNi4wNDggMC0xMS4wMTctMy4xNjgtMTEuMDE3LTEwLjQ0IDAtOS41NzcgOS40MzMtMTMuODk3IDIxLjc0Ni0xNC45MDV2LS41MDVjMC0yLjU5Mi0xLjIyNS0zLjgxNS00LjgyNC0zLjgxNS0zLjI0IDAtNi4zMzcgMS4yOTYtOS42NDkgMy43NDRsLTYuMTItNy40ODljNC4wMzItMy42IDkuODY0LTUuOTc3IDE4LjA3My01Ljk3NyAxMC40NDEgMCAxNi4wNTggMy42MDEgMTYuMDU4IDE0LjMzdjE0Ljk3NWMwIDMuOTYxLjI4OCA3LjQxNyAxLjE1MiA5LjI4OWgtMTMuNjgyem0tMS4wMDgtMTcuNDI2Yy01LjU0NS42NDgtOC40MjUgMi43MzYtOC40MjUgNi4wNDkgMCAyLjAxNyAxLjA4IDMuNDU2IDMuMzEyIDMuNDU2IDEuNzI4IDAgMy42LS45MzYgNS4xMTItMi4zNzZ2LTcuMTI5ek0zNTIuNzI2IDYyLjY0di00LjYwOGMtNC4yNDkgMy4zODUtOC4xMzcgNS40LTEyLjg5IDUuNC01LjY4OCAwLTguNTY4LTMuMDk3LTguNTY4LTkuNjQ4di0yOC45NDhoMTMuODk3djI1LjI3NGMwIDEuNTg0LjU3NiAyLjUyMSAyLjA4OCAyLjUyMXMzLjI0LS45MzcgNS40NzMtMi41MjF2LTI1LjI3NGgxMy44OTd2MzcuODA0aC0xMy44OTd6TTM3My4xIDYyLjY0di01My4yODVoMTMuODk3djUzLjI4NWgtMTMuODk3ek00MDcuODc3IDYzLjE0M2MtOC4xMzcgMC0xMy4xMDUtMy4yNC0xMy4xMDUtMTEuOTUzdi0xNi44NWgtMy45NnYtOS41MDVoMy45NnYtMTIuMzg0aDEzLjgyNXYxMi4zODVoNi44NDF2OS41MDVoLTYuODQxdjE0LjgzNGMwIDIuOTUyIDEuMzY4IDQuMTA0IDMuNjcyIDQuMTA0IDEuNTEzIDAgMi41OTMtLjA3MiAzLjUyOC0uMjg4djkuNzIxYy0xLjcyNy4yODgtNC4wMzIuNDMxLTcuOTIuNDMxeiIvPjwvc3ZnPg==\" alt=\"Greg Sarault\"> <div class=\"wrapper\"> <div class=\"intro-image\"> </div> <div class=\"intro-text\"> <p>I am a Philadelphia based Front End Web Developer</p> <p>HTML, CSS, and JavaScript are a second natrure to me, I enjoy critical thinking and coming up with elegant solutions for challenging problems.</p> <p>I have taken a log of pride in my work and the emersive story telling created from it.</p> </div> </div> </div>  <div class=\"next\" ng-click=\"navClick({part: 'spotlight'})\"></div> </section> <section class=\"spotlight row\"> <div class=\"heading\" nav-touch ng-click=\"navClick({part: 'spotlight'})\" part=\"spotlight\"> <h1>Spotlight Projects</h1> </div> <div class=\"wrapper\"> <div class=\"spotlight-intro\"> <h1>Spotlight Work</h1> <p>Here are a few recent projects that I have worked on.</p> </div> <div class=\"spot\"> <div class=\"spot-wrap longwood\"> <!-- <h2>Longwood Gardens.</h2> --> </div> </div> <div class=\"spot\"> <div class=\"spot-wrap ford\"> <!-- <h2>Gerald Ford for Museum</h2> --> </div> </div> <div class=\"spot\"> <div class=\"spot-wrap gates\"> <!-- <h2>Bill and Milinda Gates Foundation.</h2> --> </div> </div> </div> <div class=\"next\" ng-click=\"navClick({part: 'index'})\"></div> </section> <section class=\"project-index row\"> <div class=\"heading\" nav-touch ng-click=\"navClick({part: 'index'})\" part=\"index\"> <h1>Project Index</h1> </div> <div class=\"wrapper\"> <div class=\"project-intro\"> <h1>Project's I have worked on</h1> </div> <div class=\"p-list\"> <ul> <li id=\"first\"> <article class=\"p-item\"> <h1>Longwood Gardens New Heights</h1> <span class=\"date\">2015</span> <p>Angular</p> </article> </li> <li> <article class=\"p-item\"> <h1>Museum of the American Revolution</h1> <span class=\"date\">2016</span> <p>Web, Drupal, Gulp</p> </article> </li> <li> <article class=\"p-item\"> <h1>Gates Foundation</h1> <span class=\"date\">2016</span> <p>Multiple Projects, Node Server, Angular</p> </article> </li> <li> <article class=\"p-item\"> <h1>Florida Humanities Council</h1> <span class=\"date\">2016</span> <p>Angular, Touch Screen</p> </article> </li> <li> <article class=\"p-item\"> <h1>Please Touch Museum</h1> <span class=\"date\">2016</span> <p>Web App.</p> </article> </li> <li> <article class=\"p-item\"> <h1>Longwood Gardens</h1> <span class=\"date\">2015</span> <p>Style Guide, Web</p> </article> </li> <li> <article class=\"p-item\"> <h1>Albright Knox</h1> <span class=\"date\">2016</span> <p>Web, Drupal</p> </article> </li> <li> <article class=\"p-item\"> <h1>Mural Arts Program</h1> <span class=\"date\">2015</span> <p>Web, Drupal</p> </article> </li> <li> <article class=\"p-item\"> <h1>Gerald Ford Museum</h1> <span class=\"date\">2016</span> <p>9 Applications, Angular</p> </article> </li> <li> <article class=\"p-item\"> <h1>Institute for Advanced Study</h1> <span class=\"date\">2015</span> <p>Web Drupal</p> </article> </li> <li> <article class=\"p-item\"> <h1>Haruki Murakami</h1> <span class=\"date\">2015</span> <p>Web, Angular</p> </article> </li> <li> <article class=\"p-item\"> <h1>Pennsylvania Academy of the Fine Arts</h1> <span class=\"date\">2015</span> <p>Web</p> </article> </li> <li> <article class=\"p-item\"> <h1>Oceania</h1> <span class=\"date\">2014</span> <p>Web, Drupal</p> </article> </li> <li> <article class=\"p-item\"> <h1>Lapham's Quarterly</h1> <span class=\"date\">2014</span> <p>Web, Drupal</p> </article> </li> <li> <article class=\"p-item\"> <h1>Penn Center for Innovation</h1> <span class=\"date\">2014</span> <p>Web, WordPress</p> </article> </li> <li> <article class=\"p-item\"> <h1>The Franklin Institute</h1> <span class=\"date\">2013</span> <p>Web, Drupal</p> </article> </li> <li> <article class=\"p-item\"> <h1>Newsworks</h1> <span class=\"date\">2013</span> <p>Web</p> </article> </li> <li> <article class=\"p-item\"> <h1>Techcrunch</h1> <span class=\"date\">2013</span> <p>Web</p> </article> </li> <li> <article class=\"p-item\"> <h1>BearSkinRug</h1> <span class=\"date\">2013</span> <p>Web, Wordpress</p> </article> </li> <li> <article class=\"p-item\"> <h1>The Businessology Show</h1> <span class=\"date\">2013</span> <p>Web, Wordpress</p> </article> </li> <li> <article class=\"p-item\"> <h1>Pixelingo</h1> <span class=\"date\">2013</span> <p>Web</p> </article> </li> <li> <article class=\"p-item\"> <h1>Typedia</h1> <span class=\"date\">2013</span> <p>Web</p> </article> </li> </ul> </div> </div> </section> </section>"
  );

}]);
