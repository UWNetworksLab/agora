var storage = freedom.storage();

freedom.on("sync_create", function(model) {
   console.log("sync_create called");
});
