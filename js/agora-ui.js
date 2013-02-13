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
var UserView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template( "<%= displayName %>", this.model.toJSON() );
		this.$el.html(template);
	}

});

var currentUser = Agora.getCurrentUser();
var currentUserView = new UserView({ model: currentUser, el: $("#user-name")})

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