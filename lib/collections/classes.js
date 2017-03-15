var infoToUpdate;
Classes = new Mongo.Collection('classes');
Meteor.methods({
	'Classes.insert' : function(classInfo) {
		// Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
	    Classes.insert(classInfo);
    },
    'Classes.remove' : function(classId) {
    	//Make sure the user is logged in before removing a task
    	if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
    	Classes.remove(classId);
  	},
  	'Classes.update' : function(classInfo) {
  		if( ! this.userId){
  			throw new Meteor.Error('not-authorized');
  		}
  		classInfo.info.updated = new Date ();
  		infoToUpdate = classInfo.info;
  		Classes.update({_id: classInfo.id}, {$set: infoToUpdate});
  	}
});