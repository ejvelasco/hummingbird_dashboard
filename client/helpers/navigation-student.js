var lectureObj;
Template.navigationStudent.onCreated(function navigationStudentOnCreated() {
  Meteor.subscribe('lectures');
});
Template.navigationStudent.helpers({
	lectureObj : function(){
		lectureObj = UI.getData();
		return lectureObj; 
	}
});