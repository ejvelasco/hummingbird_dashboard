var one;
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
		return [Meteor.subscribe('questions'), Meteor.subscribe('comments')];
	},
	data: function(){
		Meteor.subscribe('lectures', this.params.lectureId);
		one = Lectures.findOne({ _id: this.params.lectureId}); 
		return one;
	}
});
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