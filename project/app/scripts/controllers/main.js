'use strict';

/**
 * @ngdoc function
 * @name gsarault44githubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gsarault44githubioApp
 */
angular.module('gsarault44githubioApp').controller('MainCtrl', function ($scope, $rootScope, $location, $window, $timeout) {

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

});
