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
      dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();
      questionInfo.dateString = dateString;
      questionInfo.date = d.getTime();
	    Questions.insert(questionInfo);
   
    }, 
    'Questions.remove' : function(questionId){
       Questions.remove({_id: questionId});
    }, 
    'Questions.update' : function(questionInfo){
      d = new Date();
      d = d.getTime();
      questionInfo.updated = d;
      Questions.update({ _id: questionInfo.id}, { $set: {text: questionInfo.text, updated: questionInfo.updated}});
    }, 
    'Questions.updateStarCount' : function(questionInfo){
      console.log(questionInfo.amount);
      Questions.update({_id: questionInfo.id}, {$inc: { stars: questionInfo.amount}});
    }
});