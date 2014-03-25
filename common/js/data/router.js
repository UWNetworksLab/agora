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
        console.log("Prepping users: " + JSON.stringify(Agora.currentSpace.get("users")));
        $("#space-users").html("");
        for(user in Agora.currentSpace.get("users")) {
          console.log("adding " + user);
          $("#space-users").append(_.template($("#manage-user-item").html(),
            {name: Agora.currentSpace.get("users")[user]}));
        }
        
        $("#space-users tr td button").click(removeUser);
    }
});
