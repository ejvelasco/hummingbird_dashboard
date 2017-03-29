// declare variables
var d, dateString;
//classes collection
Classes = new Mongo.Collection('classes');
if (Meteor.isServer) {
    // This code only runs on the server, publish classes
    Meteor.publish('classes', function classesPublication() {
        return Classes.find({owner: this.userId});
    });
}
Meteor.methods({
    'Classes.insert' : function(classInfo) {
	// Make sure the user is logged in before inserting a class
	    if (! this.userId) {
	       throw new Meteor.Error('not-authorized');
	    }
        //set date 
        d = new Date();
        dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
        classInfo.dateString = dateString;
        classInfo.date = d.getTime();
        //set owner
        classInfo.owner = this.userId;
	    Classes.insert(classInfo);
    },
    'Classes.remove' : function(classId) {
    //Make sure the user is logged in before removing a class
    	if (! this.userId) {
	       throw new Meteor.Error('not-authorized');
	    }
    	Classes.remove(classId);
  	},
  	'Classes.update' : function(classInfo) {
  		if( ! this.userId){
        //Make sure the user is logged in before updating a class
  			throw new Meteor.Error('not-authorized');
  		}
        //set date of update
        d = new Date();
        dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
        classInfo.updated = dateString;
  		Classes.update({_id: classInfo.id}, {$set: {desc: classInfo.desc, updated: classInfo.updated, title: classInfo.title} });
  	},
    'Classes.findOne' : function(classId){
        if(! this.userId){
        //Make sure the user is logged in before finding a class
            throw new Meteor.Error('not-authorized');
        }
        Classes.find({_id: classId});
    },
    'Classes.updateLectureCount' : function(classId){
        if(! this.userId){
        //Make sure the user is logged in before updatind a class lecture count
            throw new Meteor.Error('not-authorized');
        }
        Classes.update({_id: classId}, {$set:{lectures: Lectures.find({parent: classId}).count()}})
    }
});