Router.configure({
	waitOn:function(){
    	Accounts.loginServicesConfigured();
	}	
})

Router.route('/', {
	name: 'home-instructor',
    template: 'home-instructor'
});
Router.route('/classes', {
	name: 'classes',
    template: 'classes'
});
Router.route('/account', {
	name: 'account',
    template: 'account'
});
Router.configure({
    layoutTemplate: 'main'
});