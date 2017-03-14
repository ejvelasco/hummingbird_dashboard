Template.classes.helpers({
	classes : function(){
		console.log(Classes.find({}).fetch()[0])
		return Classes.find({}).fetch();

	}
});
 