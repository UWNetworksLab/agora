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
        vent.on('user:update', this.getSpaces, this);
    },

    getSpaces: function() {
        spacelist = Agora.currentUser.get('spaceNames');
        _.each(spacelist, function(space) {
            var tempSpace = new Agora.Models.Space({id: space});
            tempSpace.fetch();
            spaces.add(tempSpace);
        });
    }
});

// Current user view/template
Agora.Views.User = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.update, this);
    },

    update: function() {
        vent.trigger('user:update');
        this.render();
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
        'dragstart': 'dragout',
        'click .deleteFile': 'delete',
        'click .renameFile': 'rename',
    },

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    delete: function() {
        console.log("delete this file: " + this.model.attributes.name);
        //need to display a modal window to confirm delete
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

    rename: function() {
        console.log("rename this file: " + this.model.attributes.name);
        this.$('.fileName').html(template('rename-file-template'));
        // need to set focus on the text box
        // need to confirm with a 'return' keypress
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
        vent.on('file:new', this.newFile, this);
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
    },

    updateFileContents: function(f) {
        f.file.set("contents", f.url);
        this.collection.add(f.file);
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
    },

    newFile: function(file) {

    }

});

// Represents a single space that the user has access to
Agora.Views.Space = Backbone.View.extend({
    tagName: 'a',

    attributes: {
        'href': ''
    },

    className: 'thumbnail span3',

    template: _.template("<img data-src=\"holder.js/300x300\" src=\"http://dummyimage.com/300x200\" />"),

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    render: function() {
        this.$el.html( this.template() );
        this.$el.attr('href', '#/space/' + this.model.attributes.name);
        return this;
    }
});

// Represents all of the spaces the user has access to
Agora.Views.Spaces = Backbone.View.extend({
    el: '.space',

    template: _.template("<div id=\"space-list\" class=\"thumbnails\"></div>"),

    events: {
        'click a': 'goToSpace'
    },

    initialize: function() {
        this.collection.on('add', this.addOne, this);
    },

    render: function() {
        this.$el.html( this.template() );
        this.collection.each(this.addOne, this);
        return this;
    },

    addOne: function(space) {
        Agora.currentUser.get('spaceNames').push(space.get('name'));
        var spaceView = new Agora.Views.Space({ model: space });
        $('#space-list').append(spaceView.render().el);
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
