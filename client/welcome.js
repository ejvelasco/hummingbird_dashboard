Template.welcome.events({
	'click #welcome-container': function(event,template){
		$('#user-form').fadeOut('slow');
		$('#welcome-container').css('filter', '');
	},
})
Accounts.onLogin(function(){
	Router.go('/home-instructor');
});
Accounts.onLogout(function(){
	Router.go('/');
});