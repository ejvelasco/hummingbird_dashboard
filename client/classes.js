Template.classes.helpers({
	classes : function(){
		return Classes.find({}).fetch();

	}
});
Template.classes.events({
	'click #add': function(){
		$('#add').animate({height: '300px'}, 200, function(){
			$('#add').text('');
			$('#add').append('<div class="caption"><a href="#"><span class="glyphicon glyphicon-remove"></span></a><input type="text" placeholder="Class Title"></input></br><textarea placeholder="Class Description"></textarea></br><button id="create" type="button" class="btn btn-primary" onclick="this.blur();"><span class="glyphicon glyphicon-plus"></span> &nbsp;Create</button></div>');
			setTimeout(function(){
				$('#add').removeClass('unclicked');
				$('#add').addClass('clicked');
				$('#add').removeAttr('id');
			},400);
		});
		
	}
})
 