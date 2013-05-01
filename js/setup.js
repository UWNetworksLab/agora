/**
* Applies setup for Agora and its modules
*
* @module setup
*/

(function() {
    // fetch the current user

    // temporary initialization of data for testing purposes
    initializeDummyData();
    Agora.currentUser = new Agora.Models.User({id: 24601});
    Agora.currentUser.fetch();
    
    // Initialize Backbone views
    Agora.appView = new Agora.Views.App();

    // Initialize the Backbone router
    Agora.router = new Agora.Router;
    Backbone.history.start();

})();