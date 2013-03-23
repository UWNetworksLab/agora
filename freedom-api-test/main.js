Backbone.sync = function(method, model, options) {
   console.info("Backbone.sync: [" + method + ", " + model + ", " + options + "]");

   switch(method) {
      case "create":
         console.info("Backbone.sync: create called");
         break;
      case "read":
         console.info("Backbone.sync: read called");
         break;
      case "update":
         console.info("Backbone.sync: update called");
         break;
      case "delete":
         console.info("Backbone.sync: delete called");
         break;
      default:
         console.error("Backbone.sync: Invalid method " + method);
   }
};

var TestModel = Backbone.Model.extend({
   message: "test"
});
