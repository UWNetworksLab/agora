/**
 * Provides a CRUD model meant for overriding Backbone.sync
 *
 * @module FreeDOM Backbone.sync
 */
var storage = freedom.storage();

// Create/Update model
freedom.on("sync_update", function(model, modelName, continuation) {
   var promise = storage.set(modelName + "_" + model.id, model);
   promise.done(function() {
      if(continuation != undefined)
         continuation(model);
   })
});

// Read model
freedom.on("sync_read", function(id, modelName, continuation) {
   var promise = storage.get(modelName + "_" + id);
   promise.done(function(val) {
      if(continuation != undefined)
         continuation(val);
   });
});

// Delete model
freedom.on("sync_delete", function(id, modelName, continuation) {
   var promise = storage.set(modelName + "_" + id, {});
   promise.done(function() {
      if(continuation != undefined)
         continuation(model);
   });
}
