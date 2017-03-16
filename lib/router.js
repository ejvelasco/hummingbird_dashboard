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
	name: 'home-instructor',
    template: 'home-instructor'
});
Router.route('/classes', {
	name: 'classes',
    template: 'classes'
});
Router.route('/:classId/lectures', {
	name: 'lectures', 
	template: 'lectures', 
	data: function(){
		var one = Classes.findOne({ _id: this.params.classId}); 
		console.log(one);
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
Router.onBeforeAction(requireLogin, {only: ['classes', 'home-instructor']});