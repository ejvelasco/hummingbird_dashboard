Template.resources.onRendered(function resourcesOnCreated() {
  loadingTemplate: 'loading',
  document.title = "Lecture Resources";
  Session.set('questionsPage', false);
  if(localStorage.studentId === undefined){
	localStorage.studentId = uuidV4();
  }
  var YouTube = require('youtube-node');

  var youTube = new YouTube();

  youTube.setKey('AIzaSyBAnTal247NdVZx27NILoAvohopbLugPXs');
  youTube.addParam('order', 'viewCount');
  youTube.search(Session.get('lectureTitle'), 6, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      var videos = result.items;
      for(video in videos){
      	$('#resources-container').append('<iframe width="300" class="resource-video" height="250" src="https://www.youtube.com/embed/'+videos[video].id.videoId+'" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>');
      }
    }

    setTimeout(function(){
    	$('.spinner-container').fadeOut('slow');
    	$('#resources-container').fadeIn('slow');
    }, 1500)
  });

});