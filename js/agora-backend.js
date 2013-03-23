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
