// declare variables
var one;
//only require npm packages in server
if(Meteor.isServer){
	var wolfram = require('wolfram').createClient("8EA3RR-JGLKVRG3X6");
	//function used to query wolfram
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
//wait on accounts service
Router.configure({
	waitOn:function(){
    	Accounts.loginServicesConfigured();
	}	
})
//define routes
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
//restful routes
Router.route('queryWolfram/:queryString', {where: 'server'}).get(function () {
     var request = this.request;
     var response = this.response;
     var queryString = decodeURIComponent(this.params.queryString);
     queryWolfram(response, queryString);
})
// layout
Router.configure({
    layoutTemplate: 'layout'
});
//protect pages that require log in
var requireLogin = function() {
		if (!Meteor.user() && !Meteor.loggingIn()) {
	    	Router.go('/');
	  	} else {
	    	this.next();
		}
}
var alreadyLoggedIn = function(){
	if(Meteor.user()){
		Router.go('/classes');
	} else{
		this.next();
	}
	
}
Router.onBeforeAction(alreadyLoggedIn, {only: ['welcome']});
Router.onBeforeAction(requireLogin, {only: ['classes', 'homeInstructor', 'lectures']});