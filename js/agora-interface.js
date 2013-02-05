/**
 * Provides class and FreeDOM interfacing for Agora
 *
 * @module agora-interface
 */

/**
 * A global class containing functions for the Agora interface.
 *
 * @class Agora
 * @constructor
 */
var Agora = {};

/**
 * Gets the currently authenticated user.
 *
 * @method getCurrentUser
 * @return User - The current user
 */
Agora.getCurrentUser = ___agora_getCurrentUser;

/**
 * Gets the space by the specified name, returns false
 * if the space can not be found.
 *
 * @method getSpaceByName
 * @return GroupShare or Boolean - The space or false
 */
Agora.getSpaceByName = ___agora_getSpaceByName;


// Definition for Agora.getCurrentUser
function ___agora_getCurrentUser() {
	// TODO: Replace with actual Agora backend call
	var user = new User();

	user.displayName = "Nicholas Cage";
	user.isOnline = true;
	user.UID = "cagen@cs.washington.edu";
	user.spaceNames = ["Final Project"];

	return user;
}

// Definition for Agora.getSpaceByName
function ___agora_getSpaceByName(name) {
	// TODO: Replace with actual Agora backend call
	if(name == "Final Project") {
		var users = new Array(2);
		users[0] = new User();
		users[1] = new User();

		users[0].displayName = "Marty Stepp";
		users[0].isOnline = false;
		users[0].UID = "stepp@cs.washington.edu";
		users[0].contacts = ["cagen@cs.washington.edu", "mike@monstersinc.com"];

		users[1].displayName = "Mike Wazowski";
		users[1].isOnline = true;
		users[1].UID = "mike@monstersinc.com";

		var fs = new FileSystemItem();
		
		fs.contents = new Array[2];
		fs[0].isMetadata = true;
		fs[0].name = "hw1.sql";
		fs[0].timestamp = 20130203132432;
		
		fs[1].isMetadata = true;
		fs[1].name = "writeup.txt";
		fs[1].timestamp = 20130202024211;

		var space = new GroupShare();
		
		space.name = "Final Project";
		space.user = users;
		space.fileSystem = fs;
	} else {
		return false;
	}
}

/**
 * An N-ary tree that maps the file system through folders and files.
 *
 * @class FileSystemItem
 * @constructor
 */
function FileSystemItem() {
	/**
	 * The file or folder name.
	 *
	 * @property name
	 * @type String
	 * @default ""
	 */
	this.name = "";

	/**
	 * Indicating if the contents represent a folder
	 *
	 * @property isFolder
	 * @type Boolean
	 * @default false
	 */
	this.isFolder = false;

	/**
	 * The contents of the file or folder.  If isFolder
	 * is set, it contains other FileSystemItems representing
	 * the files/folders inside this folder.  If isMetadata
	 * is set, the contents are irrelevant.  Otherwise, it
	 * contains a bit stream of the file contents.
	 *
	 * @property contents
	 * @type Array
	 * @default null
	 */
	this.contents = null;

	/**
	 * The timestamp is an integer representation of when the
	 * file was last modified.  It is formatted as follows:<br>
	 *<br>
	 * YYYYMMDDHHMMSS<br>
	 *<br>
	 * Where:<br><br>
	 * 		-YYYY = Year<br>
	 * 		-MM = Month<br>
	 * 		-DD = Day<br>
	 * 		-HH = Hour<br>
	 * 		-MM = Minute<br>
	 * 		-SS = Second<br>
	 *
	 * @property timestamp
	 * @type Integer
	 * @default 0
	 */
	this.timestamp = 0;

	/**
	 * Indicates if this file was deleted.
	 *
	 * @property isDeleted
	 * @type Boolean
	 * @default false
	 */
	this.isDeleted = false;

	/**
	 * Indicates if this is just a metadata object or if
	 * it actually contains information.
	 *
	 * @property isMetadata
	 * @type Boolean
	 * @default false
	 */
	this.isMetadata = false;

	/**
	 * Gets the specified file by name if it exists in
	 * the current directory.
	 *
	 * @method getFileByName
	 * @param {String} fileName The name of the file
	 * @return {String} The file
	 */
	this.prototype.getFileByName = function(fileName) {
		return "We did not invent the algorithm.";
	}
}

/**
 * A class that models a group share.
 *
 * @class GroupShare
 * @constructor
 */
function GroupShare() {
	/**
	 * Represents the group's file system.  If set to null, the
	 * group has no file system yet.
	 *
	 * @property fileSystem
	 * @type FileSystemItem
	 * @default null
	 */
	this.fileSystem = null;

	/**
	 * Contains the identities of the users that are in this group.
	 *
	 * @property users
	 * @type User[]
	 * @default []
	 */
	this.users = new Array();

	/**
	 * The name of the group
	 *
	 * @property name
	 * @type String
	 * @default ""
	 */
	this.name = "";

	/**
	 * Adds the specified user to the space
	 *
	 * @method addUser
	 * @param {User} user The user to add
	 * @return {Boolean} Indicates if the add was successful.
	 */
	this.prototype.addUser = function(user) {
		this.users.push(user);
		// TODO: Send FreeDOM add user message.
		return true;
	}

	/**
	 * Removes the specified user from the space
	 *
	 * @method removeUser
	 * @param {User} user The user to remove
	 * @return {Boolean} Indicates if the remove was successful.
 	 */
	this.prototype.removeUser = function(user) {
		for(var i = 0; i < this.users.length; i++) {
			if(user == this.users[i]) {
				this.users.splice(i,0);
				// TODO: Send FreeDOM Remove user message.
				return true;
			}
		}
		return true;
	}
}

/**
 * A class that models an Agora user.
 *
 * @class User
 * @constructor
 */
function User() {
	/**
	 * The display name for the user
	 *
	 * @property displayName
	 * @type String
	 * @default ""
	 */
	this.displayName = "";
	
	/**
	 * The unique identifier for the user.
	 *
	 * @property UID
	 * @type String
	 * @default ""
	 */
	this.UID = ""
	
	/**
	 * The user's contacts as UIDs.
	 *
	 * @property contacts
	 * @type String[]
	 * @default []
	 */
	this.contacts = new Array();
	
	/**
	 * Indicates if the current user is online.
	 *
	 * @property isOnline
	 * @type Boolean
	 * @default false
	 */
	this.isOnline = false;

	/**
	 * Gets the names of all the spaces (that we
	 * know of) for this user.
	 *
	 * @property spaceNames
	 * @type String[]
	 * @default []
	 */
	this.spaceNames = new Array();
}
