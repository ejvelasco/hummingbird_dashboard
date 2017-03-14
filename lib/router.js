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
Router.configure({
    layoutTemplate: 'layout'
});
var requireLogin = function() {
		if (! Meteor.user()) {
			this.layout('error');
	    	this.render('accessDenied');
	  	} else {
	    	this.next();
		}
}
Router.onBeforeAction(requireLogin, {only: ['classes', 'home-instructor']});