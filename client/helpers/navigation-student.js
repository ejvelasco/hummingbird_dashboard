var lectureObj;
Template.navigationStudent.onCreated(function navigationStudentOnCreated() {
  Meteor.subscribe('lectures');
});
Template.navigationStudent.helpers({
	lectureObj : function(){
		lectureObj = UI.getData();
		Session.set("lectureTitle", lectureObj.title);
		Session.set("lectureId", lectureObj._id);
		return lectureObj; 
	}
});