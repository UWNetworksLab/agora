/**
 * Provides a CRUD model meant for overriding Backbone.sync
 *
 * @module FreeDOM Backbone.sync
 */
var storage = freedom.storage();

// Create/Update model
freedom.on("sync_update", function (model, modelName) {
   var promise = storage.set(modelName + "_" + model.id, model);
   promise.done(function () {
      freedom.emit("sync_update_completed");
   });
});

// Read model
freedom.on("sync_read", function (id, modelName) {
   var promise = storage.get(modelName + "_" + id);
   promise.done(function (val) {
      freedom.emit("sync_read_completed", val);
   });
});

// Delete model
freedom.on("sync_delete", function (id, modelName) {
   var promise = storage.set(modelName + "_" + id, {});
   promise.done(function () {
      freedom.emit("sync_delete_completed");
   })
});
