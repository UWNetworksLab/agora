var storage = freedom.storageprovider();
var social = freedom.socialprovider();
var my_state = null;
var friends = {};

/*** Social Provider API Hooks ***/
social.on('onUserProfile', function(message) {
  freedom.emit('agora_userProfileUpdate', message);
});

social.on('onClientState', function(message) {
  freedom.emit('agora_userStateUpdate', message);
});

social.on('onMessage', function(data) {
  freedom.emit('agora_onNotify', data);
});

freedom.on('agora_notify', function(val) {
  social.sendMessage(val.to, val.message);
});
/*** END Social Provider API Hooks ***/

// Callback for Agora.getCurrentUser
freedom.on("agora_getcurrentuser", function(reqid) {
   freedom.emit("agora_getcurrentuser_response", {
      displayName: "Nicholas Cage",
      isOnline: true,
      UID: "cagen@cs.washington.edu",
      spaceNames: ["Final Project", "Design Team", "Cat Lovers Anonymous"],
      reqid: reqid
   });
});

// Callback for Agora.getSpaceByName
freedom.on("agora_getspacebyname", function(reqid, name) {
   var promise = storage.get('space_' + name);
   promise.then(function(val) {
      val.reqid = reqid;
      freedom.emit('agora_getspacebyname_response', val);
   });
});

/*** Backbone.sync functions ***/

// Reads the model and calls back with the model result
freedom.on("backbone_sync_read", function(modelInformation) {
   var promise = storage.get(modelInformation[1]);
   promise.then(function(value) {
      freedom.emit("backbone_sync_read_callback", [modelInformation[0],
        value]);
   });
});

// Creates/Updates the model
freedom.on("backbone_sync_update", function(model) {
   var promise = storage.set(model[1],
      JSON.stringify(model[2]));
   promise.then(function(value) {
      freedom.emit("backbone_sync.then", model[0]);
   });
});

// Deletes the model (TODO: change from set {} to actual delete)
freedom.on("backbone_sync_delete", function(model) {
   var promise = storage.set(model[1], undefined);
   promise.then(function(value) {
      freedom.emit("backbone_sync.then", model[0]);
   });
});

freedom.on("agora_ready", function() {
  console.log("ready received");
  // Log in
  social.login({
    agent: 'agora',
    version: '0.1',
    url: '',
    interactive: true
  }).then(function(ret) {
    my_state = ret;
    // Notify Agora of state change
    freedom.emit("agora_userStatusUpdate", ret);
    console.log("logged in");
  }, function(err) {
    console.log("failed = " + JSON.stringify(err));
  });
});
