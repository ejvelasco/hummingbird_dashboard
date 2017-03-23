var d;
Comments = new Mongo.Collection('comments');
if (Meteor.isServer) {
  	// This code only runs on the server
	Meteor.publish('comments', function commentsPublication() {
    	return Comments.find({});
	});
	Meteor.methods({
	'Comments.insert' : function(commentInfo){
		d = new Date();
		commentInfo.date = d.getTime();
		Comments.insert(commentInfo);
	}
	});
}
