var one;
if(Meteor.isServer){
var wolfram = require('wolfram-alpha').createClient('8EA3RR-JGLKVRG3X6');
var queryWolfram = function(res){
		wolfram.query("integrate 2x", function (err, result) {
		  if (err){ 
		  	throw err;
		  }else{
		  	res.end(JSON.stringify({cool: "cooler"}));
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
Router.route('/query', {where: 'server'}).get(function () {
    // NodeJS request object
     var request = this.request;

     // NodeJS  response object
     var response = this.response;
     response.setHeader('Content-Type', 'application/json');
     queryWolfram(response);
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