var d, dateString,questions, parsedDate;
Questions = new Mongo.Collection('questions');
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    questions = Questions.find({});
    return questions;
  });
}
Meteor.methods({
	'Questions.insert' : function(questionInfo) {
      d = new Date();
      // dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();
      // questionInfo.date = 'Asked on '+dateString;
      questionInfo.date = d.getTime();

	    Questions.insert(questionInfo);
   
    }
});