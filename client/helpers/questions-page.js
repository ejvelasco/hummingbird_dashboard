var questionText, questionId, questionDate, questions, currentDate, currentDate, datePosted, index;
function formatTime(duration) {
    duration = duration/1000;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    while(duration >= 3600*24){
      days++;
      duration = duration - 24*3600;
    }
    while(duration >= 3600){
      hours++;
      duration = duration-3600;
    }
    while(duration >= 60){
      minutes++
      duration = duration-60;
    }
    return {days: days, hours: hours, minutes: minutes};
}
Template.questionsPage.onCreated(function questionsOnCreated() {
  Meteor.subscribe('questions');
  document.title = "Questions - Live";
});
Template.questionsPage.helpers({
	lectureObj : function(){
		lectureObj = this;
		return lectureObj; 
	}, 
	questions : function(){
	currentDate = new Date();
	questions = Questions.find({}, {sort:{date: -1}}).map(function(question){
		datePosted = formatTime(currentDate.getTime() - question.date);
		if(datePosted.days === 1){
			question.datePosted = "1 day"; 
		} else if(datePosted.days > 1){
			question.datePosted = datePosted.days+" days" ;
		} else if(datePosted.hours === 1){
			question.datePosted = "1 hr";
		} else if(datePosted.hours > 1){
			question.datePosted = datePosted.hours+" hrs";
		}else if(datePosted.minutes >=0){
			question.datePosted = "1 min";
		} else if(datePosted.minutes > 1){
			question.datePosted = datePosted.minutes+" min";
		}
		return question;
	});
	return questions;
	}
});
Template.questionsPage.events({
	'click #new-question-submit': function(event){
		questionText = $('#question-input').val();
		Meteor.call('Questions.insert', {text: questionText});
	},
	'click #discard-new-question': function(event){
		$('.collapse').collapse('hide');
		$('#question-input').val('');
	},
	'click .question-menu-dd': function(event){
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
		$('#'+questionId+ ' .question-edit').animate({height: 'toggle'}, 200);
	} 

});
