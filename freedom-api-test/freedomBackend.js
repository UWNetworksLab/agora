/**
 * Provides a CRUD model meant for overriding Backbone.sync
 *
 * @module FreeDOM Backbone.sync
 */
var storage = freedom.storage();

// Create/Update model
freedom.on("sync_update", function (model, modelName, continuation) {
   console.log("test3");
   var promise = storage.set(modelName + "_" + model.id, model);
   console.log("test2");
   promise.done(function () {
      console.log("test");
      if (continuation != undefined) {
        continuation(model);
      }
   })
});

// Read model
freedom.on("sync_read", function (id, modelName, continuation) {
   console.log("test");
   var promise = storage.get(modelName + "_" + id);
   promise.done(function (val) {
      console.log("test2");
      if (continuation != undefined) {
         continuation(val);
      }
   })
});

// Delete model
freedom.on("sync_delete", function (id, modelName, continuation) {
   console.log("test-delete");
   var promise = storage.set(modelName + "_" + id, {});
   promise.done(function () {
      if(continuation != undefined) {
         continuation(model);
      }
   })
});
