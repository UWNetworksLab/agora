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
var FileSystemItemView = Backbone.View.extend({
	tagName: 'tr',
	className: 'fs-item',

	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template( "<td><%= name %></td><td>file</td><td><%= timestamp %></td>", this.model.toJSON() );
		this.$el.html(template);
	}

});


// Collection of files view
var FileSystemItemCollectionView = Backbone.View.extend({
	el: $("#file-system"),

	initialize: function() {
		this.render();
	},

	render: function() {

		var that = this;
		var list = this.collection.each(function(file){
			var fv = new FileSystemItemView({ model: file });
			that.$el.append(fv.el);
		});
		return this;
		}
	});

// Get the current space
var currentSpace = Agora.getSpaceByName("Final Project");

// Get the current file system
var fs = currentSpace.get("fileSystem");

// Create a file system view
var spaceView = new FileSystemItemCollectionView({collection: fs});


