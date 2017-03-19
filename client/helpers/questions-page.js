var questionText;
Template.questionsPage.onCreated(function classesOnCreated() {
  Meteor.subscribe('questions');
  document.title = "Questions - Live";
});
Template.questionsPage.helpers({
	lectureObj : function(){
		lectureObj = UI.getData();
		return lectureObj; 
	},
	questions : function(){
		return Questions.find({});
	}
});
Template.questionsPage.events({
	'click #new-question-submit': function(event){
		questionText = $('#question-input').val();
		console.log(questionText);
		Meteor.call('Questions.insert', {text: questionText });
	},
	'click #discard-new-question': function(event){
		$('.collapse').collapse('hide');
		$('#question-input').val('');
	},
	'click .question-menu-dd': function(event){
		var questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
		$('#'+questionId+ ' .question-edit').animate({height: 'toggle'}, 300);
	} 

})