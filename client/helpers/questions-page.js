var questionText, questionId, questionDate, questions, currentDate, currentDate, index, row, identifier, studentId, ownQuestion, starClass, idx;
var uuidV4 = require('uuid/v4');
var starredByUser = [];
function formatTime(duration) {
    duration = duration/1000;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var datePosted = 0;
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
    datePosted = {days: days, hours: hours, minutes: minutes};
    if(datePosted.days === 1){
    	datePosted = "1 day"; 
    } else if(datePosted.days > 1){
    	datePosted = datePosted.days+" days" ;
    } else if(datePosted.hours === 1){
    	datePosted = "1 hr";
    } else if(datePosted.hours > 1){
    	datePosted = datePosted.hours+" hrs";
    }else if(datePosted.minutes >=0 && datePosted.minutes <= 1){
    	datePosted = "1 min";
    } else if(datePosted.minutes > 1){
    	datePosted = datePosted.minutes+" min";
    }
    return datePosted;
}
Template.questionsPage.onCreated(function questionsOnCreated() {
  Meteor.subscribe('questions');
  document.title = "Questions - Live";
  if(localStorage.studentId === undefined){
	localStorage.studentId = uuidV4();
  }

});
Template.questionsPage.helpers({
	questions : function(){
	currentDate = new Date();
	questions = Questions.find({parentLecture: Session.get("lectureId")}, {sort:{date: -1}}).map(function(question){
		question.isOwned = localStorage.studentId === question.owner;
		question.datePosted = formatTime(currentDate.getTime() - question.date);
		question.updatedOn = formatTime(currentDate.getTime() - question.updated);
		return question;
	});
	return questions;
	}
});
Template.questionsPage.events({
	'click #new-question-submit': function(event){
		questionText = $('#question-input').val();
		Meteor.call('Questions.insert', {text: questionText, owner: localStorage.studentId, parentLecture: Session.get("lectureId"), stars: 0});
		Meteor.call('Lectures.updateQuestionCount', {lectureId: Session.get("lectureId")});			
		$('#question-input').val('');
		$('.collapse').collapse('hide');	
	},
	'click #discard-new-question': function(event){
		$('.collapse').collapse('hide');
		$('#question-input').val('');
	},
	'click .question-menu-dd': function(event){
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
		$('#'+questionId+ ' .question-edit').animate({height: 'toggle'}, 200);
	}, 
	'click .question-item-delete': function(event){
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode.parentNode).attr('id');
		row = $(event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode).animate({opacity: 0, height: 'toggle'}, 300);
		setTimeout(function(){
			Meteor.call('Questions.remove', questionId);
			Meteor.call('Lectures.updateQuestionCount', {lectureId: Session.get("lectureId")});	
		}, 300);
	},
	'click .question-item-edit': function(event){
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode.parentNode).attr('id');
		questionText = $('#'+questionId+ '.thumbnail .question').text();
		$('#question-edit-input').val(questionText);
		$('#'+questionId+ ' .question-edit').animate({height: 'toggle'}, 200);
		$('#question-edit').fadeIn(300);
		$('.mask').fadeIn(300);
	},
	'click .question-edit-discard': function(event){
		$('#question-edit').fadeOut(300);
		$('.mask').fadeOut(300);
	}, 
	'click #question-edit-submit': function(event){
		questionText = $('#question-edit-input').val();
		Meteor.call('Questions.update', {id: questionId, text: questionText});
		$('#question-edit').fadeOut(300);
		$('.mask').fadeOut(300);
		setTimeout(function(){
			$('#question-edit-input').val('');
		}, 500);
	},
	'click .mask': function(event){
		$('#question-edit').fadeOut(300);
		$('.mask').fadeOut(300);
		setTimeout(function(){
			$('#question-edit-input').val('');
		}, 500);
	}, 
	'click .like span': function(event){
		starClass = $(event.currentTarget).attr('class');
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode.parentNode).attr('id');
		var alreadyStarred = starredByUser.find(function(id) { return id === questionId; });
		if(alreadyStarred){
			idx = starredByUser.indexOf(questionId);
			starredByUser = starredByUser.splice(1, idx);
			localStorage.starredByUser = starredByUser;
			// console.log(starredByUser);
			$(event.currentTarget).removeClass('glyphicon-star');
			$(event.currentTarget).addClass('glyphicon-star-empty');
			Meteor.call('Questions.updateStarCount', {id: questionId, amount: -1});
		} else{
			$(event.currentTarget).addClass('glyphicon-star');
			$(event.currentTarget).removeClass('glyphicon-star-empty');
			Meteor.call('Questions.updateStarCount', {id: questionId, amount: 1});	
			starredByUser.push(questionId);
			localStorage.starredByUser = starredByUser;
		}
	}

});
