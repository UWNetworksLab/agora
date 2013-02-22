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
	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template( "...", this.model.toJSON() );
		this.$el.html(template);
	}

});
