'use strict';

/**
 * @ngdoc service
 * @name sitesApp.ngWeek
 * @description
 * # ngWeek
 */
angular.module('angularWeek', [])
  .factory('angularWeek', function () {
    var angularWeek = function(){};

    angularWeek.prototype.setDate = function (date) {
        this.startDate = moment(date).weekday(0);
        this.endDate   = moment(date).weekday(6);
    }
    angularWeek.prototype.next = function () {
      return this.setDate(this.startDate.add(7, 'days'));
    }
    angularWeek.prototype.prev = function (week) {
      return this.setDate(this.endDate.subtract(7, 'days'));
    }
    // Allow to get non singleton here
    function create(date) {

      // Set a default if none passed.
      if(typeof date === 'undefined'){
        date = moment.utc()
      };

      //Zero out the ours mins and secs
      if(typeof date === 'moment') {
        date = date.hours(0).minutes(0).seconds(0).milliseconds(0);
      }

      var week = new angularWeek(date);
      week.setDate(date);
      return week;
    }
    return {
      create:create
    };
  });
