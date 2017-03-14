Template.classes.helpers({
	classes : function(){
		return Classes.find({}).fetch();

	}
});
Template.classes.events({
	'click #add': function(){
		$('#add').animate({height: '400px'}, 200, function(){
			$('#add').text('');
			$('#add').append('<div class="caption"><input type="text" placeholder="Class Title"></input></br><textarea placeholder="Class Description"></textarea></div>');
			setTimeout(function(){
				$('#add').removeClass('unclicked');
				$('#add').addClass('clicked');
				$('#add').removeAttr('id');
			},400);
		});
		
	}
})
 