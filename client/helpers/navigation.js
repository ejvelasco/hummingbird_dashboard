//helpers
Template.navigation.helpers({
    currentUserName: function(){
        // get name for menu
        name  = Meteor.user().profile.name;
        space = name.indexOf(' ');
        name = name.substring(0, space); 
        return name.toUpperCase();
    },
    currentUserEmail : function(){
        // get email for menu
        return Meteor.user().emails[0].address; 
    }
});
Template.navigation.events({
	'click .dropdown-menu li .sign-out': function(event,template){
		//log user out
        Meteor.logout();
	}, 
    'click #dd-control' : function(){
        //toggle sign out button
        if($('#dd').css('display') === 'none'){
            $('#dd').slideDown(200);
        } else{
        $('#dd').slideUp(200); 
    }
  }
});
var attemptedLogin = false;
//hide form on login
Tracker.autorun(function () {
    if(Meteor.userId()) {
        $('#user-form').hide();
    }
});