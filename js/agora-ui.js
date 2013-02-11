/**
 * This file provides the UI functionality for Agora.
 *
 * @module agora-ui
 */

// Allow items to be selectable
$(".fs-item").click(function () {
	$(this).toggleClass("selected");
});

// Get the current Username
$("#user-name").html(Agora.getCurrentUser().displayName);

/*$("file-system").html(function () {
	Agora.getSpace
	for (var i=0; i<???.length; i++) {
		document.write(cars[i] + "<br>");
} 
});*/