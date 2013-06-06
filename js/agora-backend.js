var storage = freedom.storage();

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
});

/*** Backbone.sync functions ***/

// Creates a new model and calls back a new model ID
freedom.on("backbone_sync_create", function(modelInformation) {
   var newID = (new Date()).getTime() +
      Math.floor(Math.random() * 1000);
   var promise = storage.set(newID,
      JSON.stringify(modelInformation[1]));
   promise.done(function(value) {
      freedom.emit("backbone_sync_create_callback", [modelInformation[0], newID]);
   });
});

// Reads the model and calls back with the model result
freedom.on("backbone_sync_read", function(modelInformation) {
   var promise = storage.get(modelInformation[1]);
   promise.done(function(value) {
      freedom.emit("backbone_sync_read_callback",
         [modelInformation[0], value]);
   });
});

// Updates the model
freedom.on("backbone_sync_update", function(model) {
   var promise = storage.set(model.id,
      JSON.stringify(model));
});

// Deletes the model (TODO: change from set {} to actual delete)
freedom.on("backbone_sync_delete", function(model) {
   var promise = storage.set(model.id, undefined);
});
