//declare variables
var lectureTitle, lectureDesc, classObj, dateEntered, parentClasses, lectureId, lectureObjs, longurl; 
//on created
Template.lectures.onCreated(function lecturesOnCreated() {
	//subscribe to collections
	Meteor.subscribe('classes');
  	Meteor.subscribe('lectures');
  	//set title
  	document.title = "HB - Lectures";
});
//on rendered 
Template.lectures.onRendered(function lecturesOnRendered(){
	$('#lectures-container').fadeIn(600);
});
//helpers
Template.lectures.helpers({
	classObj : function(){
		//get class ID from URL
		classObj = UI.getData();
		return classObj; 
	}, 
	lectures : function(){
		//find the lectures from the right class and sort by date
		lectureObjs = Lectures.find({parent: classObj._id }, {sort: {date: -1}});
		return lectureObjs
	}
});
//events
Template.lectures.events({
	'click .discard-create': function(){
		//collapse create div
		$('.collapse').collapse('hide');
		//clear create input for next use
		setTimeout(function(){
			$('.lecture-title-create').val('');
			$('.lecture-desc-create').val('');
			$('#date-picker').val('');	
		}, 500);
	},
	'click #create-lecture': function(){
		//get lecture info
		lectureTitle = $('.lecture-title-create').val();
		lectureDesc =  $('.lecture-desc-create').val();
		lectureDate = $('#date-picker').val();
		//insert method and update lectures count
		Meteor.call('Lectures.insert', {parent:classObj._id, title: lectureTitle, desc: lectureDesc, date: lectureDate, created: new Date(), dateParsed: Date.parse(new Date()), lectureCount: 0 });
		Meteor.call('Classes.updateLectureCount', classObj._id);
		//collapse create div
		$('.collapse').collapse('hide');
		//clear create input for next use
		setTimeout(function(){
			$('.lecture-title-create').val('');
			$('.lecture-desc-create').val('');
			$('#date-picker').val('');	
		}, 500);
	},
	'click .delete': function(event){
		//get id and parent of lecture to delete
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		grandParentObj = $(parentId).parent();
		//remove method and update lectures count
		$(grandParentObj).animate({opacity: 0, height: 0}, 400, function(){
			id = parentId.replace(/#/g, '');
			Meteor.call('Lectures.remove', id);
			Meteor.call('Classes.updateLectureCount', classObj._id);
		});	
	},
	'click .edit': function(event){
		//get info of lecture to edit
		parentId = '#'+(event.currentTarget.parentNode).parentNode.getAttribute('id');
		lectureTitle = $(parentId + '.thumbnail .title').text();
		lectureDesc =  $(parentId + '.thumbnail .desc').text();
		//separate date from the title
		lectureDate = $(parentId + '.thumbnail .lecture-date').text();
		lectureDate = lectureDate.replace('On: ', '');
		lectureTitle = lectureTitle.substring(0, lectureTitle.lastIndexOf(' '));
		lectureTitle = lectureTitle.replace(/\s+$/, '');
		//set the values of edit input
		$('.lecture-title-edit').val(lectureTitle);
		$('.lecture-desc-edit').val(lectureDesc);
		$('#edit-lecture .date-picker').val(lectureDate);
		// fade in mask
		$('#edit-lecture, .mask').fadeIn(300);
		$('#edit-lecture .thumbnail').addClass(parentId);
	},
	'click #discard-edit-lecture': function(event){
		//fade out edit and mask divs
		$('#edit-lecture, .mask').fadeOut(300);
		//clear edit input for next use
		setTimeout(function(){
			$('.lecture-title-edit').val('');
			$('.lecture-desc-edit').val('');
		}, 500);
	}, 
	'click #update-lecture': function(event){
		// get lecture info from edit input
		parentClasses = $(event.currentTarget.parentNode.parentNode).attr("class").split(' ');
		lectureId = parentClasses[1].replace('#', '');
		lectureTitle = $('.thumbnail .lecture-title-edit').val();
		lectureDesc =  $('.thumbnail .lecture-desc-edit').val();
		lectureDate = $('.thumbnail .date-picker').val();
		//update method
		Meteor.call('Lectures.update', {id: lectureId, infoToUpdate: {title: lectureTitle, desc: lectureDesc, date: lectureDate}});	
		//fade out mask and edit divs
		$('#edit-lecture, .mask').fadeOut(300);
		//clear edit values for next use
		setTimeout(function(){
			$('.lecture-title-edit').val('');
			$('.lecture-desc-edit').val('');
		}, 500);
	},
	'click .caption .title': function(event){
		//route to lecture questions page
		parentId = (event.currentTarget.parentNode).parentNode.getAttribute('id');
		Router.go('/'+parentId+'/questions-page');
	}, 
	'click .mask': function(event){
		//fade out mask and edit divs and clear edit input for next use
		setTimeout(function(){
			$('.lecture-title-edit').val('');	
			$('.lecture-desc-edit').val('');
		}, 500);
		$('.mask').fadeOut(400);
		$('#edit-lecture').fadeOut(300)
	},
	'click .shorten-url': function(event){
		// get id of lecture  
		parentId = (event.currentTarget.parentNode).getAttribute('id');
		// shorten request
		var shortenUrl = function() {
		 	var request = gapi.client.urlshortener.url.insert({
			    resource: {
			      	longUrl: 'http://localhost:3000/'+parentId+'/questions-page'
			    }
			});
		  	request.execute(function(response) {
		    	var shortUrl = response.id;
		    	$('#'+parentId+' .short-url').val(shortUrl).fadeIn(400);
		  	});
		};
		//set api key and load url shortener
		var googleApiLoaded = function() {
		  	gapi.client.setApiKey("AIzaSyCuMEnVcF_qQ02xI49nbWmEuU_IqQopLkU")
		  	gapi.client.load("urlshortener", "v1", shortenUrl);
		};
		window.googleApiLoaded = googleApiLoaded;
		//get google client
		$(document.body).append('<script src="https://apis.google.com/js/client.js?onload=googleApiLoaded"></script>');
	}
});