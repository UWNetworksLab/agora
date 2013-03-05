/**
 * This file provides the UI functionality for Agora.
 *
 * @module agora-ui
 */

/*
 * Quick drag and drop test, needs to be cleaned up and
 * incorporated into backbone if possible
 */

 // Allows for data transfer
 $("[draggable]").bind('dragover', function(e) {
 	// Overrides browser behavior
 	if(e.originalEvent.preventDefault) {
 		e.originalEvent.preventDefault();
 	}

 	return false;
 });

 // Handles the drop event for when you let go of the drag
 $("[draggable]").bind('drop', function(e) {
 	// Overrides the browser's default drop action
 	if(e.originalEvent.stopPropagation) {
 		e.originalEvent.stopPropagation();
 	}

 	return false;
 });

 // Code that executes when the drag is finished
 $("[draggable]").bind('dragend', function() {
 	$("[draggable]").css("border", "");
 	$("[draggable]").css("opacity",'');
 });

 /* Load File Example */
 $("#file-list").bind('dragover', function(e) {
 	// Overrides browser behavior
 	if(e.originalEvent.preventDefault) {
 		e.originalEvent.preventDefault();
 	}

 	// Explicitly specifies copy
 	e.originalEvent.dataTransfer.dropEffect = 'copy';
 	return false;
 });

 $("#file-list").bind('drop', function(e) {
 	// Overrides the browser's default drop action
 	if(e.originalEvent.stopPropagation) {
 		e.originalEvent.stopPropagation();
 	}

 	var files = e.originalEvent.dataTransfer.files;
 	var output = "";
 	for(var i = 0, f; f = files[i]; i++) {
 		// output += escape(f.name) + " - " + f.type +
 		// 	" (" + f.size + " bytes, last modified " +
 		// 	(f.lastModifiedDate ?
 		// 	f.lastModifiedDate.toLocaleDateString() :
 		// 	'n/a') + ")\n";
 		vent.trigger('file:drop', f);
 	}
 	return false;
 });
