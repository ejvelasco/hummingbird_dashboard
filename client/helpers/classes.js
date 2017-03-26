var classTitle, classDesc, parentId, grandParentObj, parentClass,id, date, classInfo, originalHeight, lectureCount;

Template.classes.onCreated(function classesOnCreated() {
  Meteor.subscribe('classes');
  document.title = "HB - Classes";
});

Template.classes.helpers({
	classes : function(){
		return Classes.find({}, {sort: {date: -1}}).fetch();

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
	},
	'click .discard-edit': function(){
		
	},
	'click .delete': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		grandParentObj = $(parentId).parent();
		$(grandParentObj).animate({opacity: 0, height: 0}, 400, function(){
			id = parentId.replace(/#/g, '');
			Meteor.call('Classes.remove', id);
		});

	},
	'click .update': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		parentClass = '.'+event.currentTarget.parentNode.getAttribute('class');
		classTitle = $(parentId+' .class-title').val();
		classDesc = $(parentId+' .class-desc').val();
		// Meteor.call('Classes.update', {id: id, title: classTitle, desc: classDesc});
	}, 
	'click .caption .title': function(event){
		parentId = (event.currentTarget.parentNode).parentNode.getAttribute('id');
		Router.go('/'+parentId+'/lectures');
	}
});
 