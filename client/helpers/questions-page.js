var questionText, questionId, questionDate, questions, currentDate, currentDate, index, row, identifier, studentId, ownQuestion, starClass, idx, alreadyStarred, comments, commentText, lastQuestionId;
var uuidV4 = require('uuid/v4');
var starredByUser = [];
var newQuestionId;
var re;
starredByUser = document.cookie;
idx = starredByUser.indexOf('=');
starredByUser = starredByUser.substring(idx+1, starredByUser.length).split(',');
if(starredByUser[0] === ''){
	starredByUser = [];
}
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
Template.questionsPage.onCreated(function questionsPageOnCreated() {
  loadingTemplate: 'loading',
  document.title = "Questions - Live";
  if(localStorage.studentId === undefined){
	localStorage.studentId = uuidV4();
  }
  $('#new-question-btn').fadeIn(400);
  setTimeout(function(){
  	$('#questions-container').fadeIn(400);
  }, 200);
});
Template.questionsPage.helpers({
	questions : function(){
	currentDate = new Date();
	questions = Questions.find({parentLecture: Session.get("lectureId")}, {sort:{date: -1}}).map(function(question){
		question.isOwned = (localStorage.studentId === question.owner);
		question.datePosted = formatTime(currentDate.getTime() - question.date);
		question.updatedOn = formatTime(currentDate.getTime() - question.updated);
		question.starred = document.cookie;
		idx = question.starred.indexOf('=');
		question.starred = question.starred.substring(idx+1, question.starred.length).split(',').find((id) => id === question._id);
		question.commentCounter = 0;
		question.comments.map(function(comment){
			question.commentCounter++;
			comment.datePosted = formatTime(currentDate.getTime() - comment.date);
			return comment;
		});
		return question;
	});
	return questions;
	}
});
Template.questionsPage.events({
	'click #new-question-submit': function(event){
		questionText = $('#question-input').val();
		Meteor.call('Questions.insert', {text: questionText, owner: localStorage.studentId, parentLecture: Session.get("lectureId"), stars: 0, comments: []});
		Meteor.call('Lectures.updateQuestionCount', {lectureId: Session.get("lectureId")});			
		$('#question-input').val('');
		$('.collapse').collapse('hide');	
	},
	'keypress #new-question-ask input': function (event) {
	    if(event.which === 13){
	    	questionText = $('#question-input').val();
	    	Meteor.call('Questions.insert', {text: questionText, owner: localStorage.studentId, parentLecture: Session.get("lectureId"), stars: 0, comments: []});
	    	Meteor.call('Lectures.updateQuestionCount', {lectureId: Session.get("lectureId")});			
	    	$('#question-input').val('');
	    	$('.collapse').collapse('hide');	
	    }
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
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
		row = $(event.currentTarget.parentNode.parentNode.parentNode.parentNode).animate({opacity: 0, height: 'toggle'}, 300);
		setTimeout(function(){
			Meteor.call('Questions.remove', questionId);
			Meteor.call('Lectures.updateQuestionCount', {lectureId: Session.get("lectureId")});	
		}, 300);
	},
	'click .question-item-edit': function(event){
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
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
		$('#wolfram-response').fadeOut(300);
		$('.mask').fadeOut(300);
		setTimeout(function(){
			$('#question-input').val('');
			$('#question-edit-input').val('');
		}, 500);
	}, 
	'click .like': function(event){
		starClass = $(event.currentTarget).attr('class');
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
		alreadyStarred = starredByUser.find(function(id) { return id === questionId; });
		if(alreadyStarred){
			$(event.currentTarget).removeClass('glyphicon-star');
			$(event.currentTarget).addClass('glyphicon-star-empty');
			idx = starredByUser.indexOf(questionId);
			starredByUser.splice(idx, 1);
			document.cookie = 'starredByUser='+starredByUser;
			Meteor.call('Questions.updateStarCount', {id: questionId, amount: -1});
		} else{
			$(event.currentTarget).addClass('glyphicon-star');
			$(event.currentTarget).removeClass('glyphicon-star-empty');
			starredByUser.push(questionId);
			document.cookie = 'starredByUser='+starredByUser;
			Meteor.call('Questions.updateStarCount', {id: questionId, amount: 1});	
		}
	},
	'click .comment-toggle': function(event){
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
		$('#'+questionId+' .comments').animate({height: 'toggle', opacity: 'toggle'}, 300);
	},
	'keypress .comment input': function (event) {
		if(event.which === 13){
			commentText = $(event.currentTarget).val();
			Meteor.call('Questions.insertComment', {id: questionId, commentText: commentText, });
			$(event.currentTarget).val('');
		}
	},
	'click .comment input': function(event){
		questionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
	},
	'click .comment-delete': function(event){
		newQuestionId = $(event.currentTarget.parentNode.parentNode.parentNode).attr('id');
		commentId = $(event.currentTarget.parentNode).attr('id');
		Meteor.call('Questions.deleteComment', {id: newQuestionId, commentId: commentId});
	}, 
	'click #wolfram-logo':function(event){
		re  = new RegExp('/', 'g');
		questionText = encodeURIComponent($('#question-input').val());
		$('#questions-page-spinner').fadeIn('fast');
		$.get( "/queryWolfram/"+questionText, function(data) {
		  var responseObjs = JSON.parse(data);
		  for(obj in responseObjs){
		  		$('#responses-container').append('<div class="response-row"><p>'+responseObjs[obj].title+':</p><img src="'+responseObjs[obj].subpods[0].image+'"></div>')
		  		// console.log(responseObjs[obj].subpods[0].image);
		  }
		  $('.mask').fadeIn(500);
		  $('#wolfram-response').fadeIn(500);
		  $('.collapse').collapse('hide');
		  $('#questions-page-spinner').fadeOut('fast');
		});
	},
	'click #wolfram-response-discard': function(event){
		$('#wolfram-response').fadeOut(300);
		$('.mask').fadeOut(300);
		setTimeout(function () {
			$('#responses-container').html('');
			$('#question-input').val('');
		}, 300)
	}
});
