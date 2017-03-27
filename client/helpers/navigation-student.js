//declare variables
var lectureObj;
//on created
Template.navigationStudent.onCreated(function navigationStudentOnCreated() {
	Meteor.subscribe('lectures');
});
//helpers
Template.navigationStudent.helpers({
	lectureObj : function(){
		//get lecture info from URL
		lectureObj = UI.getData();
		//set variable to be used in other templates
		Session.set("lectureTitle", lectureObj.title);
		Session.set("lectureId", lectureObj._id);
		return lectureObj; 
	},
	questionsPage: function(){
		//do not show new question button on resources page
		return Session.get('questionsPage');
	}
});