Template.welcome.onCreated(function welcomeOnCreated(){
	document.title = "HB - Welcome";
});
Template.welcome.events({
	'click .mask': function(event,template){
		$('#user-form').fadeOut(300);
		$('.mask').fadeOut(300);;
	},
});
// Accounts.onLogout(function(){
// 	Router.go('/');
// });
// Accounts.onLogin(function(){
// 	Router.go('/classes');
// })