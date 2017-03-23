Template.navigationWelcome.helpers({
  currentUser: function() {
  	return Meteor.user();
  },
  currentUserName: function(){
  	var name  = Meteor.user().profile.name;
  	var space = name.indexOf(' ');
  	name = name.substring(0, space); 
  	return name;
  },
  currentUserEmail : function(){
  	return Meteor.user().emails[0].address;	
  }
})
Template.navigationWelcome.events({
	'click #sign-in': function(event,template){
		$('#user-form').fadeIn(300);
    $('.mask').fadeIn(300);
	},
	'click .dropdown-menu li .sign-out': function(event,template){
		Meteor.logout();
		$('#user-form').fadeOut('slow');
	}


})
Tracker.autorun(function () {
 if(Meteor.user()) {
      $('#user-form').hide();
    }
});