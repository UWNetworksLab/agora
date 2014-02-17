/**
* Provides routing capabilities based on #/ urls
*
* @module router
*/
Agora.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'space/:id': 'space'
    },

    index: function() {
        var spacesList = new Agora.Views.Spaces({ collection: Agora.User.get("spaces") });
        var toolbar = new Agora.Views.Toolbar( {isSpace: false} );
        spacesList.render();
        toolbar.render();
    },

    space: function(id) {
        Agora.currentSpace = Agora.User.get("spaces").get(id);
        Agora.currentSpace.on('change', function() {vent.trigger('space:update')});
        var fileList = new Agora.Views.FileList({ model: Agora.currentSpace.get("fileSystem") });
        var toolbar = new Agora.Views.Toolbar({ isSpace: true });
        fileList.render();
        toolbar.render();
    }
});
