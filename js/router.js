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
        var spacesList = new Agora.Views.Spaces({ collection: spaces });
        var toolbar = new Agora.Views.Toolbar( {isSpace: false} );
        spacesList.render();
        toolbar.render();
    },

    space: function(id) {
        Agora.currentSpace = new Agora.Models.Space({ 'id': id });
        Agora.currentSpace.on('change', function() {vent.trigger('space:update')});
        Agora.currentSpace.fetch();
        fs.reset();
        var fileList = new Agora.Views.FileList({ collection: fs });
        var toolbar = new Agora.Views.Toolbar({ isSpace: true });
        fileList.render();
        toolbar.render();
    }
});