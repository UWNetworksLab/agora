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
