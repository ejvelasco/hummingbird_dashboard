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
		//return classes and sort by date
		return Classes.find({}, {sort: {date: -1}});
	}
});
Template.classes.events({
	'click #create': function(){
		classTitle = $('.class-title-create').val();
		classDesc =  $('.class-desc-create').val();
		Meteor.call('Classes.insert', {title: classTitle, desc: classDesc, lectures: 0 });
		$('.collapse').collapse('hide');
		setTimeout(function(){
			$('.class-title-create').val('');
			$('.class-desc-create').val('');
		},500);
	},
	'click .discard-create': function(){
		$('.collapse').collapse('hide');
		setTimeout(function(){
			$('.class-title-create').val('');
			$('.class-desc-create').val('');
		},500);
	},
	'click .edit': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		parentClass = '.'+event.currentTarget.parentNode.getAttribute('class');
		classTitle = $(parentId+' .title').text();
		classDesc = $(parentId+' .desc').text();
		date = $(parentId+' .date').text();
		$('#class-title-update').val(classTitle);
		$('#class-desc-update').text(classDesc);
		$('.mask').fadeIn(300);
		$('#class-edit').fadeIn(300);

	},
	'click .discard-edit': function(){
		$('#class-edit').fadeOut(300);
		$('.mask').fadeOut(400);
		setTimeout(function(){
			$('#class-title-update').val('');
			$('#class-desc-update').text('');
		});
	},
	'click .mask': function(){
		$('#class-edit').fadeOut(300);
		$('.mask').fadeOut(400);
		setTimeout(function(){
			$('#class-title-update').val('');
			$('#class-desc-update').text('');
		}, 400);
	},
	'click .delete': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		grandParentObj = $(parentId).parent();
		$(grandParentObj).animate({opacity: 0, height: 0}, 400, function(){
			id = parentId.replace(/#/g, '');
			Meteor.call('Classes.remove', id);
		});

	},
	'click #update': function(event){
		classTitle = $('#class-title-update').val();
		classDesc = $('#class-desc-update').val();
		$('#class-edit').fadeOut(300);
		$('.mask').fadeOut(400);
		id = parentId.replace(/#/g, '');
		setTimeout(function(){
			$('#class-title-update').val('');
			$('#class-desc-update').text('');
		}, 400);
		Meteor.call('Classes.update', {id: id, title: classTitle, desc: classDesc});
	}, 
	'click .caption .title': function(event){
		parentId = (event.currentTarget.parentNode).parentNode.getAttribute('id');
		Router.go('/'+parentId+'/lectures');
	}
});
 