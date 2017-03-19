var lectureTitle, lectureDesc, classObj, dateEntered, parentClasses, lectureId;
Template.lectures.onCreated(function lecturesOnCreated() {
  Meteor.subscribe('classes');
  Meteor.subscribe('lectures');
  document.title = "HB - Lectures";
});
Template.lectures.helpers({
	classObj : function(){
		classObj = UI.getData();
		return classObj; 
	}, 
	lectures : function(){
		return Lectures.find({parent: classObj._id });
	}
});
Template.lectures.events({
	'click .discard-create': function(){
		$('.collapse').collapse('hide');
		setTimeout(function(){
			$('.lecture-title-create').val('');
			$('.lecture-desc-create').val('');
			$('#date-picker').val('');	
		}, 500);
	},
	'click #create-lecture': function(){
		//IMPLEMENT QUESTION URL
		lectureTitle = $('.lecture-title-create').val();
		lectureDesc =  $('.lecture-desc-create').val();
		lectureDate = $('#date-picker').val();
		console.log(lectureTitle, lectureDesc, lectureDate);
		Meteor.call('Lectures.insert', {parent:classObj._id, title: lectureTitle, desc: lectureDesc, date: lectureDate, created: new Date(), dateParsed: Date.parse(new Date()) });
		Meteor.call('Classes.updateLectureCount', classObj._id);
		$('.collapse').collapse('hide');
		setTimeout(function(){
			$('.lecture-title-create').val('');
			$('.lecture-desc-create').val('');
			$('#date-picker').val('');	
		}, 500);
	},
	'click .delete': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		grandParentObj = $(parentId).parent();
		$(grandParentObj).animate({opacity: 0, height: 0}, 400, function(){
			id = parentId.replace(/#/g, '');
			Meteor.call('Lectures.remove', id);
			Meteor.call('Classes.updateLectureCount', classObj._id);
		});	
	},
	'click .edit': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		lectureTitle = $(parentId + '.thumbnail .title').text();
		lectureDesc =  $(parentId + '.thumbnail .desc').text();
		lectureDate = $(parentId + '.thumbnail .lecture-date').text();

		lectureDate = lectureDate.replace('Date: ', '');
		lectureTitle = lectureTitle.substring(0, lectureTitle.indexOf('Date:'));
		lectureTitle = lectureTitle.replace(/\s+$/, '');
		$('.lecture-title-edit').val(lectureTitle);
		$('.lecture-desc-edit').val(lectureDesc);
		$('#edit-lecture .date-picker').val(lectureDate);
		$('#edit-lecture, .mask').fadeIn(300);
		$('#edit-lecture .thumbnail').addClass(parentId);
		// $('body').css('filter', 'brightness(.8)');
	},
	'click #discard-edit-lecture': function(event){
		$('#edit-lecture, .mask').fadeOut(300);
		setTimeout(function(){
			$('.lecture-title-edit').val('');
			$('.lecture-desc-edit').val('');
		}, 500);
	}, 
	'click #update-lecture': function(event){
		parentClasses = $(event.currentTarget.parentNode.parentNode).attr("class").split(' ');
		lectureId = parentClasses[1].replace('#', '');
		lectureTitle = $('.thumbnail .lecture-title-edit').val();
		lectureDesc =  $('.thumbnail .lecture-desc-edit').val();
		lectureDate = $('.thumbnail .date-picker').val();
		Meteor.call('Lectures.update', {id: lectureId, infoToUpdate: {title: lectureTitle, desc: lectureDesc, date: lectureDate}});	
		$('#edit-lecture, .mask').fadeOut(300);
		setTimeout(function(){
			$('.lecture-title-edit').val('');
			$('.lecture-desc-edit').val('');
		}, 500);
	},
	'click .caption .title': function(event){
		parentId = (event.currentTarget.parentNode).parentNode.getAttribute('id');
		Router.go('/'+parentId+'/questions-page');
	}
});