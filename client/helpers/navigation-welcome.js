// declare variables
var name, space;
// helpers
Template.navigationWelcome.helpers({
    currentUser: function() {
  	    return Meteor.user();
    }
});
//events
Template.navigationWelcome.events({
    'click #sign-in': function(event){
	      // show sign in form and fade in mask
        $('#user-form').fadeIn(300);
        $('.mask').fadeIn(300);
	}
});