Questions = new Mongo.Collection('questions');
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    return Questions.find({});
  });
}
Meteor.methods({
	'Questions.insert' : function(questionInfo) {
		// Make sure the user is logged in before inserting a task
	    // if (! this.userId) {
	    //   throw new Meteor.Error('not-authorized');
	    // }
      // console.log(questionInfo);
	    Questions.insert({text: questionInfo.text});
    },
});