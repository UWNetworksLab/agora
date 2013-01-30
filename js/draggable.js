/**
 * Example file showcasing the HTML5 DnD API
 *
 * @module draggable-example
 */

// Allows us to change styling for when a drag starts
$("[draggable]").bind('dragstart', function() {
	$(this).css("opacity",'0.4');
});

// Allows for data transfer
$("[draggable]").bind('dragover', function(e) {
	// Overrides browser behavior
	if(e.originalEvent.preventDefault) {
		e.originalEvent.preventDefault();
	}

	return false;
});

// Action if we drag onto another object
$("[draggable]").bind('dragenter', function() {
	$(this).css("border", "3px dashed black");
});

// Action if we drag onto another object and then leave
$("[draggable]").bind('dragleave', function() {
	$(this).css("border", "");
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
$("#loadFile").bind('dragover', function(e) {
	// Overrides browser behavior
	if(e.originalEvent.preventDefault) {
		e.originalEvent.preventDefault();
	}

	// Explicitly specifies copy
	e.originalEvent.dataTransfer.dropEffect = 'copy';
	return false;
});

$("#loadFile").bind('drop', function(e) {
	// Overrides the browser's default drop action
	if(e.originalEvent.stopPropagation) {
		e.originalEvent.stopPropagation();
	}
	
	var files = e.originalEvent.dataTransfer.files;
	var output = "";
	for(var i = 0, f; f = files[i]; i++) {
		output += escape(f.name) + " - " + f.type +
			" (" + f.size + " bytes, last modified " +
			(f.lastModifiedDate ?
			f.lastModifiedDate.toLocaleDateString() :
			'n/a') + ")\n";
	}
	$("#files").val(output);
	return false;
});
