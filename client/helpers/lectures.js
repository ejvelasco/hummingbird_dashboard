Template.lectures.onCreated(function lecturesOnCreated() {
  Meteor.subscribe('classes');
});
Template.lectures.helpers({
	classObj : function(){
		return UI.getData(); 
	}
});