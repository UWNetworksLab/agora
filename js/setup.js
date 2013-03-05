/**
* Applies setup for Agora and its modules
*
* @module setup
*/

(function() {
    // Grab the current user
    Agora.currentUser = Agora.getCurrentUser();

    // Initialize Backbone views
    Agora.appView = new Agora.Views.App();

    // Initialize the Backbone router
    Agora.router = new Agora.Router;
    Backbone.history.start();

})();