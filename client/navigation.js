Template.navigation.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
})
Template.navigation.events({
	'click #sign-in': function(event,template){
		$('#user-form').fadeIn('slow');
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