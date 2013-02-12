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

// Print file system table
/*
$("file-system").html(function () {
	Agora.getSpaceByName("Final Project");
	
	for (var i=0; i<fs.contents.length; i++) {
		document.write("<tr>");
		document.write("<td>"+"This is a test</td>");
		document.write("<td>directory</td>");
		document.write("<td>10/20/2012</td>");
		document.write("</tr>");
	}
});
*/