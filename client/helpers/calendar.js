// on render
Template.calendar.onRendered(function calendarOnRendered() {
	//format date picker
	$('.date-picker').datepicker({
	    todayBtn: "linked",
	    orientation: "bottom left"
	});
});