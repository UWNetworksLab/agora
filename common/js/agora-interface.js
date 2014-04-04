/**
* Provides class and FreeDOM interfacing for Agora
*
* @module agora-interface
*/

// Utility to make GUID
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function(str) {
    return this.slice(0, str.length) == str;
  };
}

/**
* A global class containing functions for the Agora interface.
*
* @class Agora
* @constructor
*/
(function() {

/// FREEDOM RESPONSE METHODS ///
// Functions that we need to execute
var inFlight = {};

freedom.on("agora_getcurrentuser_response", function(user) {
   inFlight[user.reqid](new User(user));
   delete inFlight[user.reqid];
});

freedom.on("agora_getspacebyname_response", function(space) {
   inFlight[space.reqid](new Space(space));
   delete inFlight[space.reqid];
});

/*** Backbone.sync override ***/
var modificationHandles = [];
var deferredPairs = [];

// Decrement operation and see if complete
function finishDeferredOperation(deferredID) {
   deferredPairs[deferredID].opcount--;

   // If no operations left, resolve
   if(deferredPairs[deferredID].opcount == 0) {
      deferredPairs[deferredID].object.resolve();
   }
}

/**
 * Overrides the built-in synchronization function in Backbone.js
 * to use the FreeDOM API.  On creation, an ID is automatically
 * assigned to the model and stored in the 'id' property of the
 * model.  Any 'update', 'read', or 'delete' calls will depend
 * on this automatically set identifier.
 *
 * @method Backbone.sync
 * @param method the sync method to use, either 'create',
 *    'read', 'update', or 'delete'.
 * @param model the model to sync to FreeDOM storage.
 * @param options any custom options to use when storing (none
 *    supported right now).
 */
Backbone.sync = function(method, model, options) {
   var deferredID = Math.random();
   var modelID = model.id;
   
   deferredPairs[deferredID] = {object: jQuery.Deferred(), opcount: 1};
   console.log("Backbone.sync: \"" + method +
      "\" operation for " + JSON.stringify(model) +
      " with options " + JSON.stringify(options));

   // If this is a valid backbone object, sync it normally.
   if(model instanceof Backbone.Model || model instanceof Backbone.Collection) {
      switch(method) {
      case "create":
      case "update":
         deferredPairs[deferredID].opcount++;
         freedom.emit("backbone_sync_update", [deferredID, modelID, model.toJSON()]);
         break;
      case "read":
         modificationHandles[deferredID] = model;
         deferredPairs[deferredID].opcount++;
         freedom.emit("backbone_sync_read", [deferredID, modelID]);
         break;
      case "delete":
         deferredPairs[deferredID].opcount++;
         freedom.emit("backbone_sync_delete", [deferredID, modelID]);
         break;
      default:
         delete deferredPairs[deferredID];
         throw "Backbone.sync: Invalid method \"" + method + "\"";
      }
   } else {
      delete deferredPairs[deferredID];
      throw "Backbone.sync: Non-syncable object passed to function.";
   }

   finishDeferredOperation(deferredID);
   return deferredPairs[deferredID].object;
};

// Return call for sync complete
freedom.on("backbone_sync_done", function(deferredID) {
   finishDeferredOperation(deferredID);
});

// Loads the model information once read from FreeDOM
freedom.on("backbone_sync_read_callback", function(modelInformation) {
   modificationHandles[modelInformation[0]].set(JSON.parse(modelInformation[1]));
   delete modificationHandles[modelInformation[0]];
   finishDeferredOperation(modelInformation[0]);
});
/*** End Backbone.sync override ***/

/*** Social Provider API Hooks ***/
freedom.on("agora_userUpdate", function(userInfo) {
  var user = Agora.User.get("contacts").indexOf(userInfo.userId);

  // Set up the user object
  if (user == -1) {
    user = new Agora.Models.User();
    user.set({
      id: userInfo.userId,
      displayName: userInfo.name
    });
  }

  // Add/remove based on status
  if (userInfo.clients[userInfo.userId].status == 2) {
    Agora.User.get("contacts").push(user);
  } else {
    var index = Agora.User.get("contacts").indexOf(user);
    Agora.User.get("contacts").splice(index, 1);
  }
  console.log(JSON.stringify(userInfo));
});

freedom.on("agora_userStatusUpdate", function(statusInfo) {
  console.log(JSON.stringify(statusInfo));
  
  if(Agora.User == null) {
    Agora.User = new Agora.Models.User();
  }
  
  if(statusInfo.status == "ONLINE") {
    Agora.User.set({isOnline: true});
  } else {
    Agora.User.set({isOnline: false});
  }

  Agora.User.set({
    id: statusInfo.userId,
    displayName: statusInfo.userId,   // Temporary until user info comes in
    spaces: new Agora.Collections.Spaces()
  });

  // Get spaces for this user
  Agora.User.get("spaces").id = statusInfo.userId;
  Agora.User.get("spaces").fetch();
  userUpdateUI();
});

freedom.on("agora_userProfileUpdate", function(profile) {
  if(Agora.User == null) {
    Agora.User = new Agora.Models.User();
  }

  // Check if we are updating the current user
  if (Agora.User.get("id") == profile.userId) {
    Agora.User.set({displayName: profile.name});
    userUpdateUI();
  }
});

freedom.on("agora_userClientUpdate", function(message) {
  if(Agora.User == null) {
    Agora.User = new Agora.Models.User();
  }

  var userIndex = Agora.User.get("contacts").indexOf(message.userId);

  if (message.status == "ONLINE" && userIndex == -1) {
    Agora.User.get("contacts").push(message.userId);
    
    // Probe for space info
    sendNotification(message.userId, "GET spaces");
  } else if (message.status != "ONLINE" && userIndex != -1) {
    Agora.User.get("contacts").splice(userIndex, 1);
  }

  // Logging
  var result = "clients = (";
  for (var i = 0; i < Agora.User.get("contacts").length; i++) {
    result += Agora.User.get("contacts")[i] + ", ";
  }
  result += ")";
  console.log(result);
});

freedom.on("agora_onNotify", function(data) {
  console.log(JSON.stringify(data));

  if (typeof data.message != "string") {
    console.log("Unknown request: " + JSON.stringify(data));
    return;
  }

  // Check messages and respond as required
  if (data.message.startsWith("GET")) {
    var query = data.message.split(" ", 3);

    if (query[1] == "spaces") {
      var results = new Agora.Collections.Spaces();
      Agora.User.get("spaces").each(function(space) {
        if (space.get("users").indexOf(data.from.userId) != -1) {
          results.add(space);
        }
      });
      console.log("Replying with " + JSON.stringify(results.toJSON()));
      sendNotification(data.from.clientId, "REPLY spaces " +
        JSON.stringify(results));
    } else {
      console.log("Unknown get command \"" + query + "\"");
    }
  } if (data.message.startsWith("REPLY")) {
    var query = data.message.split(" ", 3);

    if (query[1] == "spaces") {
      var results = JSON.parse(data.message.substring(13));
      console.log("Processing reply " + JSON.stringify(results));
      
      // Loop through all the spaces and add ones we haven't seen.
      for (var i = 0; i < results.length; i++) {
        if (Agora.User.get("spaces").get(results[i].id) == null) {
          var space_to_add = Agora.User.get("spaces").get(results[i].id);
          Agora.User.get("spaces").add(space_to_add);
        }
      }
    }
  } else {
    console.log("Unknown request: " + JSON.stringify(data));
  }
});
/*** END Social Provider API Hooks ***/
})();

function sendNotification(to, data) {
  freedom.emit("agora_notify", {to: to, message: data});
}

freedom.emit("agora_ready");

window.Agora = {

	Models: {},
	Collections: {},
	Views: {},
	Router: null,
  Template: {},
  User: null,

	/**
	* Gets the currently authenticated user and returns it
  * to the given continuation function.
	*
	* @method getCurrentUser
  * @deprecated
	*/
	getCurrentUser: function(continuation) {
    var reqId = Math.random();
    inFlight[reqId] = continuation;
    freedom.emit("agora_getcurrentuser", reqId);
	},

	/**
	* Gets the space by the specified name, returns false
	* if the space can not be found.
	*
	* @method getSpaceByName
	* @return Space or Boolean - The space or false
  * @depricated
	*/
	getSpaceByName: function(name) {
                // var reqId = Math.random();
                // inFlight[reqId] = continuation;
                // freedom.emit("agora_getspacebyname_response", val);
		// TODO: Remove this once fully implemented, below is for backwards
                // compatibility
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
			isFolder: true,
            id: 100
		},
		{
			isMetadata: true,
			name: "hw1.sql",
			timestamp: new Date(),
            id: 101
		},
		{
			isMetadata: true,
			name: "writeup.txt",
			timestamp: new Date(),
            id: 102
		}]);

		return new Agora.Models.Space({
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



// temporary initialization of data for testing purposes
var initializeDummyData = function () {
    // create a current user
    var tempUser = new Agora.Models.User({
        displayName: "Nicholas Cage",
        isOnline: true,
        UID: "cagen@cs.washington.edu",
        spaceNames: ["Final-Project", "Design-Team", "Cat-Lovers-Anonymous"],
        id: 24601
    });
    tempUser.save();

    var tempFile1 = new Agora.Models.File({
        isMetadata: true,
        name: "cats",
        timestamp: new Date(),
        isFolder: true,
        id: 100
    });
    var tempFile2 = new Agora.Models.File({
        isMetadata: true,
        name: "hw1.sql",
        timestamp: new Date(),
        id: 101
    });
    var tempFile3 = new Agora.Models.File({
        isMetadata: true,
        name: "writeup.txt",
        timestamp: new Date(),
        id: 102
    });
    tempFile1.save();
    tempFile2.save();
    tempFile3.save();

    var tempSpace1 = new Agora.Models.Space({
        name: "Final Project",
        id: "Final-Project"
    });
    var tempSpace2 = new Agora.Models.Space({
        name: "Design Team",
        id: "Design-Team"
    });
    var tempSpace3 = new Agora.Models.Space({
        name: "Cat Lovers Anonymous",
        id: "Cat-Lovers-Anonymous"
    });
    tempSpace1.save();
    tempSpace2.save();
    tempSpace3.save();

};
