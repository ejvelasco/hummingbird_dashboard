// var infoToUpdate, var d, var dateString;
Classes = new Mongo.Collection('classes');
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('classes', function classesPublication() {
    return Classes.find({owner: this.userId});
  });
  // Meteor.publish('singleClass', function signleClassPublication(classId) {
  //   return Classes.findOne({_id: classId});
  // });
}
Meteor.methods({
	'Classes.insert' : function(classInfo) {
		// Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
      d = new Date();
      dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
      classInfo.dateString = dateString;
      classInfo.date = d.getTime();
      classInfo.owner = this.userId;
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
      d = new Date();
      dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
      classInfo.updated = dateString;
  		Classes.update({_id: classInfo.id}, {$set: {desc: classInfo.desc, updated: classInfo.updated, title: classInfo.title} });
  	},
    'Classes.findOne' : function(classId){
      if(! this.userId){
        throw new Meteor.Error('not-authorized');
      }
      Classes.find({_id: classId});
    },
    'Classes.updateLectureCount' : function(classId){
      if(! this.userId){
        throw new Meteor.Error('not-authorized');
      }
      Classes.update({_id: classId}, {$set:{lectures: Lectures.find({parent: classId}).count()}})
    }

});