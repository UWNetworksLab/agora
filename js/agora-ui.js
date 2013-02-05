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
