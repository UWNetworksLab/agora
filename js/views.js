/**
* Provides Backbone views for use in Agora's UI
*
* @module views
*/

// Global app view
Agora.Views.App = Backbone.View.extend({
    initialize: function() {
        // display the current user's info
        new Agora.Views.User({ model: Agora.currentUser, el: $("#user-name")});
    }
});

// Current user view/template
Agora.Views.User = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.render, this);
    },

    render: function() {
        var template = _.template( "<%= displayName %>", this.model.toJSON() );
        this.$el.html(template);
    }
});

// Single file view in the table
Agora.Views.File = Backbone.View.extend({
    tagName: 'tr',

    template: template('file-view-template'),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
});

// Collection of files in a table format
Agora.Views.FileList = Backbone.View.extend({
    el: '.space',

    initialize: function() {
        vent.on('file:drop', this.dropFile, this);
        this.collection.on('add', this.addOne, this);
    },

    template: template('file-list-template'),

    render: function() {
        this.$el.html( this.template() );
        this.collection.each(this.addOne, this);
        return this;
    },

    dropFile: function(file) {
        var fileItem = new Agora.Models.File({
            isMetadata: true,
            name: escape(file.name),
            timestamp: new Date(),
            isFolder: false
        });
        this.collection.add(fileItem);
    },

    addOne: function(file) {
        var fileView = new Agora.Views.File({ model: file });
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
Agora.Views.Spaces = Backbone.View.extend({
    el: '.space',

    template: template('space-list-template'),

    render: function() {
        this.$el.html( this.template( {spaces: Agora.currentUser.get('spaceNames')} ) );
        return this;
    },

    events: {
        'click a': 'goToSpace'
    },

    goToSpace: function() {
        Agora.router.navigate('space', {trigger: true})
    }
});

// Display the toolbar
Agora.Views.Toolbar = Backbone.View.extend({
    el: '.btn-toolbar',

    template: template('toolbar-template'),

    render: function() {
        this.$el.html( this.template( this.options ) );
    }
});