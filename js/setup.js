/**
* Applies setup for Agora and its modules
*
* @module setup
*/

(function() {
    // fetch the current user

    // temporary initialization of data for testing purposes
    // user
    initializeDummyData();
    Agora.currentUser = new Agora.Models.User({id: 24601});
    Agora.currentUser.fetch();

    //files
    fs = new Agora.Collections.Files()
    var tempFile1 = new Agora.Models.File({id: 100});
    var tempFile2 = new Agora.Models.File({id: 101});
    var tempFile3 = new Agora.Models.File({id: 102});
    tempFile1.fetch();
    tempFile2.fetch();
    tempFile3.fetch();
    fs.add([tempFile1,tempFile2,tempFile3]);
    
    
    // Initialize Backbone views
    Agora.appView = new Agora.Views.App();

    // Initialize the Backbone router
    Agora.router = new Agora.Router;
    Backbone.history.start();

})();