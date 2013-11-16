/**
* Provides Backbone models for use in Agora's UI
*
* @module models
*/

/**
* A class that models an Agora user.
*
* @class User
* @constructor
*/
Agora.Models.User = Backbone.Model.extend({
    initialize: function() {
        contacts = new Backbone.Collection();
    },
    defaults: {
        /**
         * The display name for the user
         *
         * @property displayName
         * @type String
         * @default ""
         */
        displayName: "",
        /**
         * The unique identifier for the user.
         *
         * @property UID
         * @type String
         * @default ""
         */
        UID: "",
        /**
         * The user's contacts as UIDs.
         *
         * @property contacts
         * @type Collection
         * @default []
         */
        contacts: null,
        /**
         * Indicates if the current user is online.
         *
         * @property isOnline
         * @type Boolean
         * @default false
         */
        isOnline: false,
        /**
         * Gets the spaces for this user.
         *
         * @property spaces
         * @type Spaces
         * @default null
         */
        spaces: null
    }
});

/**
* An N-ary tree that maps the file system through folders and files.
*
* @class File
* @constructor
*/
Agora.Models.File = Backbone.Model.extend({
    defaults: {
        /**
         * The file or folder name.
         *
         * @property name
         * @type String
         * @default ""
         */
        name: "",
        /**
         * Indicating if the contents represent a folder
         *
         * @property isFolder
         * @type Boolean
         * @default false
         */
        isFolder: false,
        /**
         * The contents of the file or folder. If isFolder
         * is set, it contains other Files representing
         * the files/folders inside this folder. If isMetadata
         * is set, the contents are irrelevant. Otherwise, it
         * contains a bit stream of the file contents.
         *
         * @property contents
         * @type Agora.Collections.Files
         * @default Empty collection
         */
        contents: "", //new Agora.Collections.Files(),
        /**
         * The timestamp is an integer representation of when the
         * file was last modified. It is formatted as follows:<br>
         *
         * @property timestamp
         * @type Date
         * @default The current date
         */
        timestamp: new Date(),
        /**
         * Indicates if this file was deleted.
         *
         * @property isDeleted
         * @type Boolean
         * @default false
         */
        isDeleted: false,
        /**
         * Indicates if this is just a metadata object or if
         * it actually contains information.
         *
         * @property isMetadata
         * @type Boolean
         * @default false
         */
        isMetaData: false,
        /**
         * Points back to the parent FileSystemItem
         *
         * @property parent
         * @type FileSystemItem a pointer to the parent
         *  FileSystemItem.
         * @default null
         */
        parent: null,
        /**
         * MIME type of the file
         *
         * @property type
         * @type String
         * @default ""
         */
        type: ""
    },
    /**
     * Gets the specified file by name if it exists in
     * the current directory.
     *
     * @method getFileByName
     * @param {String} fileName The name of the file
     * @return {String} The file
     */
    getFileByName: function(fileName) {
        return "We did not invent the algorithm."
    },

    /**
     * Puts the specified file in the current directory
     *
     * @method putFile
     * @param {Object} file the file to add
     * @return {Boolean} True if successful, false otherwise
     */
    putFile: function(file) {
        // TODO: Replace with Agora call
        return true;
    },

    /**
     * Removes the specified file
     *
     * @method deleteFile
     * @param {String} file the file name to remove
     * @return {Boolean} True if successful, false otherwise
     */
    deleteFile: function(file) {
        // TODO: Replace with Agora call
        return true;
    },

    /**
     * Removes the specified file
     *
     * @method deleteFile
     * @param {String} file the file name to remove
     * @return {Boolean} True if successful, false otherwise
     */
    renameFile: function(file) {
        // TODO: Replace with Agora call
        return true;
    }
});

/**
* A class that models a sharing space.
*
* @class Space
* @constructor
*/
Agora.Models.Space = Backbone.Model.extend({
    defaults: {
        /**
        * Represents the space's file system. If set to null, the
        * space has no file system yet.
        *
        * @property fileSystem
        * @type Agora.Models.File
        * @default null
        */
        fileSystem: null,
        /**
        * Contains the identities of the users that have access
        * to this space. Not used yet.
        *
        * @property users
        * @type Agora.Collections.Users
        * @default null
        */
        users: null,
        /**
        * The name of the space
        *
        * @property name
        * @type String
        * @default ""
        */
        name: ""
    },
    /**
    * Adds the specified user to the space
    *
    * @method addUser
    * @param {User} user The user to add
    * @return {Boolean} Indicates if the add was successful.
    */
    addUser: function(user) {
        this.users.add(user);
        // TODO: Send FreeDOM add user message.
        return true;
    },
    /**
    * Removes the specified user from the space
    *
    * @method removeUser
    * @param {User} user The user to remove
    * @return {Boolean} Indicates if the remove was successful.
    */
    removeUser: function(user) {
        this.users.remove(user);
        // TODO: Send FreeDOM remove user message.
        return true;
    }
});
