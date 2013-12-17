var storage = freedom.storageprovider();
var social = freedom.socialprovider();
var networks = {};

/*** Social Provider API Hooks ***/
social.on('onStatus', function(message) {
  // Attempt to connect to the network
  if (!networks.hasOwnProperty(message.network)) {
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
   var promise = storage.set(modelInformation[2],
      JSON.stringify(modelInformation[1]));
   promise.done(function(value) {
      freedom.emit("backbone_sync_create_callback", [modelInformation[0],
        value]);
   });
});

// Reads the model and calls back with the model result
freedom.on("backbone_sync_read", function(modelInformation) {
   var promise = storage.get(modelInformation[1]);
   promise.done(function(value) {
      var result = null;
      
      if(modelInformation[2]) {
        // Find the ID to return
        for(var i = 0; i < value.length; i++) {
           if(value[i].id == modelInformation[2]) {
              result = value;
              break;
           }
        }
        freedom.emit("backbone_sync_read_callback", [modelInformation[0],
          result]);
      } else {
        freedom.emit("backbone_sync_read_callback", [modelInformation[0],
          value]);
      }
   });
});

// Updates the model
freedom.on("backbone_sync_update", function(model) {
   var promise = storage.get(model[1]);
   promise.done(function(value) {
      var found = false;
      
      // Find and update
      for(var i = 0; i < value.length; i++) {
         if(value[i].id == model[0].id) {
            value[i] = model[0];
            found = true;
            break;
         }
      }

      // If not found, make a new one
      if(!found) {
         value.push(model);
      }

      var promise2 = storage.set(model[1], value);
      promise2.done(function(value2) {
        freedom.emit("backbone_sync_done");
      });
   });
});

// Deletes the model (TODO: change from set {} to actual delete)
freedom.on("backbone_sync_delete", function(model) {
   var promise = storage.get(model[1]);
   promise.done(function(value) {
      // Find and update
      for(var i = 0; i < value.length; i++) {
         if(value[i].id == model[0].id) {
            value[i] = undefined;
            break;
         }
      }

      // If empty, remove entirely
      var promise2 = null;
      if(value.length == 0) {
         promise2 = storage.set(model[1], undefined);
      } else {
         promise2 = storage.set(model[1], value);
      }
      promise2.done(function(value2) {
        freedom.emit("backbone_sync_done");
      });
   });
});
