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

    attributes: {
        'draggable': 'true',
        'downloadurl': ''
    },

    template: template('file-view-template'),

    events: {
        'dragstart': 'dragout'
    },

    initialize: function() {
        this.model.bind('change', this.render, this);
    },

    dragout: function(e) {
        console.log(this.$el.attr('downloadurl'));
        e.originalEvent.dataTransfer.setData("DownloadURL", this.$el.attr('downloadurl'));
    },

    buildURL: function() {
        var file = this.model.attributes;
        var url = file.type + ":" + file.name + ":" + file.contents;
        return url;
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        var url = this.buildURL();
        this.$el.attr('downloadurl', url);
        return this;
    },
});

// Collection of files in a table format
Agora.Views.FileList = Backbone.View.extend({
    el: '.space',

    initialize: function() {
        vent.on('file:drop', this.dropFile, this);
        vent.on('file:read', this.updateFileContents, this);
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
            name: escape(file.name),
            isMetadata: false,
            timestamp: new Date(),
            isFolder: false,
            type: file.type
        });

        // read the file contents into a data url
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            var result = e.target.result;
            vent.trigger('file:read', {'file': fileItem,'url': result});
          };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);

        this.collection.add(fileItem);
    },

    updateFileContents: function(f) {
        f.file.set("contents", f.url);
        f.file.save();
    },

    addOne: function(file) {
        file.save();
        var fileView = new Agora.Views.File({ model: file });
        $('#file-list').append(fileView.render().el);
    },

    events: {
        'click tbody tr': 'highlight'
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