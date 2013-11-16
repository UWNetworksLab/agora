/*var storage = freedom.storageprovider();
var social = freedom.socialprovider();
var networks = {};

/*** Social Provider API Hooks ***/
/*social.on('onStatus', function(message) {
  // Attempt to connect to the network
  if (!networks.hasOwnProperty(msg.network)) {
    social.login({
      network: message.network,
      agent: 'Agora',
      version: '0.1',
      url: '',
      interactive: true
    });
  }
  networks[message.network] = message;

  // Notify Agora of important information
  if(message.status == social.STATUS_NETWORK["ONLINE"]) {
    freedom.emit("agora_userStatusUpdate", "online");
  } else {
    freedom.emit("agora_userStatusUpdate", message.message);
  }
});

social.on('onChange', function(message) {
  freedom.emit('agora_userUpdate', message);
});

social.on('onMessage', function(data) {
  freedom.emit('agora_onNotify', data);
});

freedom.on('agora_notify', function(val) {
  social.sendMessage(val.to, val.message);
});
/*** END Social Provider API Hooks ***/
/*
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
   promise.done(function(val) {
      val.reqid = reqid;
      freedom.emit('agora_getspacebyname_response', val);
   });
});*/

/*** Backbone.sync functions ***/
/*
// Creates a new model and calls back a new model ID
freedom.on("backbone_sync_create", function(modelInformation) {
   var newID = (new Date()).getTime() +
      Math.floor(Math.random() * 1000);
   var promise = storage.set(newID,
      JSON.stringify(modelInformation[1]));
   promise.done(function(value) {
      freedom.emit("backbone_sync_done");
   });
});

// Reads the model and calls back with the model result
freedom.on("backbone_sync_read", function(modelInformation) {
   var promise = storage.get(modelInformation[1]);
   promise.done(function(value) {
      freedom.emit("backbone_sync_done");
   });
});

// Updates the model
freedom.on("backbone_sync_update", function(model) {
   var promise = storage.set(model.id,
      JSON.stringify(model));
   promise.done(function(value) {
      freedom.emit("backbone_sync_done");
   });
});

// Deletes the model (TODO: change from set {} to actual delete)
freedom.on("backbone_sync_delete", function(model) {
   var promise = storage.set(model.id, undefined);
   promise.done(function(value) {
      freedom.emit("backbone_sync_done");
   });
});*/
