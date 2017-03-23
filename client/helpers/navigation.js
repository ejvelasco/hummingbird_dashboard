Template.navigation.helpers({
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
Template.navigation.events({
	'click #sign-in': function(event,template){
		$('#user-form').fadeIn(300);
    $('.mask').fadeIn(300);
	},
	'click .dropdown-menu li .sign-out': function(event,template){
		Meteor.logout();
		$('#user-form').fadeOut('slow');
	}, 
  'click #dd-control' : function(){
    if($('#dd').css('display') === 'none'){
      $('#dd').slideDown(200);
    } else{
     $('#dd').slideUp(200); 
    }
  }

})
Tracker.autorun(function () {
 if(Meteor.user()) {
      $('#user-form').hide();
    }
});