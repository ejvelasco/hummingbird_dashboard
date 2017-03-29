//rendered
Template.resources.onRendered(function resourcesOnCreated() {
    //show spinner
    loadingTemplate: 'loading',
    //set title
    document.title = "Lecture Resources";
    Session.set('questionsPage', false);
    //identify student if needed
    if(localStorage.studentId === undefined){
	   localStorage.studentId = uuidV4();
    }
    //youtube package
    var YouTube = require('youtube-node');
    var youTube = new YouTube();
    //set key and add parameters
    youTube.setKey('AIzaSyBAnTal247NdVZx27NILoAvohopbLugPXs');
    youTube.addParam('order', 'viewCount');
    // youtube request
    youTube.search(Session.get('lectureTitle'), 6, function(error, result) {
        if (error) {
            console.log(error);
        }
        else {
            var videos = result.items;
            for(video in videos){
                // append videos to video container
      	        $('#resources-container').append('<iframe width="300" class="resource-video" height="250" src="https://www.youtube.com/embed/'+videos[video].id.videoId+'" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>');
            }
        }
        //hide spinner and show videos
        setTimeout(function(){
    	   $('.spinner-container').fadeOut('slow');
    	   $('#resources-container').fadeIn('slow');
        }, 1500)
  });
});