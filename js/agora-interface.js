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
//(function() {

/// FREEDOM RESPONSE METHODS ///
// Functions that we need to execute
var inFlight = {};

freedom.on("agora_getcurrentuser_response", function(user) {
	inFlight[user.reqid](user);
	delete inFlight[user.reqid];
});

window.Agora = {

	Models: {},
	Collections: {},
	Views: {},
	Router: {},

	/**
	* Gets the currently authenticated user.
	*
	* @method getCurrentUser
	* @return User - The current user
	*/
	getCurrentUser: function(continuation) {
	var reqId = Math.random();
	inFlight[reqId] = continuation;
	freedom.emit("agora_getcurrentuser", reqId);
	// TODO: Remove below, this is here for backwards compatibility
	return new Agora.Models.User({
		displayName: "Nicholas Cage",
		isOnline: true,
		UID: "cagen@cs.washington.edu",
		spaceNames: ["Final Project", "Design Team", "Cat Lovers Anonymous"]
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
		var users = new Agora.Collections.Users();
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
		var fs = new Agora.Collections.Files()
		fs.add([{
			isMetadata: true,
			name: "cats",
			timestamp: new Date(),
			isFolder: true
		},
		{
			isMetadata: true,
			name: "hw1.sql",
			timestamp: new Date()
		},
		{
			isMetadata: true,
			name: "writeup.txt",
			timestamp: new Date()
		}]);

		return new Agora.Models.GroupShare({
			name: "Final Project",
			user: users,
			fileSystem: fs
		});
	}
};

// Template helper method
// Allows templates to be compiled by simply calling template(id)
window.template = function(id) {
	return _.template( $('#' + id).html() );
};

// Custom PubSub event listener
window.vent = _.extend({}, Backbone.Events);

//})();
