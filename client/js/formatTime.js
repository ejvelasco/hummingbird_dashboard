function formatTime(duration) {
    duration = duration/1000;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var datePosted = 0;
    while(duration >= 3600*24){
      days++;
      duration = duration - 24*3600;
    }
    while(duration >= 3600){
      hours++;
      duration = duration-3600;
    }
    while(duration >= 60){
      minutes++
      duration = duration-60;
    }
    datePosted = {days: days, hours: hours, minutes: minutes};
    if(datePosted.days === 1){
    	datePosted = "1 day"; 
    } else if(datePosted.days > 1){
    	datePosted = datePosted.days+" days" ;
    } else if(datePosted.hours === 1){
    	datePosted = "1 hr";
    } else if(datePosted.hours > 1){
    	datePosted = datePosted.hours+" hrs";
    }else if(datePosted.minutes >=0 && datePosted.minutes <= 1){
    	datePosted = "1 min";
    } else if(datePosted.minutes > 1){
    	datePosted = datePosted.minutes+" min";
    }
    return datePosted;
}