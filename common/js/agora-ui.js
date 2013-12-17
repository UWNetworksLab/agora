/**
 * This file provides the UI functionality for Agora.
 *
 * @module agora-ui
 */
var isSpace = false;

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
$("#dropzone").bind('dragover', function(e) {
	// Overrides browser behavior
	if(e.originalEvent.preventDefault) {
		e.originalEvent.preventDefault();
	}

	// Explicitly specifies copy
	e.originalEvent.dataTransfer.dropEffect = 'copy';
	return false;
});

$("#dropzone").bind('drop', function(e) {
	// Overrides the browser's default drop action
	if(e.originalEvent.stopPropagation) {
		e.originalEvent.stopPropagation();
	}

	var files = e.originalEvent.dataTransfer.files;
	for(var i = 0, f; f = files[i]; i++) {
		vent.trigger('file:drop', f);
	}
	return false;
});

// Listen to social UI Events
function userUpdateUI() {
  // If the page hasn't been loaded before, the router has not been initialized.
  // Initialize it now
  if(!Agora.RouterInstance && Agora.User.Spaces) {
    Agora.RouterInstance = new Agora.Router();
    Backbone.history.start();
  }
  $("#user-name").text(Agora.User.displayName);
}

// Saves the given model while simultaneously updating the UI
function syncModelUI(model, funcName) {
  $("#status-bar").addClass("in");
  var result = model[funcName]();
  result.done(function() {
    $("#status-bar").removeClass("in");
  });
}
