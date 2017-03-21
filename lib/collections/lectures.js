Lectures = new Mongo.Collection('lectures');
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('lectures', function lecturesPublication(lectureId) {
  	if(this.userId){
    	return Lectures.find({owner: this.userId},{sort: {dateParsed: -1}});
  	}else{
  		return Lectures.find({_id: lectureId},{sort: {dateParsed: -1}});
  	}
  });
}
Meteor.methods({
	'Lectures.insert' : function(lectureInfo) {
		// Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
      lectureInfo.owner = this.userId;
	  Lectures.insert(lectureInfo);
    }, 
    'Lectures.remove' : function(lectureId){
    	// Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
	    Lectures.remove(lectureId)
    }, 
    'Lectures.update' : function(lectureInfo){
    	// Make sure the user is logged in before inserting a task
	    if (! this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
	    Lectures.update({_id: lectureInfo.id}, {$set: lectureInfo.infoToUpdate})
    }, 
    'Lectures.updateQuestionCount' : function(lectureInfo){
      Lectures.update({_id: lectureInfo.lectureId}, {$set: {lectureCount: Questions.find({parentLecture: lectureInfo.lectureId}).count() }});
    }
});