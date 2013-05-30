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
        var spacesList = new Agora.Views.Spaces();
        var toolbar = new Agora.Views.Toolbar( {isSpace: false} );
        spacesList.render();
        toolbar.render();
    },

    space: function(id) {
        // disabled because we are loading fake files with freedom now
        //var currentSpace = Agora.getSpaceByName(id);
        //var fs = currentSpace.get('fileSystem');
        var fileList = new Agora.Views.FileList({ collection: fs });
        var toolbar = new Agora.Views.Toolbar({ isSpace: true });
        fileList.render();
        toolbar.render();
    }
});