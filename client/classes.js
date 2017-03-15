var title, desc, classTitle, classDesc, parentId, grandParentObj, parentClass,id, date;

Template.classes.helpers({
	classes : function(){
		return Classes.find({}, {sort: {dateParsed: -1}}).fetch();

	}
});
Template.classes.events({
	'click #create': function(){
		title = $('.class-title-create').val();
		desc =  $('.class-desc-create').val();
		$('.collapse').collapse('hide');
		Classes.insert({title: title, desc: desc, date: new Date(), dateParsed:  Date.parse(new Date()) });	
	},
	'click .discard-create': function(){
		$('.collapse').collapse('hide');
		$('.class-title-create').val('');
		$('.class-desc-create').val('');
	},
	'click .edit': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		parentClass = '.'+event.currentTarget.parentNode.getAttribute('class');
		classTitle = $(parentId+' .title').text();
		classDesc = $(parentId+' .desc').text();
		date = $(parentId+' .date').text();
		$(parentId).animate({height: '300px'}, 200 , function(){
			$(parentId).text('');
			$(parentId).append('<div class="caption"><a href="#" class="discard-edit"><span class="glyphicon glyphicon-remove"></span></a><input class="class-title" type="text" placeholder="'+classTitle+'" value="'+classTitle+'"></input></br><textarea placeholder="'+classDesc+'" class="class-desc">'+classDesc+'</textarea></br><button type="button" class="btn btn-primary update" onclick="this.blur();"><span class="glyphicon glyphicon-ok"></span> &nbsp;Update</button></div>');	
		});
	},
	'click .discard-edit': function(){
		$(parentId).animate({height: '150px'}, 200 , function(){
			$(parentId).text('');
			$(parentId).append('<div class="caption"><a href="#" class="delete"><span class="glyphicon glyphicon-remove"></span></a><a href="#" class="edit"><span class="glyphicon glyphicon-pencil"></span></a><p class="title">'+classTitle+'</p><p class="desc">'+classDesc+'</p><p class= "date">'+date+'</p> </div>');	
		});
	},
	'click .delete': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		grandParentObj = $(parentId).parent();
		$(grandParentObj).animate({opacity: 0, height: 0}, 400, function(){
			id = parentId.replace(/#/g, '');
			Classes.remove({_id: id});
		});	
	},
	'click .update': function(event){
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		parentClass = '.'+event.currentTarget.parentNode.getAttribute('class');
		classTitle = $(parentId+' .class-title').val();
		classDesc = $(parentId+' .class-desc').val();
		$(parentId).animate({height: '150px'}, 200 , function(){
			$(parentId).text('');
			$(parentId).append('<div class="caption"><a href="#" class="delete"><span class="glyphicon glyphicon-remove"></span></a><a href="#" class="edit"><span class="glyphicon glyphicon-pencil"></span></a><p class="title">'+classTitle+'</p><p class="desc">'+classDesc+'</p><p class= "date">'+'Updated on '+new Date()+'</p> </div>');	
		});
		id = parentId.replace(/#/g, '');
		Classes.update({_id: id}, { $set: {title: classTitle, desc: classDesc, updated: new Date() } });
	}
});
 