/**
* Provides class and FreeDOM interfacing for Agora
*
* @module agora-interface
*/

/**
* A class that models an Agora user.
*
* @class User
* @constructor
*/
var User = Backbone.Model.extend({
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
		 * Gets the names of all the spaces (that we
		 * know of) for this user.
		 *
		 * @property spaceNames
		 * @type String[]
		 * @default []
		 */
		spaceNames: ""	// TODO: Change to Space Collection
	}
});

/**
* A collection of #crossLink "User" objects.
*
* @class UserCollection
* @constructor
*/
var UserCollection = Backbone.Collection.extend({
	model: User
});

/**
* An N-ary tree that maps the file system through folders and files.
*
* @class FileSystemItem
* @constructor
*/
var FileSystemItem = Backbone.Model.extend({
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
		 * is set, it contains other FileSystemItems representing
		 * the files/folders inside this folder. If isMetadata
		 * is set, the contents are irrelevant. Otherwise, it
		 * contains a bit stream of the file contents.
		 *
		 * @property contents
		 * @type FileSystemItemCollection
		 * @default Empty collection
		 */
		contents: "", //new FileSystemItemCollection(),
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
		isMetaData: false
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
	}
});

/**
* A collection of #crossLink "FileSystemItem" objects.
*
* @class FileSystemItemCollection
* @constructor
*/
var FileSystemItemCollection = Backbone.Collection.extend({
	model: FileSystemItem
});

/**
* A class that models a group share.
*
* @class GroupShare
* @constructor
*/
var GroupShare = Backbone.Model.extend({
	default: {
		/**
		* Represents the group's file system. If set to null, the
		* group has no file system yet.
		*
		* @property fileSystem
		* @type FileSystemItem
		* @default null
		*/
		fileSystem: null,
		/**
		* Contains the identities of the users that are in this group.
		*
		* @property users
		* @type UserCollection
		* @default null
		*/
		users: null,
		/**
		* The name of the group
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

/**
* A global class containing functions for the Agora interface.
*
* @class Agora
* @constructor
*/
var Agora = {
	/**
	* Gets the currently authenticated user.
	*
	* @method getCurrentUser
	* @return User - The current user
	*/
	getCurrentUser: function() {
	// TODO: Replace with actual Agora backend call
	return new User({
		displayName: "Nicholas Cage",
		isOnline: true,
		UID: "cagen@cs.washington.edu",
		spaceNames: ["Final Project"]
	})},

	/**
	* Gets the space by the specified name, returns false
	* if the space can not be found.
	*
	* @method getSpaceByName
	* @return GroupShare or Boolean - The space or false
	*/
	getSpaceByName: function(name) {
		// TODO: Replace with actual Agora backend call
		if(name != "Final Project") {
			return false;
		}
		var users = new UserCollection();
		users.add([{
			displayName: "Marty Stepp",
			isOnline: false,
			UID: "stepp@cs.washington.edu",
			contacts: new Backbone.Collection([
				"cagen@cs.washington.edu", "mike@monstersinc.com"
			])
		},
		{
			displayName: "Mike Wazowski",
			isOnline: true,
			UID: "mike@monstersinc.com"
		}]);
		var fs = new FileSystemItemCollection()
		fs.add([{
			isMetadata: true,
			name: "hw1.sql",
			timestamp: new Date()
		},
		{
			isMetadata: true,
			name: "writeup.txt",
			timestamp: new Date()
		}]);

		return new GroupShare({
			name: "Final Project",
			user: users,
			fileSystem: fs
		});
	}
};
