/**
 * This file provides the UI functionality for Agora.
 *
 * @module agora-ui
 */

// Allow items to be selectable
$(".fs-item").click(function () {
	$(this).toggleClass("selected");
});

// Current user view/template
var UserView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template( "<%= displayName %>", this.model.toJSON() );
		this.$el.html(template);
	}

});

// Get the current User
var currentUser = Agora.getCurrentUser();
var currentUserView = new UserView({ model: currentUser, el: $("#user-name")})

// File view/template
var FileView = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template( "<%= name %>", this.model.toJSON() );
		this.$el.html(template);
	}

});

var SpaceView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template("")

	}
});

// Get the current space
var currentSpace = Agora.getSpaceByName("Final Project");

// var currentSpaceView = new SpaceView({ model: currentSpace, el: $("#fileList") });

var fs = currentSpace.get("fileSystem");


var file1 = new FileView({ model: fs.at(0), el: $("#fileList") });
var file2 = new FileView({ model: fs.at(1), el: $("#fileList") });

// $("fileList").html(thisFileViewTerribleName);
