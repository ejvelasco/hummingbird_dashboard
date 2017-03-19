Template.welcome.onCreated(function welcomeOnCreated(){
	document.title = "HB - Welcome";
});
Template.welcome.events({
	'click #welcome-container': function(event,template){
		$('#user-form').fadeOut('slow');
		$('#welcome-container').css('filter', '');
		$('.navbar-default').css('filter', '');
		$('.navbar-default').css('background-color', '');
	},
})
Accounts.onLogin(function(){
	// Router.go('/home-instructor');
});
Accounts.onLogout(function(){
	Router.go('/');
});