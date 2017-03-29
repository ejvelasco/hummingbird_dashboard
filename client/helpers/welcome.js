// on created 
Template.welcome.onCreated(function welcomeOnCreated(){
	//set doc title
	document.title = "HB - Welcome";
});
// on rendered
Template.welcome.onRendered(function welcomeOnRendered(){
	//fade in effect
	$('#welcome-message').fadeIn(600);
	$('#welcome-title').fadeIn(600);
	$('.marvel-device').fadeIn(600);
});
// events
Template.welcome.events({
	'click .mask': function(event,template){
		//fade mask on click
		$('#user-form').fadeOut(300);
		$('.mask').fadeOut(300);;
	},
});

