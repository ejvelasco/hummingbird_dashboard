// declare variables
var d, dateString,questions, parsedDate, commentId;

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
        // set date and insert
        d = new Date();
        dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();
        questionInfo.dateString = dateString;
        questionInfo.date = d.getTime();
	    Questions.insert(questionInfo);
    }, 
    'Questions.remove' : function(questionId){
        //remove question
        Questions.remove({_id: questionId});
    }, 
    'Questions.update' : function(questionInfo){
        // set date of update and update
        d = new Date();
        d = d.getTime();
        questionInfo.updated = d;
        Questions.update({ _id: questionInfo.id}, { $set: {text: questionInfo.text, updated: questionInfo.updated}});
    }, 
    'Questions.updateStarCount' : function(questionInfo){
        // update star count   
        Questions.update({_id: questionInfo.id}, {$inc: { stars: questionInfo.amount}});
    }, 
    'Questions.insertComment' : function(questionInfo){
        // set date and push comment into comment array
        d = new Date();
        questionInfo.commentDate = d.getTime();
        commentId = new Meteor.Collection.ObjectID()._str;
        Questions.update({_id: questionInfo.id}, { $push: {"comments": {text: questionInfo.commentText, date: questionInfo.commentDate, id: commentId} } });
    }, 
    'Questions.deleteComment' : function(questionInfo){
        //pull comment from comments array
        Questions.update(
            {_id: questionInfo.id}, 
            { $pull: { "comments": { id: questionInfo.commentId } } }
        )
    }
});