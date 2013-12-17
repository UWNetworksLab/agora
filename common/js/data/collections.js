/**
* Provides collections of Backbone models
*
* @module collections
*/

/**
* A collection of #crossLink "User" objects.
*
* @class Users
* @constructor
*/
Agora.Collections.Users = Backbone.Collection.extend({
    model: Agora.Models.User
});

/**
* A collection of #crossLink "File" objects.
*
* @class Files
* @constructor
*/
Agora.Collections.Files = Backbone.Collection.extend({
    model: Agora.Models.File
});

Agora.Collections.Spaces = Backbone.Collection.extend({
    model: Agora.Models.Space,
    url: "/spaces"
});
