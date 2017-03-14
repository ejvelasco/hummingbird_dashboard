Template.classes.helpers({
	classes : function(){
		return Classes.find({}).fetch();

	}
});
Template.classes.events({
	'click #add': function(){
		$('#add').animate({height: '300px'}, 200, function(){
			setTimeout(function(){
				$('#add').text('');
			$('#add').append('<div class="caption"><a href="#"><span class="glyphicon glyphicon-remove"></span></a><input id="class-title" type="text" placeholder="Class Title"></input></br><textarea id="class-desc" placeholder="Class Description"></textarea></br><button id="create" type="button" class="btn btn-primary" onclick="this.blur();"><span class="glyphicon glyphicon-plus"></span> &nbsp;Create</button></div>');
			}, 200);
			setTimeout(function(){
				$('#add').removeClass('unclicked');
				$('#add').addClass('clicked');
				$('#add').removeAttr('id');
			},400);
		});
	},
	'click #create': function(){
		var title = $('#class-title').val();
		var desc =  $('#class-desc').val();
		Classes.insert({title: title, desc: desc, date:  new Date() });	
	}
})
 