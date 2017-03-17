var lectureTitle, lectureDesc, classObj, dateEntered;
Template.lectures.onCreated(function lecturesOnCreated() {
  Meteor.subscribe('classes');
  Meteor.subscribe('lectures');
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
	'click .edit': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		parentClass = '.'+event.currentTarget.parentNode.getAttribute('class');
		lectureTitle = $(parentId+' .title').text();
		lectureDesc = $(parentId+' .desc').text();
		date = $(parentId+' .date').text();
		// dateEntered = $('#date-picker');
		originalHeight = $(parentId).height();
		// console.log(parentId,parentClass, lectureTitle, lectureDesc, dateEntered);
		// console.log(originalHeight);
		// $(parentId).animate({height: '300px'}, 200 , function(){
		// 	$(parentId).text('');
		// 	$(parentId).append('<div class="caption"><a href="#" class="discard-edit"><span class="glyphicon glyphicon-remove"></span></a><input class="class-title" type="text" placeholder="Class Title" value="'+classTitle+'"></input></br><textarea placeholder="Class Description" class="class-desc">'+classDesc+'</textarea></br><button type="button" class="btn btn-primary update" onclick="this.blur();"><span class="glyphicon glyphicon-ok"></span> &nbsp;Update</button></div>');	
		// });
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
		$('#edit-lecture').fadeIn('slow');
	}
})