/**
 * Provides a CRUD model meant for overriding Backbone.sync
 *
 * @module FreeDOM Backbone.sync
 */
var storage = freedom.storage();

// Create/Update model
freedom.on("sync_update", function (modelInformation) {
   console.log("name is " + modelInformation[1]);
   var promise = storage.set(modelInformation[1] + "_" +
      modelInformation[0].id, JSON.stringify(modelInformation[0]));
});

// Read model
freedom.on("sync_read", function (modelInformation) {
   var promise = storage.get(modelInformation[2] + "_" +
      modelInformation[1]);
   promise.done(function (val) {
      freedom.emit("sync_read_completed", [modelInformation[0], val]);
   });
});

// Delete model
freedom.on("sync_delete", function (modelInformation) {
   var promise = storage.set(modelInformation[1] + "_" + modelInformation[0], "{}");
});
