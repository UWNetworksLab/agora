/**
 * Overrides the built-in synchronization for Backbone.sync to use
 * the FreeDOM API.  In order for the synchronization to work properly
 * two properties need to be provided.
 *
 * In the model, a id property needs to be set to prevent synchronization
 * conflicts.  In addition, a modelName option should be provided in
 * options to specify the model name.  Excluding any of these properties
 * will result in an error
 *
 * @method Backbone.sync
 * @param method the sync method to use, a CRUD command
 * @param model the model to syncrhonize
 * @param the options to use in synchronizing
 */
Backbone.sync = function(method, model, options) {
   // Error handling
   if(model.id === undefined)
      throw "Backbone.sync: id not defined in model";
   if(options.modelName === undefined)
      throw "Backbone.sync: modelName not defined in options";
   console.info("Backbone.sync: [" + method.toString() + ", " +
      JSON.stringify(model) + ", " + JSON.stringify(options) + "]");

   switch(method) {
      case "create":
         console.info("Backbone.sync: create called");
         freedom.emit("sync_update", model, options.modelName);
         break;
      case "read":
         console.info("Backbone.sync: read called");
         freedom.emit("sync_read", model.id, options.modelName,
            function(modelResult) {
               model.attributes = modelResult;
            }
         );
         break;
      case "update":
         console.info("Backbone.sync: update called");
         freedom.emit("sync_update", model, options.modelName);
         break;
      case "delete":
         console.info("Backbone.sync: delete called");
         freedom.emit("sync_delete", model, options.modelName);
         break;
      default:
         throw "Backbone.sync: Invalid method " + method;
   }
};

var TestModel = Backbone.Model.extend({
   message: "test"
});