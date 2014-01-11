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
        vent.on('space:update', this.getFiles, this);
    },

    getSpaces: function() {
        spacelist = Agora.currentUser.get('spaceNames');
        _.each(spacelist, function(space) {
            var tempSpace = new Agora.Models.Space({id: space});
            tempSpace.fetch();
            spaces.add(tempSpace);
        });
    },

    getFiles: function() {
        console.log("getFiles");
        filelist = Agora.currentSpace.get('fileSystem');
        _.each(filelist, function(file) {
            var tempFile = new Agora.Models.File({id: file});
            tempFile.fetch();
            fs.add(tempFile);
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

    template: Agora.Template.FileView,

    events: {
        'dragstart': 'dragout',
        'click .deleteFile': 'deleteFile',
        'click .renameFile': 'rename',
    },

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.unrender, this);
    },

    deleteFile: function() {
        var modalWindow = $('#deleteFile');
        modalWindow.modal('toggle');
        var file = this.model;
        $('#deleteFile .modal-body').text("");
        $('#deleteFile .modal-body').text("Are you sure you want to delete " + file.attributes.name + "?");
        $('#deleteFile .btn-primary').bind('click', function() {
            file.destroy();
            modalWindow.modal('toggle');
        });

    },

    dragout: function(e) {
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

    unrender: function() {
        this.remove();
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        var url = this.buildURL();
        this.$el.attr('downloadurl', url);
        return this;
    }
});

// Collection of files in a table format
Agora.Views.FileList = Backbone.View.extend({
    el: '.space',

    initialize: function() {
        vent.on('file:drop', this.dropFile, this);
        vent.on('file:read', this.updateFileContents, this);
        vent.on('file:new', this.newFile, this);
        //vent.on('file:delete', this.deleteFile, this);
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.reset, this);
    },

    template: Agora.Template.FileList,

    reset: function() {
        console.log('resetfn');
    },

    render: function() {
        $("#dropzone").show();
        console.log(this.collection);
        this.$el.html( this.template() );
        this.collection.each(this.addOne, this);
        return this;
    },

    // deleteFile: function(file) {
    //     var modalWindow = $('#deleteFile')
    //     modalWindow.modal('toggle');
    //     $('#deleteFile .modal-body').text("")

    //     $('#deleteFile .modal-body').text("Are you sure you want to delete " + file.attributes.name + "?");
    //     var filesCollection = this.collection;
    //     $('#deleteFile .btn-primary').bind('click', function() {
    //         filesCollection.remove(file);
    //         modalWindow.modal('toggle');
    //     });
    // },

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
        f.file.save();
        this.collection.add(f.file);
    },

    addOne: function(file) {
        console.log("file addOne");
        var fileView = new Agora.Views.File({ model: file });
        $('#file-list').append(fileView.render().el);
    },

    events: {
        'click tbody tr': 'highlight'
    },

    highlight: function(e) {
        $(e.currentTarget).toggleClass("selected");
    },

    newFile: function(id) {
        Agora.currentSpace.get('fileSystem').push(id);
        Agora.currentSpace.save();
    }

});

// Represents a single space that the user has access to
Agora.Views.Space = Backbone.View.extend({
    tagName: 'a',

    attributes: {
        'href': ''
    },

    className: 'thumbnail span3',

    template: _.template('<h1 class="tile"><%= name %></h1>'),

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        model = this.model;
        this.$el.attr('href', '#/space/' + this.model.attributes.id);
        return this;
    }
});

// Represents all of the spaces the user has access to
Agora.Views.Spaces = Backbone.View.extend({
    el: '.space',

    template: _.template('<div id="space-list" class="thumbnails"></div>'),

    events: {
        'click a': 'goToSpace'
    },

    initialize: function() {
        this.collection.on('add', this.addOne, this);
        vent.on('space:createNewSpace', this.createNewSpace, this);
    },

    createNewSpace: function(spaceName) {
        newSpace = new Agora.Models.Space({
            name: spaceName,
            id: spaceName.replace(/ /g, "-"),
        });

        space.save();
        spaces.add(newSpace);
    },

    render: function() {
        $("#dropzone").hide();
        this.$el.html( this.template() );
        this.collection.each(this.addOne, this);
        return this;
    },

    addOne: function(space) {
        var spaceView = new Agora.Views.Space({ model: space });
        $('#space-list').append(spaceView.render().el);
    },

    goToSpace: function() {
        Agora.RouterInstance.navigate('space', {trigger: true})
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
