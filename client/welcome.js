Template.welcome.events({
	'click #welcome-container': function(event,template){
		$('#user-form').fadeOut('slow');
		$('#welcome-container').css('filter', '');
		$('.navbar-default').css('filter', '');
		$('.navbar-default').css('background-color', '');
	},
})
Accounts.onLogin(function(){
	Router.go('/home-instructor');
	$('.navbar-default').css('filter', '');
	$('#logo').removeClass('welcome');
	$('#logo').addClass('home');
	$('.navbar-default').css('background-color', '#F8F8F8');
});
Accounts.onLogout(function(){
	Router.go('/');
	$('#logo').removeClass('home');
	$('#logo').addClass('welcome');
	$('.navbar-default').css('background-color', 'transparent');
});