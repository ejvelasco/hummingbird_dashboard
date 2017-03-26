var one;
if(Meteor.isServer){
var wolfram = require('wolfram-alpha').createClient('8EA3RR-JGLKVRG3X6');
var queryWolfram = function(res, queryStr){
		wolfram.query(queryStr, function (err, result) {
		  if (err){ 
		  	throw err;
		  }else{
		  	res.end(JSON.stringify(result));
		  }
		});
}
}
Router.configure({
	waitOn:function(){
    	Accounts.loginServicesConfigured();
	}	
})

Router.route('/', {
	name: 'welcome',
    template: 'welcome'
});
Router.route('/home-instructor', {
	name: 'homeInstructor',
    template: 'homeInstructor'
});
Router.route('/classes', {
	name: 'classes',
    template: 'classes'
});
Router.route('/:classId/lectures', {
	name: 'lectures', 
	template: 'lectures', 
	data: function(){
		one = Classes.findOne({ _id: this.params.classId}); 
		return one;
	}
});
Router.route('/:lectureId/questions-page', {
	name: 'questionsPage', 
	template: 'questionsPage', 
	loadingTemplate: 'loading',
	waitOn: function(){
		return [Meteor.subscribe('questions')];
	},
	data: function(){
		Meteor.subscribe('lectures', this.params.lectureId);
		one = Lectures.findOne({ _id: this.params.lectureId}); 
		return one;
	}
});
Router.route('/:lectureId/resources', {
	name: 'resource', 
	template: 'resources', 
	loadingTemplate: 'loading',
	waitOn: function(){
		return [Meteor.subscribe('questions')];
	},
	data: function(){
		Meteor.subscribe('lectures', this.params.lectureId);
		one = Lectures.findOne({ _id: this.params.lectureId}); 
		return one;
	}
});
Router.route('queryWolfram/:queryString', {where: 'server'}).get(function () {
     var request = this.request;
     var response = this.response;
     var queryString = decodeURIComponent(this.params.queryString);
     queryWolfram(response, queryString);
})
Router.configure({
    layoutTemplate: 'layout'
});
var requireLogin = function() {
		if (!Meteor.user() && !Meteor.loggingIn()) {
	    	Router.go('/')
	  	} else {
	    	this.next();
		}
}
var alreadyLoggedIn = function(){
	if(Meteor.user()){
		Router.go('/home-instructor');
	} else{
		this.next();
	}
	
}
Router.onBeforeAction(alreadyLoggedIn, {only: ['welcome']});
Router.onBeforeAction(requireLogin, {only: ['classes', 'homeInstructor', 'lectures']});