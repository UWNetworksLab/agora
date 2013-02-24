/**
 * This file provides the UI functionality for Agora.
 *
 * @module agora-ui
 */

// Template helper method
// Allows templates to be compiled by simply calling template(id)
var template = function(id) {
	return _.template( $('#' + id).html() );
};

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
var currentUserView = new UserView({ model: currentUser, el: $("#user-name")});

// Single file view in the table
var FileView = Backbone.View.extend({
	tagName: 'tr',

	template: template('file-view-template'),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},
});

// Collection of files in a table format
var FileList = Backbone.View.extend({
	el: '.space',

	template: template('file-list-template'),

	render: function() {
		this.$el.html( this.template() );
		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(file) {
		var fileView = new FileView({ model: file });
		$('#file-list').append(fileView.render().el);
	},

	events: {
		'click tr': 'highlight'
	},

	highlight: function(e) {
		$(e.currentTarget).toggleClass("selected");
	}

});

// Present the users spaces
var SpacesList = Backbone.View.extend({
	el: '.space',

	template: template('space-list-template'),

	render: function() {
		this.$el.html( this.template( {spaces: currentUser.get('spaceNames')} ) );
		return this;
	},

	events: {
		'click a': 'goToSpace'
	},

	goToSpace: function() {
		router.navigate('space', {trigger: true})
	}
});

// Display the toolbar
var ToolbarView = Backbone.View.extend({
	el: '.btn-toolbar',

	template: template('toolbar-template'),

	render: function() {
		this.$el.html( this.template( this.options ) );
	}
});


/*
 * Router
 */
var Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'space/:id': 'space'
	},

	index: function() {
		var spacesList = new SpacesList();
		var toolbar = new ToolbarView( {isSpace: false} );
		spacesList.render();
		toolbar.render();
	},

	space: function(id) {
		var currentSpace = Agora.getSpaceByName(id);
		var fs = currentSpace.get('fileSystem');
		var fileList = new FileList({ collection: fs });
		var toolbar = new ToolbarView( {isSpace: true });
		fileList.render();
		toolbar.render();
	}
});

new Router();
Backbone.history.start();