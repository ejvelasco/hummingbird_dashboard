//declare variables
var classTitle, classDesc, parentId, grandParentObj, parentClass,id, date, classInfo, originalHeight, lectureCount;
//on created
Template.classes.onCreated(function classesOnCreated() {
	//subscribe to classes collection
	Meteor.subscribe('classes');
	//set title
	document.title = "HB - Classes";
});
//on rendered
Template.classes.onRendered(function classesOnRendered(){
	//fade in effect
	$('#classes-container').fadeIn(600);
});
//helpers
Template.classes.helpers({
	classes : function(){
		//return classes and sort by most recently added
		return Classes.find({}, {sort: {date: -1}});
	}
});
//events
Template.classes.events({
	'click #create': function(){
		//get new class title and description
		classTitle = $('.class-title-create').val();
		classDesc =  $('.class-desc-create').val();
		//inert method
		Meteor.call('Classes.insert', {title: classTitle, desc: classDesc, lectures: 0 });
		//collapse new class div
		$('.collapse').collapse('hide');
		//clear new class div input for next use
		setTimeout(function(){
			$('.class-title-create').val('');
			$('.class-desc-create').val('');
		},500);
	},
	'click .discard-create': function(){
		//collapse new class div
		$('.collapse').collapse('hide');
		//clear new class div input for next use
		setTimeout(function(){
			$('.class-title-create').val('');
			$('.class-desc-create').val('');
		},500);
	},
	'click .edit': function(event){
		// get info of desired class
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		parentClass = '.'+event.currentTarget.parentNode.getAttribute('class');
		classTitle = $(parentId+' .title').text();
		classDesc = $(parentId+' .desc').text();
		date = $(parentId+' .date').text();
		//set desired class info in edit div
		$('#class-title-update').val(classTitle);
		$('#class-desc-update').text(classDesc);
		//fade in mask and edit div
		$('.mask').fadeIn(300);
		$('#class-edit').fadeIn(300);
	},
	'click .discard-edit': function(){
		//fade out edit and mask divs
		$('#class-edit').fadeOut(300);
		$('.mask').fadeOut(400);
		//clear edit div values for next use
		setTimeout(function(){
			$('#class-title-update').val('');
			$('#class-desc-update').text('');
		});
	},
	'click .mask': function(){
		//fade out mask and edit divs
		$('#class-edit').fadeOut(300);
		$('.mask').fadeOut(400);
		// clear edit and div values for next use
		setTimeout(function(){
			$('#class-title-update').val('');
			$('#class-desc-update').text('');
		}, 400);
	},
	'click .delete': function(event){
		//get the id and parent of the class to delete
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		grandParentObj = $(parentId).parent();
		//animate and remove method
		$(grandParentObj).animate({opacity: 0, height: 0}, 400, function(){
			id = parentId.replace(/#/g, '');
			Meteor.call('Classes.remove', id);
		});
	},
	'click #update': function(event){
		//get class info from edit div
		classTitle = $('#class-title-update').val();
		classDesc = $('#class-desc-update').val();
		// fade out edit and mask divs
		$('#class-edit').fadeOut(300);
		$('.mask').fadeOut(400);
		id = parentId.replace(/#/g, '');
		//clear edit div input for next use
		setTimeout(function(){
			$('#class-title-update').val('');
			$('#class-desc-update').text('');
		}, 400);
		//update method
		Meteor.call('Classes.update', {id: id, title: classTitle, desc: classDesc});
	}, 
	'click .caption .title': function(event){
		//get class id and redirect
		parentId = (event.currentTarget.parentNode).parentNode.getAttribute('id');
		Router.go('/'+parentId+'/lectures');
	}
});
 